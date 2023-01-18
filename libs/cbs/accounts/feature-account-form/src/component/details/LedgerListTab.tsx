import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { DetailsCard, Tooltip } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { useGetAccountLedgersListQuery } from '@coop/cbs/data-access';
import { RedirectButton, ROUTES } from '@coop/cbs/utils';
import { amountConverter } from '@coop/shared/utils';

import { TabHeader } from './TabHeader';

export const LedgerListTab = () => {
  const router = useRouter();

  const { id } = router.query;

  const { data: ledgerListQueryData } = useGetAccountLedgersListQuery(
    { accountId: id as string },
    { enabled: !!id }
  );

  const ledgersList = useMemo(
    () =>
      ledgerListQueryData?.account?.listAccountLedgers?.data?.map((ledger, index) => ({
        index: String(index + 1),
        ...ledger,
      })) ?? [],
    [ledgerListQueryData]
  );

  const columns = useMemo<Column<typeof ledgersList[0]>[]>(
    () => [
      {
        header: 'SN',
        accessorKey: 'index',
        cell: (props) => (props.getValue() ? props.getValue() : 'N/A'),
        meta: {
          width: '10%',
        },
      },
      {
        header: 'Ledger Name',
        cell: (props) => (
          <RedirectButton
            label={<Tooltip title={props?.row?.original?.ledgerName as string} />}
            link={`${ROUTES.SETTINGS_GENERAL_COA_DETAILS}?id=${props?.row?.original?.ledgerId}`}
          />
        ),
      },
      {
        header: 'Balance',
        accessorFn: (row) => `${row?.balanceType}. ${amountConverter(row?.balance ?? 0)}`,
      },
    ],
    []
  );

  return (
    <>
      <TabHeader heading="Ledger Lists" />

      <DetailsCard title="Ledger Lists" hasTable>
        <Table isDetailPageTable isStatic data={ledgersList} columns={columns} />
      </DetailsCard>
    </>
  );
};
