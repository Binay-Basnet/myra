import { useState } from 'react';

import { Box } from '@myra-ui';
import { GridItem } from '@myra-ui/components';

import {
  LoanWriteOffReportData,
  LoanWriteOffReportFilter,
  LocalizedDateFilter,
  useGetLoanWriteOffReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { localizedDate } from '@coop/cbs/utils';
import { FormBranchSelect } from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

type ReportFilter = Omit<LoanWriteOffReportFilter, 'branchId'> & {
  branchId: { label: string; value: string }[];
};

export const LoanWriteOffReport = () => {
  const [filters, setFilters] = useState<ReportFilter | null>(null);

  const branchIDs =
    filters?.branchId && filters?.branchId.length !== 0
      ? filters?.branchId?.map((t) => t.value)
      : [];

  const { data, isFetching } = useGetLoanWriteOffReportQuery(
    {
      data: {
        ...filters,
        period: filters?.period as LocalizedDateFilter,
        branchId: branchIDs as string[],
      },
    },
    { enabled: !!filters }
  );

  const loanWriteOffReport = data?.report?.loanReport?.loanWriteOffReport?.data;
  const loanWriteOffSummary = data?.report?.loanReport?.loanWriteOffReport?.summary;

  return (
    <Report
      data={loanWriteOffReport as LoanWriteOffReportData[]}
      isLoading={isFetching}
      report={ReportEnum.LOAN_WRITE_OFF_REPORT}
      filters={filters}
      defaultFilters={null}
      setFilters={setFilters}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            {
              label: 'Loan Reports',
              link: '/reports/cbs/loan',
            },
            {
              label: ReportEnum.LOAN_WRITE_OFF_REPORT,
              link: '/reports/cbs/loan/loan-write-off/new',
            },
          ]}
        />

        <Report.Inputs>
          <GridItem colSpan={3}>
            <FormBranchSelect showUserBranchesOnly isMulti name="branchId" label="Service Center" />
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
          <Report.Table<LoanWriteOffReportData & { index: number }>
            showFooter
            columns={[
              {
                header: 'S.No.',
                accessorKey: 'index',
                footer: () => <Box textAlign="center">Total </Box>,
                meta: {
                  width: '60px',
                  Footer: {
                    colspan: 3,
                  },
                },
              },
              {
                header: 'Member No',
                accessorKey: 'memberNo',
              },
              {
                header: 'Loan No',
                accessorKey: 'loanNo',
              },
              {
                header: 'Name',
                accessorKey: 'name',
              },
              {
                header: 'Loan Type',
                accessorKey: 'loanType',
              },
              {
                header: 'Issue Date',
                accessorKey: 'loanIssueDate',
                cell: (props) => localizedDate(props?.row?.original?.loanIssueDate),

                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Loan Maturity Date',
                accessorKey: 'loanIssueDate',
                cell: (props) => localizedDate(props?.row?.original?.loanMaturityDate),

                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Disbursed Principal',
                accessorKey: 'disbursedPrincipal',
                cell: (props) => amountConverter(props?.row?.original?.disbursedPrincipal || '0'),
                footer: () => amountConverter(loanWriteOffSummary?.totalDisbursedPrincipal || 0),
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Remaining Principal',
                accessorKey: 'remainingPrincipal',
                cell: (props) => amountConverter(props?.row?.original?.remainingPrincipal || '0'),
                footer: () => amountConverter(loanWriteOffSummary?.totalRemainingPrincipal || 0),
                meta: {
                  isNumeric: true,
                },
              },
              {
                id: 'total-write-off',
                header: 'Total Write off Amount',
                columns: [
                  {
                    header: 'Principal',
                    accessorKey: 'writeOffPrincipalAmount',
                    cell: (props) =>
                      amountConverter(props?.row?.original?.writeOffPrincipalAmount || '0'),
                    footer: () =>
                      amountConverter(loanWriteOffSummary?.totalWriteOffPrincipalAmount || 0),
                    meta: {
                      isNumeric: true,
                    },
                  },
                  {
                    header: 'Interest',
                    accessorKey: 'writeOffInterestAmount',
                    cell: (props) =>
                      amountConverter(props?.row?.original?.writeOffInterestAmount || '0'),
                    footer: () =>
                      amountConverter(loanWriteOffSummary?.totalWriteOffInterestAmount || 0),
                    meta: {
                      isNumeric: true,
                    },
                  },
                  {
                    header: 'Fine',
                    accessorKey: 'writeOffFine',
                    cell: (props) => amountConverter(props?.row?.original?.writeOffFine || '0'),
                    footer: () => amountConverter(loanWriteOffSummary?.totalWriteOffFine || 0),

                    meta: {
                      isNumeric: true,
                    },
                  },
                ],
              },
              {
                id: 'remaining-amount',
                header: 'Remaining Amount',
                columns: [
                  {
                    header: 'Principal',
                    accessorKey: 'remainingPrincipalAmount',
                    cell: (props) =>
                      amountConverter(props?.row?.original?.remainingPrincipalAmount || '0'),
                    footer: () =>
                      amountConverter(loanWriteOffSummary?.totalRemainingPrincipalAmount || 0),
                    meta: {
                      isNumeric: true,
                    },
                  },
                  {
                    header: 'Interest',
                    accessorKey: 'remainingInterestAmount',
                    cell: (props) =>
                      amountConverter(props?.row?.original?.remainingInterestAmount || '0'),
                    footer: () =>
                      amountConverter(loanWriteOffSummary?.totalRemainingInterestAmount || 0),
                    meta: {
                      isNumeric: true,
                    },
                  },
                  {
                    header: 'Fine',
                    accessorKey: 'remainingFineAmount',
                    cell: (props) =>
                      amountConverter(props?.row?.original?.remainingFineAmount || '0'),
                    footer: () => amountConverter(loanWriteOffSummary?.totalRemainingFine || 0),
                    meta: {
                      isNumeric: true,
                    },
                  },
                ],
              },
              {
                header: 'Write off date',
                accessorKey: 'writeOffDate',
                cell: (props) => localizedDate(props?.row?.original?.writeOffDate),
              },
              {
                header: 'Write off Reason',
                accessorKey: 'writeOffReason',
              },
              {
                header: 'Overdue Days',
                accessorKey: 'overdueDays',
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
