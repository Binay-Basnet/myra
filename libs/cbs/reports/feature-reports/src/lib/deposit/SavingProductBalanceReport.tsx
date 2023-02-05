import { useState } from 'react';

import { Box, GridItem } from '@myra-ui';

import {
  NatureOfDepositProduct,
  SavingProductBalanceEntry,
  SavingProductBalanceFilter,
  useGetSavingProductBalanceQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { RouteToDetailsPage } from '@coop/cbs/utils';
import { FormAmountFilter, FormBranchSelect, FormCheckboxGroup } from '@coop/shared/form';
import { debitCreditConverter, quantityConverter } from '@coop/shared/utils';

type SavingProductBalanceInputs = Omit<SavingProductBalanceFilter, 'branchId'> & {
  branchId: {
    label: string;
    value: string;
  }[];
};

export const SavingProductBalanceReport = () => {
  const [filters, setFilters] = useState<SavingProductBalanceInputs | null>(null);

  const branchIds =
    filters?.branchId && filters?.branchId.length !== 0
      ? filters?.branchId?.map((t) => t.value)
      : null;

  const { data, isFetching } = useGetSavingProductBalanceQuery(
    {
      data: { ...filters, branchId: branchIds } as SavingProductBalanceFilter,
    },
    { enabled: !!filters }
  );

  const savingProductBalanceReportData =
    data?.report?.depositReport?.savingProductBalanceReport?.data;

  const savingProductBalanceReport = savingProductBalanceReportData?.entries;

  return (
    <Report
      defaultFilters={null}
      data={savingProductBalanceReport as SavingProductBalanceEntry[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.SAVING_PRODUCT_BALANCE_REPORT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Saving Reports', link: '/reports/cbs/savings' },
            {
              label: 'Saving Product Balance Report',
              link: '/reports/cbs/savings/saving-product-balance/new',
            },
          ]}
        />
        <Report.Inputs hideDate>
          <GridItem colSpan={3}>
            <FormBranchSelect isMulti name="branchId" label="Select Service Center" />
          </GridItem>
        </Report.Inputs>
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization />
          <Report.Table<SavingProductBalanceEntry & { index: number }>
            showFooter
            columns={[
              {
                header: 'S.No.',
                accessorKey: 'index',
                footer: () => 'Total',
                meta: {
                  isNumeric: true,

                  Footer: {
                    colspan: 4,
                  },
                },
              },
              {
                header: 'Product Code',
                accessorKey: 'code',
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Product Name',
                accessorKey: 'name',
                cell: (props) => (
                  <RouteToDetailsPage
                    id={props?.row?.original?.id as string}
                    type="saving-product"
                    label={props?.row?.original?.name as string}
                  />
                ),
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Prodcut Nature',
                accessorKey: 'nature',
                cell: (props) => (
                  <Box textTransform="capitalize">
                    {props.row.original.nature?.toLowerCase()?.replace(/_/g, ' ')}
                  </Box>
                ),
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'No. of Accounts',
                accessorKey: 'noOfAccounts',
                footer: () => quantityConverter(savingProductBalanceReportData?.accountTotal || 0),
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Total Balance',
                accessorKey: 'totalBalance',
                footer: () =>
                  debitCreditConverter(
                    savingProductBalanceReportData?.balanceTotal || '0.00',
                    savingProductBalanceReportData?.balanceTotalType || ''
                  ),
                cell: (props) =>
                  debitCreditConverter(
                    props.row.original.totalBalance || '0.00',
                    props.row.original.balanceType || ''
                  ),
                meta: {
                  isNumeric: true,
                },
              },
            ]}
          />
        </Report.Content>
        <Report.Filters>
          <Report.Filter title="Product Nature">
            <FormCheckboxGroup
              name="filter.nature"
              list={[
                { label: 'Current', value: NatureOfDepositProduct.Current },
                { label: 'Recurring Saving', value: NatureOfDepositProduct.RecurringSaving },
                { label: 'Saving', value: NatureOfDepositProduct.Saving },
                { label: 'Term Saving', value: NatureOfDepositProduct.TermSavingOrFd },
              ]}
            />
          </Report.Filter>
          <Report.Filter title="Total Balance">
            <FormAmountFilter name="filter.amount" />
          </Report.Filter>
        </Report.Filters>
      </Report.Body>
    </Report>
  );
};
