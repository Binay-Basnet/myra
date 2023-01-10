import { ReactNode, useMemo } from 'react';

import { DetailsCard, Tooltip } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { LedgerList } from '@coop/cbs/data-access';
import { localizedDate, RedirectButton, ROUTES } from '@coop/cbs/utils';

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

  const columns = useMemo<Column<typeof ledgersList[0]>[]>(
    () => [
      {
        header: 'SN',
        accessorKey: 'index',
        cell: (props) => (props.getValue() ? props.getValue() : 'N/A'),
      },
      {
        header: 'Date',
        accessorKey: 'date',
        cell: (props) => localizedDate(props?.row?.original?.date),
      },
      {
        header: 'Ledger Name',
        cell: (props) => (
          <RedirectButton
            label={<Tooltip title={props?.row?.original?.ledgerName as string} />}
            link={`${ROUTES.SETTINGS_GENERAL_COA_DETAILS}?id=${props?.row?.original?.accountCode}`}
          />
        ),
      },
      {
        header: 'Service Center',
        accessorKey: 'serviceCenter',
      },
      {
        header: 'Balance',
        accessorFn: (row) => row?.balance as string,
      },
    ],
    []
  );

  return (
    <DetailsCard title="Ledger Lists" hasTable leftBtn={headerButton}>
      <Table isDetailPageTable isStatic data={ledgersList} columns={columns} />
    </DetailsCard>
  );
};
