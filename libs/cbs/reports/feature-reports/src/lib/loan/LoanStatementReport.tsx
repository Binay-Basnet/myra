import { useState } from 'react';
import { useRouter } from 'next/router';

import { Box, MultiFooter } from '@myra-ui';

import {
  LoanAccReportDetails,
  LoanStatement,
  LoanStatementReportSettings,
  useGetLoanStatementReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { LoanReportInputs, LoanReportMember } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { localizedDate, RouteToDetailsPage } from '@coop/cbs/utils';
import { amountConverter, debitCreditConverter } from '@coop/shared/utils';

export const LoanStatementReport = () => {
  const [filters, setFilters] = useState<LoanStatementReportSettings | null>(null);
  const router = useRouter();

  const { data, isFetching } = useGetLoanStatementReportQuery(
    {
      data: filters as LoanStatementReportSettings,
    },
    { enabled: !!filters }
  );

  const memberId = router.query?.['memberId'];
  const loanAccountId = router.query?.['loanAccountId'];

  const loanData = data?.report?.loanReport?.loanStatementReport?.statement;
  const loanReport = loanData && 'loanStatement' in loanData ? loanData.loanStatement : [];
  const loanMember = data?.report?.loanReport?.loanStatementReport?.member;
  const loanAccountMeta =
    loanData && 'loanStatement' in loanData ? (loanData.meta as LoanAccReportDetails) : null;
  const loanFooter = loanData && 'loanStatement' in loanData ? loanData.footer : null;

  return (
    <Report
      defaultFilters={{
        memberId: memberId as string,
        loanAccountId: loanAccountId as string,
      }}
      data={loanReport as LoanStatement[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.LOAN_INDIVIDUAL_STATEMENT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Loan Reports', link: '/reports/cbs/loan' },
            { label: 'Loan Account Statement', link: '/reports/cbs/loan/statement/new' },
          ]}
        />
        <Report.Inputs>
          <LoanReportInputs />
        </Report.Inputs>
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization />
          <LoanReportMember member={loanMember} account={loanAccountMeta as LoanAccReportDetails} />
          <Box display="flex" flexDir="column" gap="s8">
            <Box textAlign="right" px="s16">{`Opening Balance- ${debitCreditConverter(
              loanFooter?.openingBalance?.amount || '0',
              loanFooter?.openingBalance?.amountType as string
            )}`}</Box>
            <Report.Table<LoanStatement & { index: number }>
              showFooter
              columns={[
                {
                  header: 'S.No.',
                  accessorKey: 'index',
                  footer: () => <MultiFooter texts={['Total', '']} />,
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
                  cell: (props) => (
                    <Box whiteSpace="pre-line" my="s4">
                      {props.getValue() as string}
                    </Box>
                  ),
                  meta: {
                    width: '100%',
                    Footer: {
                      display: 'none',
                    },
                  },
                },

                {
                  header: 'Transaction Id',
                  accessorKey: 'txnId',
                  cell: (props) => (
                    <RouteToDetailsPage
                      id={props?.row?.original?.txnId as string}
                      type="transactions"
                      label={props?.row?.original?.txnId as string}
                    />
                  ),
                  meta: {
                    width: '100%',
                    Footer: {
                      display: 'none',
                    },
                  },
                },

                // {
                //   header: 'Disburse Principal',
                //   accessorKey: 'disbursePrinciple',
                //   cell: (props) => amountConverter(props.getValue() as string),
                //   meta: {
                //     isNumeric: true,
                //     Footer: {
                //       display: 'none',
                //     },
                //   },
                // },

                {
                  header: 'Paid Principal',
                  accessorKey: 'paidPrinciple',
                  cell: (props) => amountConverter(props.getValue() as string),
                  footer: () => (
                    <MultiFooter
                      texts={[amountConverter(loanFooter?.paidPrincipleTotal || '0') as string, '']}
                    />
                  ),
                  meta: {
                    isNumeric: true,
                  },
                },
                {
                  header: 'Interest Paid',
                  accessorKey: 'interestPaid',
                  cell: (props) => amountConverter(props.getValue() as string),

                  footer: () => (
                    <MultiFooter
                      texts={[
                        amountConverter(loanFooter?.interestPaidTotal || '0'),
                        'Closing Balance',
                      ]}
                    />
                  ),
                  meta: {
                    isNumeric: true,
                  },
                },
                {
                  header: 'Fine Paid',
                  accessorKey: 'finePaid',
                  cell: (props) => amountConverter(props.getValue() as string),

                  footer: () => (
                    <MultiFooter
                      texts={[
                        amountConverter(loanFooter?.penaltyPaidTotal || '0'),
                        debitCreditConverter(
                          loanFooter?.closingBalance?.amount || '0',
                          loanFooter?.closingBalance?.amountType as string
                        ),
                      ]}
                    />
                  ),
                  meta: {
                    isNumeric: true,
                  },
                },
                // {
                //   header: 'Discount',
                //   accessorKey: 'discount',
                //   cell: (props) => amountConverter(props.getValue() as string),
                //
                //   footer: () => amountConverter(0),
                //   meta: {
                //     isNumeric: true,
                //   },
                // },
                // {
                //   header: 'Remaining Principal',
                //   accessorKey: 'remainingPrinciple',
                //   cell: (props) => amountConverter(props.getValue() as string),
                //   footer: () => amountConverter(0),
                //   meta: {
                //     isNumeric: true,
                //   },
                // },
              ]}
            />
          </Box>
        </Report.Content>
      </Report.Body>
    </Report>
  );
};
