import { useState } from 'react';
import { useRouter } from 'next/router';

import { Box } from '@myra-ui';

import {
  InterestPostingReportEntry,
  InterestStatementFilter,
  useGetInterestStatementReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { InterestStatementInputs } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { localizedDate } from '@coop/cbs/utils';
import { FormAmountFilter } from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

type InterestStatementFilters = InterestStatementFilter & {
  memberId: string;
};
export const InterestPostingReport = () => {
  const [filters, setFilters] = useState<InterestStatementFilters | null>(null);
  const router = useRouter();
  const accountId = router.query?.['accountId'];
  const memberId = router.query?.['memberId'];

  const { data, isFetching } = useGetInterestStatementReportQuery(
    {
      data: {
        period: filters?.period,
        accountId: filters?.accountId,
        filter: filters?.filter,
      } as InterestStatementFilters,
    },
    { enabled: !!filters }
  );
  const interestStatementReport =
    data?.report?.depositReport?.interestStatementReport?.data?.entries ?? [];

  return (
    <Report
      defaultFilters={
        accountId
          ? {
              accountId: accountId as string,
              memberId: memberId as string,
            }
          : null
      }
      data={interestStatementReport as unknown as InterestPostingReportEntry[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.DEPOSIT_INTEREST_REPORT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Saving Reports', link: '/reports/cbs/savings' },
            {
              label: 'Interest Statement',
              link: '/reports/cbs/savings/interest-statement/new',
            },
          ]}
        />
        <Report.Inputs>
          <InterestStatementInputs />
        </Report.Inputs>
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization />
          <Report.Table<InterestPostingReportEntry & { index: number }>
            columns={[
              {
                header: 'S.No.',
                accessorKey: 'index',
                footer: () => <Box textAlign="right">Total Balance</Box>,
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
              },
              // {
              //   header: 'Days',
              //   accessorKey: 'days',
              // },
              // {
              //   header: 'Balance',
              //   accessorKey: 'balance',
              //   cell: (props) => amountConverter(props.getValue() as string),
              //   meta: {
              //     isNumeric: true,
              //   },
              // },
              {
                header: 'Interest Rate',
                accessorKey: 'rate',
                cell: (props) => `${props.getValue()}%`,
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Interest Amount',
                accessorKey: 'amount',
                cell: (props) => amountConverter(props.getValue() as string),
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'TDS Amount',
                accessorKey: 'tds',
                cell: (props) => amountConverter(props.getValue() as string),
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Remarks',
                accessorKey: 'remarks',

                meta: {
                  isNumeric: true,
                },
              },
            ]}
          />
        </Report.Content>
        <Report.Filters>
          <Report.Filter title="Interest Amount">
            <FormAmountFilter name="filter.interestAmount" />
          </Report.Filter>
        </Report.Filters>
      </Report.Body>
    </Report>
  );
};
