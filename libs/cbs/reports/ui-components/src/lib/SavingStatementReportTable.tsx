import React from 'react';
import dayjs from 'dayjs';

import { SavingStatement, SavingTotalReport } from '@coop/cbs/data-access';
import { Column, Table } from '@coop/shared/table';
import { Box } from '@coop/shared/ui';
import { amountConverter } from '@coop/shared/utils';

interface ShareReportTableProps {
  savingReport: SavingStatement[];
  savingTotal: SavingTotalReport;
}

export const SavingStatementReportTable = ({
  savingTotal,
  savingReport,
}: ShareReportTableProps) => {
  const report = savingReport.map((saving, index) => ({
    ...saving,
    index: index + 1,
  }));

  const columns = React.useMemo<Column<SavingStatement & { index: number }>[]>(
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
        header: 'Cheque/Voucher no',
        accessorKey: 'chequeOrVoucherNo',
        meta: {
          isNumeric: true,
          Footer: {
            display: 'none',
          },
        },
      },
      {
        header: 'Withdraw Amount (Dr.)',
        accessorKey: 'withdrawDr',
        cell: (props) => amountConverter(props.getValue() as string),
        footer: () => amountConverter(savingTotal.totalWithdraw),
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Deposit Amount (Cr.)',
        accessorKey: 'depositCr',
        cell: (props) => amountConverter(props.getValue() as string),

        footer: () => amountConverter(savingTotal.totalDeposit),
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Balance Amount',
        accessorKey: 'balanceAmount',
        cell: (props) => amountConverter(props.getValue() as string),

        footer: () => amountConverter(savingTotal.totalBalance),
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
