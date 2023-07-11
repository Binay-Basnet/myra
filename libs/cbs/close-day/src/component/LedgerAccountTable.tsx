import { useMemo } from 'react';

import { Column, Table } from '@myra-ui/table';

import { PlEntry } from '@coop/cbs/data-access';
import { debitCreditConverter } from '@coop/shared/utils';

interface ILedgerAccountTableprops {
  data: PlEntry[];
}

export const LedgerAccountTable = ({ data }: ILedgerAccountTableprops) => {
  const columns = useMemo<Column<typeof data[0]>[]>(
    () => [
      {
        id: 'ledgerName',
        header: 'Ledger Account',
        accessorKey: 'ledgerName',
      },
      {
        id: 'branchName',
        header: 'Service Center',
        accessorKey: 'branchName',
      },
      {
        id: 'currentBalance',
        header: 'Balance',
        accessorFn: (row) =>
          debitCreditConverter(row?.balance?.amount as string, row?.balance?.amountType as string),
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
