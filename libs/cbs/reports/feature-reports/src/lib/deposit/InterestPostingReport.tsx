import { useState } from 'react';
import dayjs from 'dayjs';

import {
  InterestPostingReportEntry,
  InterestStatementFilter,
  useGetInterestStatementReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { InterestStatementInputs } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { FormAmountFilter } from '@coop/shared/form';
import { Box } from '@coop/shared/ui';
import { amountConverter } from '@coop/shared/utils';

export const InterestPostingReport = () => {
  const [filters, setFilters] = useState<InterestStatementFilter | null>(null);

  const { data, isFetching } = useGetInterestStatementReportQuery(
    {
      data: filters as InterestStatementFilter,
    },
    { enabled: !!filters }
  );
  const interestStatementReport = data?.report?.interestStatementReport?.data;

  return (
    <Report
      defaultFilters={null}
      data={interestStatementReport as unknown as InterestPostingReportEntry[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.SAVING_STATEMENT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Saving Reports', link: '/reports/cbs/savings' },
            {
              label: 'Interest Statement',
              link: '/reports/cbs/interest-statement/new',
            },
          ]}
        />
        <Report.Inputs defaultFilters={null} setFilters={setFilters}>
          <InterestStatementInputs />
        </Report.Inputs>
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization statementDate={filters?.period?.periodType} />
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
                accessorKey: 'date',
                cell: ({ cell }) => dayjs(cell.row.original.date?.local).format('YYYY-MM-DD'),
              },
              {
                header: 'Days',
                accessorKey: 'days',
              },
              {
                header: 'Balance',
                accessorKey: 'balance',
                cell: (props) => amountConverter(props.getValue() as string),
                meta: {
                  isNumeric: true,
                },
              },
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
