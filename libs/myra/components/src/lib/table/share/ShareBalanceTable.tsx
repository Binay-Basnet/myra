import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';

import { useGetShareBalanceListQuery } from '@coop/cbs/data-access';
import { PopoverComponent, TableListPageHeader } from '@coop/myra/components';
import { Column, Table } from '@coop/shared/table';
import { Avatar, Box } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const ShareBalanceTable = () => {
  const { data, isFetching, refetch } = useGetShareBalanceListQuery();
  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    refetch();
  }, [router]);

  const rowData = useMemo(() => data?.share.balance?.edges ?? [], [data]);

  const popoverTitle = ['shareRegisterTableViewMemberProfile'];

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: t['shareTableMemberId'],
        accessorFn: (row) => row?.node?.member?.id,
      },

      {
        header: t['shareTableName'],
        accessorFn: (row) => row?.node.member.name?.local,
        cell: (props) => {
          return (
            <Box display="flex" alignItems="center" gap="2">
              <Avatar
                name={props.getValue() as string}
                size="sm"
                src="https://bit.ly/dan-abramov"
              />
              <span>{props.getValue() as string}</span>
            </Box>
          );
        },
        meta: {
          width: '50%',
        },
      },

      {
        header: t['shareTableShareCount'],
        accessorFn: (row) => row?.node.count,
        isNumeric: true,
      },
      {
        header: t['shareTableShareAmount'],
        accessorFn: (row) => row?.node.amount,
        cell: (props) => {
          return (
            <span>{Number(props.getValue()).toLocaleString('en-IN')}</span>
          );
        },
        isNumeric: true,
      },

      {
        id: '_actions',
        header: '',
        cell: () => <PopoverComponent title={popoverTitle} />,
      },
    ],
    [router.locale]
  );

  return (
    <>
      <TableListPageHeader heading={'shareBalanceTable'} />

      <Table isLoading={isFetching} data={rowData ?? []} columns={columns} />
    </>
  );
};
