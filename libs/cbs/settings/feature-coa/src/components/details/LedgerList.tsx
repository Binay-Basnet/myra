import { ReactNode, useMemo } from 'react';

import { DetailsCard, Switch, Tooltip } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import {
  LedgerList,
  useGetMemberFilterMappingQuery,
  useUpdateLedgerStatusMutation,
} from '@coop/cbs/data-access';
import { localizedDate, RedirectButton, ROUTES } from '@coop/cbs/utils';
import { debitCreditConverter } from '@coop/shared/utils';

interface ILedgerListsProps {
  ledgers: LedgerList[];
  headerButton?: ReactNode;
}

export const LedgerLists = ({ ledgers, headerButton }: ILedgerListsProps) => {
  const { data: filterMapping } = useGetMemberFilterMappingQuery();
  const ledgersList = useMemo(
    () =>
      ledgers?.map((ledger, index) => ({
        index: String(index + 1),
        ...ledger,
      })) ?? [],
    [ledgers]
  );
  const { mutateAsync } = useUpdateLedgerStatusMutation();

  const columns = useMemo<Column<typeof ledgersList[0]>[]>(
    () => [
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
        enableColumnFilter: true,
        meta: {
          filterMaps: {
            list: filterMapping?.members?.filterMapping?.serviceCenter,
          },
        },
      },
      {
        header: 'Balance',
        accessorFn: (row) =>
          debitCreditConverter(row?.balance as string, row?.balanceType as string),
        enableColumnFilter: true,
        filterFn: 'amount',
      },
      {
        header: 'Status',
        // accessorFn: (row) => row?.balance as string,
        cell: (props) => (
          <Switch
            defaultChecked={props?.row?.original?.status as boolean}
            onChange={(e) =>
              mutateAsync({
                id: props?.row?.original?.accountCode as string,
                status: e.target.checked,
              })
            }
          />
        ),
      },
    ],
    [filterMapping?.members?.filterMapping?.serviceCenter]
  );

  return (
    <DetailsCard title="Ledger Lists" hasTable leftBtn={headerButton}>
      <Table isDetailPageTable isStatic data={ledgersList} columns={columns} />
    </DetailsCard>
  );
};
