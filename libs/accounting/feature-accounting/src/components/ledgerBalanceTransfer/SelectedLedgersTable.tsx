import { useMemo } from 'react';

import { Column, Table } from '@myra-ui/table';

import { LedgerBalanceEntry } from '@coop/cbs/data-access';
import { amountConverter, debitCreditConverter } from '@coop/shared/utils';

interface ISelectedLedgersTableprops {
  data: LedgerBalanceEntry[];
}

export const SelectedLedgersTable = ({ data }: ISelectedLedgersTableprops) => {
  const columns = useMemo<Column<typeof data[0]>[]>(
    () => [
      {
        id: 'ledgerName',
        header: 'Ledger Account',
        accessorKey: 'ledgerName',
      },
      {
        id: 'currentBalance',
        header: 'Current Balance',
        accessorFn: (row) =>
          debitCreditConverter(
            row?.currentBalance?.amount as string,
            row?.currentBalance?.amountType as string
          ),
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Transfer Balance',
        accessorKey: 'transferBalance',
        accessorFn: (row) => amountConverter(row?.transferBalance),
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'New Balance',
        accessorFn: (row) =>
          debitCreditConverter(
            row?.newBalance?.amount as string,
            row?.newBalance?.amountType as string
          ),
        meta: {
          isNumeric: true,
        },
      },
    ],
    []
  );

  return (
    <Table
      isDetailPageTable
      isStatic
      variant="report"
      size="report"
      data={data}
      columns={columns}
      tablePagination
      allowSearch
    />
  );
};
