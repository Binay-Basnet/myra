import { useState } from 'react';

import { Box } from '@myra-ui';

import {
  ClosedLoanAccountFilter,
  ClosedLoanAccountMeta,
  ClosedLoanAccountReportData,
  useGetClosedLoanAccountReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ClosedLoanReportMeta, LoanReportInputs } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { localizedDate, RouteToDetailsPage } from '@coop/cbs/utils';
import { amountConverter } from '@coop/shared/utils';

export const ClosedLoanStatementReport = () => {
  const [filters, setFilters] = useState<ClosedLoanAccountFilter | null>(null);

  const { data, isFetching } = useGetClosedLoanAccountReportQuery(
    {
      data: filters as ClosedLoanAccountFilter,
    },
    { enabled: !!filters }
  );

  const loanReport = data?.report?.loanReport?.closedLoanAccountStatementReport;
  const loanReportData = loanReport?.data;
  const loanReportMeta = loanReport?.meta;
  const loanReportSummary = loanReport?.summary;

  return (
    <Report
      defaultFilters={null}
      data={loanReportData as ClosedLoanAccountReportData[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.CLOSED_LOAN_ACCOUNT_STATEMENT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Loan Reports', link: '/reports/cbs/loan' },
            { label: 'Closed Loan Statement', link: '/reports/cbs/loan/cloed-loan-statement/new' },
          ]}
        />
        <Report.Inputs>
          <LoanReportInputs accountName="accountId" isClosed />
        </Report.Inputs>
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization />
          <ClosedLoanReportMeta meta={loanReportMeta as ClosedLoanAccountMeta} />
          <Report.Table<ClosedLoanAccountReportData & { index: number }>
            showFooter
            columns={[
              {
                header: 'S.No.',
                accessorKey: 'index',
                footer: () => <Box textAlign="right">Closing Balance</Box>,
                meta: {
                  width: '60px',
                  Footer: {
                    colspan: 4,
                  },
                },
              },
              {
                header: 'Date',
                accessorFn: (row) => localizedDate(row?.date),
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Particular',
                accessorKey: 'particular',
                meta: {
                  width: '100%',
                  Footer: {
                    display: 'none',
                  },
                },
              },

              {
                header: 'Transaction Id',
                accessorKey: 'transactionId',
                cell: (props) => (
                  <RouteToDetailsPage
                    id={props?.row?.original?.transactionId as string}
                    type="transactions"
                    label={props?.row?.original?.transactionId as string}
                  />
                ),
              },

              {
                header: 'Disburse Principal',
                accessorKey: 'disbursedPrincipal',
                cell: (props) => amountConverter(props.getValue() as string),
                meta: {
                  isNumeric: true,
                  Footer: {
                    display: 'none',
                  },
                },
              },

              {
                header: 'Paid Principal',
                accessorKey: 'principalPaid',
                cell: (props) => amountConverter(props.getValue() as string),
                footer: () => amountConverter(loanReportSummary?.totalPrincipalPaid || '0.00'),
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Interest Paid',
                accessorKey: 'interestPaid',
                cell: (props) => amountConverter(props.getValue() as string),

                footer: () => amountConverter(loanReportSummary?.totalInterestPaid || '0.00'),
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Fine Paid',
                accessorKey: 'finePaid',
                cell: (props) => amountConverter(props.getValue() as string),

                footer: () => amountConverter(loanReportSummary?.totalFinePaid || '0.00'),
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Discount',
                accessorKey: 'discount',
                cell: (props) => amountConverter(props.getValue() as string),

                footer: () => amountConverter(loanReportSummary?.totalDiscount || '0.00'),
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Remaining Principal',
                accessorKey: 'remainingPrincipal',
                cell: (props) => amountConverter(props.getValue() as string),
                footer: () => amountConverter(loanReportSummary?.remainingPrincipal || '0.00'),
                meta: {
                  isNumeric: true,
                },
              },
            ]}
          />
        </Report.Content>
      </Report.Body>
    </Report>
  );
};
