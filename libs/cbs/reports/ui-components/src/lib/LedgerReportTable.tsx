import React from 'react';
import dayjs from 'dayjs';

import { GeneralLedgerReportEntry } from '@coop/cbs/data-access';
import { Column, Table } from '@coop/shared/table';
import { Box } from '@coop/shared/ui';
import { amountConverter } from '@coop/shared/utils';

interface ShareReportTableProps {
  ledgerReport: GeneralLedgerReportEntry[];
}

export const LedgerReportTable = ({ ledgerReport }: ShareReportTableProps) => {
  const columns = React.useMemo<Column<GeneralLedgerReportEntry>[]>(
    () => [
      {
        header: 'Date',
        accessorFn: (row) => row?.date?.en,
        cell: (props) => dayjs(props.getValue() as string).format('YYYY-MM-DD'),
      },
      {
        header: 'ID',
        accessorFn: (row) => row?.id,
      },
      {
        header: 'Account',
        accessorFn: (row) => row?.account,
        meta: {
          width: '70%',
        },
      },
      {
        header: 'Dr.',
        accessorFn: (row) => row?.debit,
        cell: (props) => amountConverter(props.getValue() as string),
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Cr. ',
        accessorFn: (row) => row?.credit,
        cell: (props) => amountConverter(props.getValue() as string),

        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Balance',
        accessorFn: (row) => row?.balance,
        cell: (props) => amountConverter(props.getValue() as string),

        meta: {
          isNumeric: true,
        },
      },
    ],
    []
  );

  return (
    <Box p="s32">
      <Table variant="report" size="report" isStatic data={ledgerReport} columns={columns} />
    </Box>
  );
};
