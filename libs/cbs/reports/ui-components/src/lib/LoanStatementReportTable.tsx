import React from 'react';
import dayjs from 'dayjs';

import { LoanStatement } from '@coop/cbs/data-access';
import { Column, Table } from '@coop/shared/table';
import { Box } from '@coop/shared/ui';
import { amountConverter } from '@coop/shared/utils';

interface ShareReportTableProps {
  loanReport: LoanStatement[];
  // loanTotal?: string;
}

export const LoanStatementReportTable = ({ loanReport }: ShareReportTableProps) => {
  const report = loanReport?.map((loan, index) => ({
    ...loan,
    index: index + 1,
  }));

  const columns = React.useMemo<Column<LoanStatement & { index: number }>[]>(
    () => [
      {
        header: 'S.No.',
        accessorKey: 'index',
        footer: () => <Box textAlign="right">Closing Balance</Box>,
        meta: {
          width: '60px',
          Footer: {
            colspan: 3,
          },
        },
      },
      {
        header: 'Date',
        accessorKey: 'date',
        cell: ({ cell }) => dayjs(cell.row.original.date).format('YYYY-MM-DD'),
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
        accessorKey: 'txnId',
      },

      {
        header: 'Disburse Principal',
        accessorKey: 'disbursePrinciple',
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
        accessorKey: 'paidPrinciple',
        cell: (props) => amountConverter(props.getValue() as string),
        footer: () => amountConverter(0),
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Interest Paid',
        accessorKey: 'interestPaid',
        cell: (props) => amountConverter(props.getValue() as string),

        footer: () => amountConverter(0),
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Fine Paid',
        accessorKey: 'finePaid',
        cell: (props) => amountConverter(props.getValue() as string),

        footer: () => amountConverter(0),
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Discount',
        accessorKey: 'discount',
        cell: (props) => amountConverter(props.getValue() as string),

        footer: () => amountConverter(0),
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Remaining Principal',
        accessorKey: 'remainingPrinciple',
        cell: (props) => amountConverter(props.getValue() as string),
        footer: () => amountConverter(0),
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
