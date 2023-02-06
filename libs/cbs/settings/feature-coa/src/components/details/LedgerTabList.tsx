import { useMemo } from 'react';

import { DetailsCard, Switch, Tooltip } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { useUpdateLedgerStatusMutation } from '@coop/cbs/data-access';
import { localizedDate, RedirectButton, ROUTES } from '@coop/cbs/utils';
import { debitCreditConverter } from '@coop/shared/utils';

import { useCOALeafNodeDetails } from '../../hooks';

export const LedgerTabList = () => {
  const { ledgerList } = useCOALeafNodeDetails();

  const ledgersList = useMemo(
    () =>
      ledgerList?.edges?.map((ledger, index) => ({
        index: String(index + 1),
        ...ledger,
      })) ?? [],
    [ledgerList]
  );
  const { mutateAsync } = useUpdateLedgerStatusMutation();

  const columns = useMemo<Column<typeof ledgersList[0]>[]>(
    () => [
      {
        header: 'SN.',
        accessorKey: 'index',
      },
      {
        header: 'Date',
        cell: (props) => localizedDate(props?.row?.original?.node?.date),
      },
      {
        header: 'Ledger Name',
        cell: (props) => (
          <RedirectButton
            label={<Tooltip title={props?.row?.original?.node?.ledgerName as string} />}
            link={`${ROUTES.SETTINGS_GENERAL_COA_DETAILS}?id=${props?.row?.original?.node?.accountCode}`}
          />
        ),
      },
      {
        header: 'Service Center',
        accessorFn: (row) => row?.node?.serviceCenter as string,
      },
      {
        header: 'Balance',
        accessorFn: (row) =>
          debitCreditConverter(row?.node?.balance as string, row?.node?.balanceType as string),
      },
      {
        header: 'Status',
        cell: (props) => (
          <Switch
            defaultChecked={props?.row?.original?.node?.status as boolean}
            onChange={(e) =>
              mutateAsync({
                id: props?.row?.original?.node?.accountCode as string,
                status: e.target.checked,
              })
            }
          />
        ),
      },
    ],
    []
  );

  return (
    <DetailsCard title="Ledger Lists" hasTable>
      <Table
        isDetailPageTable
        isStatic
        data={ledgersList}
        columns={columns}
        pagination={{
          total: ledgerList?.totalCount ?? 'Many',
          pageInfo: ledgerList?.pageInfo,
        }}
      />
    </DetailsCard>
  );
};
