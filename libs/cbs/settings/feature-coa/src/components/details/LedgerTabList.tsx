import { useMemo, useRef } from 'react';
import { useRouter } from 'next/router';

import { Button, DetailsCard, Switch, Tooltip } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { useUpdateLedgerStatusMutation } from '@coop/cbs/data-access';
import { exportVisibleTableToExcel, localizedDate, RedirectButton, ROUTES } from '@coop/cbs/utils';
import { debitCreditConverter } from '@coop/shared/utils';

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
      <Table
        isDetailPageTable
        isStatic
        data={ledgersList}
        columns={columns}
        pagination={{
          total: ledgerList?.totalCount ?? 'Many',
          pageInfo: ledgerList?.pageInfo,
        }}
        ref={tableRef}
      />
    </DetailsCard>
  );
};
