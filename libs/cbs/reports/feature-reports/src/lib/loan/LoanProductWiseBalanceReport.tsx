import { useState } from 'react';

import { Box, GridItem } from '@myra-ui';

import {
  LoanProductBalanceReportFilter,
  LoanProductBalanceReportInformation,
  useGetLoanProductBalanceReportQuery,
  useGetLoanProductTypeQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { RouteToDetailsPage } from '@coop/cbs/utils';
import { FormAmountFilter, FormBranchSelect, FormSelect } from '@coop/shared/form';
import { amountConverter, quantityConverter } from '@coop/shared/utils';

type LoanProductBalanceReportFilters = Omit<LoanProductBalanceReportFilter, 'branchId'> & {
  branchId: {
    label: string;
    value: string;
  }[];
};

export const LoanProductWiseBalanceReport = () => {
  const [filters, setFilters] = useState<LoanProductBalanceReportFilters | null>(null);

  const branchIds =
    filters?.branchId && filters?.branchId.length !== 0
      ? filters?.branchId?.map((t) => t.value)
      : null;

  const { data, isFetching } = useGetLoanProductBalanceReportQuery(
    {
      data: { ...filters, branchId: branchIds } as LoanProductBalanceReportFilter,
    },
    { enabled: !!filters }
  );
  const loanProductBalanceReportData = data?.report?.loanReport?.loanProductBalance?.data;
  const summary = data?.report?.loanReport?.loanProductBalance?.summary;

  const { data: loanProductTypeData } = useGetLoanProductTypeQuery();
  const loanTypes = loanProductTypeData?.settings?.general?.loan?.productType?.productTypes;

  return (
    <Report
      defaultFilters={null}
      data={loanProductBalanceReportData as LoanProductBalanceReportInformation[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.LOAN_PRODUCT_WISE_BALANCE_REPORT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Loan Reports', link: '/reports/cbs/loan' },
            {
              label: 'Loan Product Balance Report',
              link: '/reports/cbs/loan/loan-product-balance/new',
            },
          ]}
        />
        <Report.Inputs>
          <GridItem colSpan={3}>
            <FormBranchSelect isMulti name="branchId" label="Service Center" />
          </GridItem>
          <GridItem colSpan={1}>
            <ReportDateRange label="Date Period" />
          </GridItem>
        </Report.Inputs>
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization />
          <Report.Table<LoanProductBalanceReportInformation & { index: number }>
            showFooter
            columns={[
              {
                header: 'S.No.',
                accessorKey: 'index',
                footer: () => <Box textAlign="center">Total </Box>,
                meta: {
                  width: '60px',
                  Footer: {
                    colspan: 4,
                  },
                },
              },
              {
                header: 'Product Name',
                accessorKey: 'productName',
                cell: (props) => (
                  <RouteToDetailsPage
                    id={props?.row?.original?.productId as string}
                    type="loan-product"
                    label={props?.row?.original?.productName as string}
                  />
                ),
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Product Code',
                accessorKey: 'productCode',
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },

              {
                header: 'Product Type',
                accessorFn: (row) => row?.productType,
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Opening No of Accounts',
                accessorKey: 'noOfOpeningAccounts',
                footer: () => quantityConverter(summary?.noOfOpeningAccounts || 0),
                accessorFn: (row) => row?.noOfOpeningAccounts ?? '-',
              },
              {
                header: 'Total No. of Accounts',
                accessorKey: 'noOfTotalAccounts',
                footer: () => quantityConverter(summary?.noOfTotalAccounts || 0),
              },
              {
                header: 'Opening Loan Balance',
                accessorKey: 'openingLoanBalance',
                accessorFn: (row) => row?.openingLoanBalance ?? '-',
                cell: (props) => amountConverter(props?.row?.original?.openingLoanBalance ?? '0'),
                footer: () => amountConverter(summary?.totalOpeningLoanBalance || 0),
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Total Loan Balance',
                accessorKey: 'totalLoanBalance',
                cell: (props) => amountConverter(props?.row?.original?.totalLoanBalance ?? '0'),
                footer: () => amountConverter(summary?.totalLoanBalance || 0),
                meta: {
                  isNumeric: true,
                },
              },
            ]}
          />
        </Report.Content>
        <Report.Filters>
          <Report.Filter title="Loan Type">
            <FormSelect
              name="productType"
              isMulti
              options={loanTypes?.map((product) => ({
                label: product?.productType as string,
                value: product?.id as string,
              }))}
            />
          </Report.Filter>
          <Report.Filter title="Total Balance">
            <Report.Filter title=" Balance">
              <FormAmountFilter name="totalBalance" />
            </Report.Filter>
          </Report.Filter>
        </Report.Filters>
      </Report.Body>
    </Report>
  );
};
