import React from 'react';
import dayjs from 'dayjs';

import { InterestPostingReportEntry } from '@coop/cbs/data-access';
import { Column, Table } from '@coop/shared/table';
import { Box } from '@coop/shared/ui';
import { amountConverter } from '@coop/shared/utils';

interface ShareReportTableProps {
  interestReport: InterestPostingReportEntry[];
}

export const InterestStatementReportTable = ({ interestReport }: ShareReportTableProps) => {
  const report = interestReport.map((interest, index) => ({
    ...interest,
    index: index + 1,
  }));

  const columns = React.useMemo<Column<InterestPostingReportEntry & { index: number }>[]>(
    () => [
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
    ],
    []
  );

  return (
    <Box p="s32">
      <Table variant="report" size="report" isStatic data={report} showFooter columns={columns} />
    </Box>
  );
};
