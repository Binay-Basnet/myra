import { ReactNode, useMemo } from 'react';

import { DetailsCard } from '@myra-ui';

import { LedgerList } from '@coop/cbs/data-access';

import { LedgerTable } from './LedgerTable';

interface ILedgerListsProps {
  ledgers: LedgerList[];
  headerButton?: ReactNode;
}

export const LedgerLists = ({ ledgers, headerButton }: ILedgerListsProps) => {
  const ledgersList = useMemo(
    () =>
      ledgers?.map((ledger, index) => ({
        index: String(index + 1),
        ...ledger,
      })) ?? [],
    [ledgers]
  );

  return (
    <DetailsCard title="Ledger Lists" hasTable leftBtn={headerButton}>
      <LedgerTable ledgersList={ledgersList} />
    </DetailsCard>
  );
};
