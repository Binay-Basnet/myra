import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Box, GridItem } from '@myra-ui';

import {
  LoanAgingPaymentMode,
  LoanAgingStatementInput,
  LoanAgingStatementReport,
  LoanBalanceFilterData,
  LocalizedDateFilter,
  useGetLoanAgingStatementReportQuery,
  useGetLoanProductTypeQuery,
  useGetMultipleSubProductsQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { localizedDate, RouteToDetailsPage } from '@coop/cbs/utils';
import {
  FormAmountFilter,
  FormBranchSelect,
  FormCheckboxGroup,
  FormDatePicker,
} from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

type LoanAgeingFilters = Omit<LoanAgingStatementInput, 'branchId'> & {
  branchId: {
    label: string;
    value: string;
  }[];
};

export const LoanAgingStatementsReport = () => {
  const [filters, setFilters] = useState<LoanAgeingFilters | null>(null);

  const branchIds =
    filters?.branchId && filters?.branchId.length !== 0
      ? filters?.branchId?.map((t) => t.value)
      : null;

  const { data, isFetching } = useGetLoanAgingStatementReportQuery(
    {
      data: {
        ...filters,
        branchId: branchIds,
        period: {
          from: filters?.period?.from,
          to: filters?.period?.from,
        } as LocalizedDateFilter,
      } as LoanAgingStatementInput,
    },
    { enabled: !!filters }
  );

  const loanReport = data?.report?.loanReport?.loanAgingStatementReport?.data?.report;
  const summary = data?.report?.loanReport?.loanAgingStatementReport?.data?.summary;

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
            { label: 'Loan Reports', link: '/reports/cbs/loan' },
            { label: 'Loan Aging Statement Report', link: '/reports/cbs/loan/ageing/new' },
          ]}
        />
        <Report.Inputs hideDate>
          <GridItem colSpan={3}>
            <FormBranchSelect isMulti name="branchId" label="Select Service Center" />
          </GridItem>

          <GridItem colSpan={1}>
            <FormDatePicker name="period.from" label="Date" />
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
                    colspan: 12,
                  },
                },
              },
              {
                header: 'Service Center',
                accessorKey: 'branchName',
                meta: {
                  Footer: {
                    display: 'none',
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
                cell: (props) => (
                  <RouteToDetailsPage
                    id={props?.row?.original?.loanNo as string}
                    type="loan"
                    label={props?.row?.original?.loanNo as string}
                  />
                ),
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
                header: 'Tenure',
                accessorKey: 'tenure',
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Issue Date',
                accessorFn: (row) => localizedDate(row?.issueDate),
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Loan Maturity Date',
                accessorFn: (row) => localizedDate(row?.loanMaturityDate),
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
                header: 'Outstanding Balance',
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
                header: 'Remaining (Due) Installment Amount',
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
                header: 'Matured (Due)-1 to 30 Days',
                accessorKey: 'matured1To30Days',
                cell: (props) => amountConverter(props.getValue() as string),
                footer: () => amountConverter(summary?.matured1To30DaysTotal || 0),

                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Matured (Due)-1 to 12 Month',
                accessorKey: 'matured1To12Months',
                cell: (props) => amountConverter(props.getValue() as string),
                footer: () => amountConverter(summary?.matured1To12MonthsTotal || 0),

                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Matured (Due)- Above 12 Month',
                accessorKey: 'maturedAbove12Months',
                cell: (props) => amountConverter(props.getValue() as string),
                footer: () => amountConverter(summary?.maturedAbove12MonthsTotal || 0),

                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Last Principal Paid Date',
                accessorFn: (row) => localizedDate(row?.lastPrincipalPaidDate),
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Last Interest Paid Date',
                accessorFn: (row) => localizedDate(row?.lastInterestPaidDate),
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Next Installment Date',
                accessorFn: (row) => localizedDate(row?.nextPaymentDate),
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
