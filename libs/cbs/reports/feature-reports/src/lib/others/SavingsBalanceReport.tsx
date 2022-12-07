import { useState } from 'react';

import { Box, GridItem } from '@myra-ui';

import {
  KymMemberTypesEnum,
  MinMaxFilter,
  MinorWiseFilter,
  NatureOfDepositProduct,
  PeriodInput,
  SavingsBalanceFilterData,
  SavingsBalanceReport,
  SavingsBalanceReportResult,
  useGetSavingsBalanceReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import {
  FormAmountFilter,
  FormBranchSelect,
  FormCheckboxGroup,
  FormMemberSelect,
  FormRadioGroup,
} from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

const minorOptions = [
  {
    label: 'All',
    value: MinorWiseFilter?.All,
  },
  {
    label: 'Minor Product',
    value: MinorWiseFilter?.MinorProduct,
  },
  {
    label: 'Not Minor Product',
    value: MinorWiseFilter?.NotMinorProduct,
  },
];

type Filter = {
  branchId: string;
  period: PeriodInput;
  filter: {
    memberIds?: string[];
    minorWise?: MinorWiseFilter;
    productTypes?: NatureOfDepositProduct[];
    memberType?: KymMemberTypesEnum[];
    amount?: MinMaxFilter;
  };
};
export const SavingBalanceReport = () => {
  const [filters, setFilters] = useState<Filter | null>(null);

  const { data, isFetching } = useGetSavingsBalanceReportQuery(
    {
      data: filters as SavingsBalanceFilterData,
    },
    { enabled: !!filters }
  );

  const savingBalanceData = data?.report?.savingsBalanceReport?.data;
  const totalBalance = data?.report?.savingsBalanceReport?.totalBalance;

  return (
    <Report
      defaultFilters={{}}
      data={savingBalanceData as SavingsBalanceReportResult[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.SAVING_BALANCE_REPORT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Report Group', link: '/reports/cbs/others' },
            { label: 'Saving Balance Report', link: '/reports/cbs/others/saving-balance/new' },
          ]}
        />
        <Report.Inputs>
          <GridItem colSpan={3}>
            <FormBranchSelect name="branchId" label="Branch" />
          </GridItem>
          <GridItem colSpan={1}>
            <ReportDateRange label="Date Period" />
          </GridItem>
        </Report.Inputs>
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization statementDate={filters?.period?.periodType} />
          <Report.Table<SavingsBalanceReport & { index: number }>
            showFooter
            columns={[
              {
                header: 'S.No.',
                footer: () => <Box textAlign="right"> Total</Box>,
                accessorKey: 'index',
                meta: {
                  width: '60px',
                  Footer: {
                    colspan: 8,
                  },
                },
              },
              {
                header: 'Account Number',
                accessorKey: 'accountId',
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Member ID',
                accessorKey: 'memberId',
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Account Holder Name',
                accessorFn: (row) => row?.memberName?.local,
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Product Name',
                accessorKey: 'productName',
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Product ID',
                accessorKey: 'productId',
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Account Open Date',
                accessorKey: 'accountOpeningDate',
                cell: (props: { getValue: () => unknown }) =>
                  String(props?.getValue())?.split(' ')[0],
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Member Type',
                accessorKey: 'memberType',
                cell: (props) => (
                  <Box textTransform="capitalize">
                    {' '}
                    {props?.row?.original?.memberType?.toLowerCase()?.replace(/_/g, ' ')}
                  </Box>
                ),
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Balance Amount',
                accessorKey: 'balance',
                cell: (props) => amountConverter(props.getValue() as string),
                footer: () => amountConverter(totalBalance as string),
                meta: {
                  isNumeric: true,
                },
              },
            ]}
          />
        </Report.Content>
        <Report.Filters>
          <Report.Filter title="Member Wise">
            <FormMemberSelect name="filter.memberIds" />
          </Report.Filter>
          <Report.Filter title="Minor Wise">
            <FormRadioGroup name="filter.minorWise" options={minorOptions} orientation="vertical" />
          </Report.Filter>
          <Report.Filter title="Product Wise">
            <FormCheckboxGroup
              name="filter.productTypes"
              list={[
                { label: 'Recurring Saving', value: NatureOfDepositProduct?.RecurringSaving },
                { label: 'Saving', value: NatureOfDepositProduct?.Saving },
                { label: 'Current', value: NatureOfDepositProduct?.Current },
                { label: 'Term Saving', value: NatureOfDepositProduct?.TermSavingOrFd },
              ]}
              orientation="column"
            />
          </Report.Filter>
          <Report.Filter title="MemberType">
            <FormCheckboxGroup
              name="filter.memberType"
              list={[
                { label: 'Individual', value: KymMemberTypesEnum?.Individual },
                { label: 'Institution', value: KymMemberTypesEnum?.Institution },
                { label: 'Cooperative', value: KymMemberTypesEnum?.Cooperative },
                { label: 'Cooperative Union', value: KymMemberTypesEnum?.Cooperative },
              ]}
              orientation="column"
            />
          </Report.Filter>

          <Report.Filter title="Amount Range">
            <FormAmountFilter name="filter.amount" />
          </Report.Filter>
        </Report.Filters>
      </Report.Body>
    </Report>
  );
};