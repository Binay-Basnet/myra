import { useMemo, useRef } from 'react';
import { useRouter } from 'next/router';

import { Button, DetailsCard } from '@myra-ui';

import { exportVisibleTableToExcel } from '@coop/cbs/utils';

import { LedgerTable } from './LedgerTable';
import { useCOALeafNodeDetails } from '../../hooks';

export const LedgerTabList = () => {
  const router = useRouter();

  const { id } = router.query;

  const tableRef = useRef<HTMLTableElement>(null);

  const { ledgerList } = useCOALeafNodeDetails();

  const ledgersList = useMemo(
    () =>
      ledgerList?.edges?.map((ledger, index) => ({
        index: String(index + 1),
        ...ledger?.node,
      })) ?? [],
    [ledgerList]
  );

  return (
    <DetailsCard
      title="Ledger Lists"
      hasTable
      leftBtn={
        <Button
          variant="ghost"
          onClick={() => exportVisibleTableToExcel(`${id} - ledgers list`, tableRef)}
        >
          Export
        </Button>
      }
    >
      <LedgerTable
        ledgersList={ledgersList}
        pagination={{
          total: ledgerList?.totalCount ?? 'Many',
          pageInfo: ledgerList?.pageInfo,
        }}
        tableRef={tableRef}
      />
    </DetailsCard>
  );
};
