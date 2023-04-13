import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { omit } from 'lodash';

import { GridItem } from '@myra-ui';

import {
  DosariReportData,
  DosariReportInput,
  LoanAgingPaymentMode,
  LoanAgingStatementReport,
  LoanBalanceFilterData,
  useGetCommitteeListQuery,
  useGetDosariReportQuery,
  useGetLoanProductTypeQuery,
  useGetMultipleSubProductsQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { localizedDate, RouteToDetailsPage } from '@coop/cbs/utils';
import { FormAmountFilter, FormCheckboxGroup, FormSelect } from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

type DosariLoanReportFilters = Omit<DosariReportInput, 'committeeId'> & {
  committeeId: {
    label: string;
    value: string;
  }[];
};

export type ReportData = {
  designation?: string;
  fullName?: string;
  agingData?: LoanAgingStatementReport;
  phoneNumber?: string;
  type?: string;
};

export const DosariLoanReport = () => {
  const [filters, setFilters] = useState<DosariLoanReportFilters | null>(null);
  const { data: committeeListData } = useGetCommitteeListQuery();

  const committeeIds =
    filters?.committeeId && filters?.committeeId.length !== 0
      ? filters?.committeeId?.map((t) => t.value)
      : null;

  const { data, isFetching } = useGetDosariReportQuery(
    {
      data: {
        ...filters,
        committeeId: committeeIds,
      } as DosariReportInput,
    },
    { enabled: !!filters }
  );

  const loanReport = data?.report?.loanReport?.dosariLoanReport?.data;
  const committeeList = committeeListData?.settings?.general?.organization?.committee?.map((c) => ({
    label: c?.name as string,
    value: c?.id as string,
  }));

  const reportData = loanReport?.reduce((loan, curr) => {
    loan.push(
      ...(curr?.loanAgingStatementData?.report?.map((report, index) => ({
        agingData: report,
        ...(index === 0 ? omit(curr, 'loanAgingStatementData') : {}),
      })) as ReportData[])
    );

    return loan;
  }, [] as ReportData[]);

  const summary = data?.report?.loanReport?.dosariLoanReport?.summary;

  return (
    <Report
      defaultFilters={null}
      data={reportData as DosariReportData[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.DOSARI_LOAN_REPORT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Loan Reports', link: '/reports/cbs/loan' },
            { label: 'Dosari Loan Report ', link: '/reports/cbs/loan/dosari-loan/new' },
          ]}
        />
        <Report.Inputs hideDate>
          <GridItem colSpan={3}>
            <FormSelect
              isMulti
              name="committeeId"
              options={committeeList}
              label="Select Committee"
            />
          </GridItem>

          <GridItem colSpan={1}>
            <ReportDateRange />
          </GridItem>
        </Report.Inputs>
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization />
          <Report.Table<ReportData>
            showFooter
            columns={[
              {
                header: 'Type',
                accessorKey: 'type',
                accessorFn: (row) => row.type,
                meta: {
                  Footer: {
                    colspan: 12,
                  },
                },
              },
              {
                header: 'Full Name',
                accessorKey: 'fullName',
                accessorFn: (row) => row.fullName,
              },
              {
                header: 'Designation',
                accessorKey: 'designation',
                accessorFn: (row) => row.designation,
              },
              {
                header: 'Phone No.',
                accessorFn: (row) => row.phoneNumber,
              },

              {
                header: 'Member Id',
                accessorKey: 'agingData.memberNo',

                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Member Name',
                accessorKey: 'agingData.name',
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Loan No',
                accessorKey: 'agingData.loanNo',
                cell: (props) => (
                  <RouteToDetailsPage
                    id={props?.row?.original?.agingData?.loanNo as string}
                    type="loan"
                    label={props?.row?.original?.agingData?.loanNo as string}
                  />
                ),
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Service Center',
                accessorKey: 'agingData.branchName',
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },

              {
                header: 'Address',
                accessorKey: 'agingData.address',
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Phone No.',
                accessorKey: 'agingData.phoneNo',
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Loan Type',
                accessorKey: 'agingData.loanType',
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Payment Mode',
                accessorKey: 'agingData.paymentMode',
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Tenure',
                accessorKey: 'agingData.tenure',
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Issue Date',
                accessorFn: (row) => localizedDate(row?.agingData?.issueDate),
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Loan Maturity Date',
                accessorFn: (row) => localizedDate(row?.agingData?.loanMaturityDate),
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Disburse Principal',
                accessorKey: 'agingData.disbursePrincipal',
                cell: (props) => amountConverter(props.getValue() as string),
                footer: () => amountConverter(summary?.disbursePrincipalTotal || 0),

                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Outstanding Balance',
                accessorKey: 'agingData.remainingPrincipal',
                cell: (props) => amountConverter(props.getValue() as string),
                footer: () => amountConverter(summary?.remainingPrincipalTotal || 0),
                meta: {
                  isNumeric: true,
                },
              },

              {
                header: 'Installment Amount',
                accessorKey: 'agingData.installmentAmount',
                cell: (props) => amountConverter(props.getValue() as string),
                footer: () => amountConverter(summary?.installmentAmountTotal || 0),

                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Remaining (Due) Installment Amount',
                accessorKey: 'agingData.remainingInstallmentAmount',
                cell: (props) => amountConverter(props.getValue() as string),
                footer: () => amountConverter(summary?.remainingInstallmentAmountTotal || 0),

                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Remaining Interest',
                accessorKey: 'agingData.remainingInterest',
                cell: (props) => amountConverter(props.getValue() as string),
                footer: () => amountConverter(summary?.remainingInterestTotal || 0),

                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Remaining Fine/Penalty',
                accessorKey: 'agingData.remainingPenalty',
                cell: (props) => amountConverter(props.getValue() as string),
                footer: () => amountConverter(summary?.remainingPenaltyTotal || 0),

                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Total Due Amount',
                accessorKey: 'agingData.totalDueAmount',
                cell: (props) => amountConverter(props.getValue() as string),
                footer: () => amountConverter(summary?.dueAmountTotal || 0),

                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Good Amount',
                accessorKey: 'agingData.goodAmount',
                cell: (props) => amountConverter(props.getValue() as string),
                footer: () => amountConverter(summary?.goodAmountTotal || 0),

                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Matured (Due)-1 to 30 Days',
                accessorKey: 'agingData.matured1To30Days',
                cell: (props) => amountConverter(props.getValue() as string),
                footer: () => amountConverter(summary?.matured1To30DaysTotal || 0),

                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Matured (Due)-1 to 12 Month',
                accessorKey: 'agingData.matured1To12Months',
                cell: (props) => amountConverter(props.getValue() as string),
                footer: () => amountConverter(summary?.matured1To12MonthsTotal || 0),

                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Matured (Due)- Above 12 Month',
                accessorKey: 'agingData.maturedAbove12Months',
                cell: (props) => amountConverter(props.getValue() as string),
                footer: () => amountConverter(summary?.maturedAbove12MonthsTotal || 0),

                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Last Principal Paid Date',
                accessorFn: (row) => localizedDate(row?.agingData?.lastPrincipalPaidDate),
              },
              {
                header: 'Last Interest Paid Date',
                accessorFn: (row) => localizedDate(row?.agingData?.lastInterestPaidDate),
              },
              {
                header: 'Next Installment Date',
                accessorFn: (row) => localizedDate(row?.agingData?.nextPaymentDate),
              },
              {
                header: 'Installment Late Days',
                accessorKey: 'agingData.installmentLateDays',
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
