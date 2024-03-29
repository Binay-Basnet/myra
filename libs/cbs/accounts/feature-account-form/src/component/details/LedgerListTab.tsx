import { useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Box, DetailsCard, Tooltip } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { useGetAccountLedgersListQuery } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { amountConverter } from '@coop/shared/utils';

import { TabHeader } from './TabHeader';

export const LedgerListTab = () => {
  const router = useRouter();

  const { id } = router.query;

  const { data: ledgerListQueryData, isFetching } = useGetAccountLedgersListQuery(
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
          width: '5%',
        },
      },
      {
        header: 'Ledger Name',
        accessorKey: 'ledgerName',
        cell: (props) => (
          <Box minW="10px">
            <Link
              href={`${ROUTES.CBS_TRANS_ALL_LEDGERS_DETAIL}?id=${props?.row?.original?.ledgerId}`}
              target="_blank"
            >
              <Tooltip title={props?.row?.original?.ledgerName as string} link />
            </Link>
          </Box>
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
        <Table
          isLoading={isFetching}
          isDetailPageTable
          isStatic
          data={ledgersList}
          columns={columns}
        />
      </DetailsCard>
    </>
  );
};
