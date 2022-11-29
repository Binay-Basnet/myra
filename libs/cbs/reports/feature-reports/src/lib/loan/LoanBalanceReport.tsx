import { useState } from 'react';
import { Box, GridItem } from '@myra-ui';
import dayjs from 'dayjs';

import {
  LoanBalanceFilterData,
  LoanBalanceReport as LoanBalanceReportType,
  useGetLoanBalanceReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { FormBranchSelect } from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

export const LoanBalanceReport = () => {
  const [filters, setFilters] = useState<LoanBalanceFilterData | null>(null);

  const { data, isFetching } = useGetLoanBalanceReportQuery(
    {
      data: filters as LoanBalanceFilterData,
    },
    { enabled: !!filters }
  );

  const loanReport = data?.report?.loanBalanceReport?.data;
  const outstandingTotal = data?.report?.loanBalanceReport?.totalOutstandingBalance;
  const totalRemainingBalance = data?.report?.loanBalanceReport?.totalRemainingBalance;

  return (
    <Report
      defaultFilters={null}
      data={loanReport as LoanBalanceReportType[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.LOAN_BALANCE_REPORT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Other Reports', link: '/reports/cbs/others' },
            { label: 'Loan Statement', link: '/reports/cbs/others/loan-balance/new' },
          ]}
        />
        <Report.Inputs defaultFilters={null} setFilters={setFilters}>
          <GridItem colSpan={3}>
            <FormBranchSelect name="branchId" label="Select Branch" />
          </GridItem>
          <GridItem colSpan={1}>
            <ReportDateRange />
          </GridItem>
        </Report.Inputs>
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization statementDate={filters?.period?.periodType} />
          <Report.Table<LoanBalanceReportType & { index: number }>
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
                header: 'Loan Account Number',
                accessorKey: 'loanAccountId',
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Member Id',
                accessorKey: 'memberId',
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },

              {
                header: 'Member Name',
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
                header: 'Product Code',
                accessorKey: 'productCode',
                footer: () => <>Total Balance </>,
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Outstanding Balance',
                accessorKey: 'outstandingBalance',
                cell: (props) => amountConverter(props.getValue() as string),

                footer: () => amountConverter(outstandingTotal || 0),
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Remaining Balance',
                accessorKey: 'remainingBalance',
                cell: (props) => amountConverter(props.getValue() as string),
                footer: () => amountConverter(totalRemainingBalance || 0),
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Last Payment Date',
                accessorKey: 'lastPaymentDate',
                cell: ({ cell }) => dayjs(cell.row.original.lastPaymentDate).format('YYYY-MM-DD'),
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
