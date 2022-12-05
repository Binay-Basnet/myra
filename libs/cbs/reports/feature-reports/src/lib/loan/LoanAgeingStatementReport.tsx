import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import dayjs from 'dayjs';

import { Box, GridItem } from '@myra-ui';

import {
  LoanAgingPaymentMode,
  LoanAgingStatementInput,
  LoanAgingStatementReport,
  LoanBalanceFilterData,
  useGetLoanAgingStatementReportQuery,
  useGetLoanProductTypeQuery,
  useGetMultipleSubProductsQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { FormAmountFilter, FormBranchSelect, FormCheckboxGroup } from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

export const LoanAgingStatementsReport = () => {
  const [filters, setFilters] = useState<LoanAgingStatementInput | null>(null);

  const { data, isFetching } = useGetLoanAgingStatementReportQuery(
    {
      data: filters as LoanAgingStatementInput,
    },
    { enabled: !!filters }
  );

  const loanReport = data?.report?.loanAgingStatementReport?.data?.report;
  const summary = data?.report?.loanAgingStatementReport?.data?.summary;

  return (
    <Report
      defaultFilters={null}
      data={loanReport as LoanAgingStatementReport[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.LOAN_AGING_REPORT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Other Reports', link: '/reports/cbs/others' },
            { label: 'Loan Balance Report', link: '/reports/cbs/others/loan-ageing/new' },
          ]}
        />
        <Report.Inputs hideDate>
          <GridItem colSpan={3}>
            <FormBranchSelect name="branchId" label="Select Branch" />
          </GridItem>
        </Report.Inputs>
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization />
          <Report.Table<LoanAgingStatementReport & { index: number }>
            showFooter
            columns={[
              {
                header: 'S.No.',
                accessorKey: 'index',
                footer: () => <Box textAlign="center">Total </Box>,
                meta: {
                  width: '60px',
                  Footer: {
                    colspan: 10,
                  },
                },
              },
              {
                header: 'Member No',
                accessorKey: 'memberNo',
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Loan No',
                accessorKey: 'loanNo',
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Name',
                accessorKey: 'name',
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Address',
                accessorKey: 'address',
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Phone No.',
                accessorKey: 'phoneNo',
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Loan Type',
                accessorKey: 'loanType',
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Payment Mode',
                accessorKey: 'paymentMode',
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Issue Date',
                accessorKey: 'issueDate',
                cell: ({ cell }) => dayjs(cell.row.original.issueDate?.en).format('YYYY-MM-DD'),
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Loan Maturity Date',
                accessorKey: 'loanMaturityDate',
                cell: ({ cell }) =>
                  dayjs(cell.row.original?.loanMaturityDate?.en).format('YYYY-MM-DD'),
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Disburse Principal',
                accessorKey: 'disbursePrincipal',
                cell: (props) => amountConverter(props.getValue() as string),
                footer: () => amountConverter(summary?.disbursePrincipalTotal || 0),

                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Remaining Principal',
                accessorKey: 'remainingPrincipal',
                cell: (props) => amountConverter(props.getValue() as string),
                footer: () => amountConverter(summary?.remainingPrincipalTotal || 0),
                meta: {
                  isNumeric: true,
                },
              },

              {
                header: 'Installment Amount',
                accessorKey: 'installmentAmount',
                cell: (props) => amountConverter(props.getValue() as string),
                footer: () => amountConverter(summary?.installmentAmountTotal || 0),

                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Remaining Installment Amount',
                accessorKey: 'remainingInstallmentAmount',
                cell: (props) => amountConverter(props.getValue() as string),
                footer: () => amountConverter(summary?.remainingInstallmentAmountTotal || 0),

                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Remaining Interest',
                accessorKey: 'remainingInterest',
                cell: (props) => amountConverter(props.getValue() as string),
                footer: () => amountConverter(summary?.remainingInterestTotal || 0),

                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Remaining Fine/Penalty',
                accessorKey: 'remainingPenalty',
                cell: (props) => amountConverter(props.getValue() as string),
                footer: () => amountConverter(summary?.remainingPenaltyTotal || 0),

                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Total Due Amount',
                accessorKey: 'totalDueAmount',
                cell: (props) => amountConverter(props.getValue() as string),
                footer: () => amountConverter(summary?.dueAmountTotal || 0),

                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Good Amount',
                accessorKey: 'goodAmount',
                cell: (props) => amountConverter(props.getValue() as string),
                footer: () => amountConverter(summary?.goodAmountTotal || 0),

                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Matured -1 to 30 Days',
                accessorKey: 'matured1To30Days',
                cell: (props) => amountConverter(props.getValue() as string),
                footer: () => amountConverter(summary?.matured1To30DaysTotal || 0),

                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Matured -1 to 12 Month',
                accessorKey: 'matured1To12Months',
                cell: (props) => amountConverter(props.getValue() as string),
                footer: () => amountConverter(summary?.matured1To12MonthsTotal || 0),

                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Matured - Above 12 Month',
                accessorKey: 'matured1To12Months',
                cell: (props) => amountConverter(props.getValue() as string),
                footer: () => amountConverter(summary?.maturedAbove12MonthsTotal || 0),

                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Last Principal Paid Date',
                accessorKey: 'lastPrincipalPaidDate',
                cell: ({ cell }) =>
                  dayjs(cell.row.original.lastPrincipalPaidDate?.en).format('YYYY-MM-DD'),

                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Last Interest Paid Date',
                accessorKey: 'lastInterestPaidDate',
                cell: ({ cell }) =>
                  dayjs(cell.row.original.lastInterestPaidDate?.en).format('YYYY-MM-DD'),
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Installment Late Days',
                accessorKey: 'installmentLateDays',
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
            ]}
          />
        </Report.Content>

        <Report.Filters>
          <ReportFilter />
        </Report.Filters>
      </Report.Body>
    </Report>
  );
};

const ReportFilter = () => {
  const { watch } = useFormContext<LoanBalanceFilterData>();
  const productTypeIds = watch('filter.productTypes');

  const { data: loanProductTypeData } = useGetLoanProductTypeQuery();
  const { data: loanSubProductTypeData } = useGetMultipleSubProductsQuery({
    productTypeIds: productTypeIds || [],
  });

  const loanProductType = loanProductTypeData?.settings?.general?.loan?.productType?.productTypes;
  const loanSubProductType =
    loanSubProductTypeData?.settings?.general?.loan?.productType?.multipleProductSubTypes;

  return (
    <>
      {' '}
      <Report.Filter title="Product Type">
        <FormCheckboxGroup
          name="filter.natureOfTransactions"
          list={[
            { label: 'All', value: LoanAgingPaymentMode.All },
            { label: 'Monthly', value: LoanAgingPaymentMode.Monthly },
            { label: 'Quaterly', value: LoanAgingPaymentMode.Quarterly },

            { label: 'Half Yearly', value: LoanAgingPaymentMode.HalfYearly },
            { label: 'Yearly', value: LoanAgingPaymentMode.Yearly },
          ]}
          orientation="column"
        />
      </Report.Filter>
      <Report.Filter title="Product Type">
        <FormCheckboxGroup
          name="filter.productTypes"
          list={loanProductType?.map((product) => ({
            label: product?.productType as string,
            value: product?.id as string,
          }))}
          orientation="column"
        />
      </Report.Filter>
      {loanSubProductType && loanSubProductType?.length !== 0 && (
        <Report.Filter title="Product Sub Type">
          <FormCheckboxGroup
            name="filter.productSubTypes"
            list={loanSubProductType?.map((product) => ({
              label: product?.productSubType as string,
              value: product?.id as string,
            }))}
            orientation="column"
          />
        </Report.Filter>
      )}
      <Report.Filter title="Disburse Principal">
        <FormAmountFilter name="filter.disbursePrincipal" />
      </Report.Filter>
      <Report.Filter title="Remaining Principal">
        <FormAmountFilter name="filter.remainingPrincipal" />
      </Report.Filter>
    </>
  );
};
