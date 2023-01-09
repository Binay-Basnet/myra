import { useMemo } from 'react';

import { Column, DetailsCard, Table } from '@myra-ui';

import { AccountLedgerDetails } from '@coop/cbs/data-access';

import { TabHeader } from '../component';
import { useLoanAccountDetailHooks } from '../hooks/useLoanAccountDetailHooks';

type CustomTransactionItem = AccountLedgerDetails & {
  index?: string | number;
};

export const LedgerPage = () => {
  const { ledgerList } = useLoanAccountDetailHooks();

  const rowData = useMemo(() => ledgerList ?? [], [ledgerList]);

  const ledgerListWithIndex =
    rowData?.map((ledger, index) => ({
      index: index + 1,
      ...ledger,
    })) ?? [];

  const columns = useMemo<Column<CustomTransactionItem>[]>(
    () => [
      {
        header: 'SN',
        accessorKey: 'index',
      },
      {
        header: 'Ledger Name',
        accessorFn: (row) => row?.ledgerName,
        meta: {
          width: '500px',
        },
      },
      {
        header: 'Balance',
        accessorFn: (row) => row?.balance,
      },
    ],
    [ledgerList]
  );
  return (
    <>
      <TabHeader heading="Ledger" />
      <DetailsCard title="Ledger Lists" hasTable>
        <Table
          isDetailPageTable
          showFooter
          isStatic
          isLoading={false}
          data={ledgerListWithIndex ?? []}
          columns={columns}
        />
      </DetailsCard>
    </>
  );
};
