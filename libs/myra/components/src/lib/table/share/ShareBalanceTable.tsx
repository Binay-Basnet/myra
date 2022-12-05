import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';

import { Avatar, Box } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { useGetShareBalanceListQuery } from '@coop/cbs/data-access';
import { PopoverComponent, TableListPageHeader } from '@coop/myra/components';
import { featureCode, getRouterQuery, useTranslation } from '@coop/shared/utils';

export const ShareBalanceTable = () => {
  const { data, isFetching, refetch } = useGetShareBalanceListQuery({
    pagination: getRouterQuery({ type: ['PAGINATION'] }),
  });
  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    refetch();
  }, [router]);

  const rowData = useMemo(() => data?.share?.balance?.edges ?? [], [data]);

  const popoverTitle = ['shareRegisterTableViewMemberProfile'];

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: t['shareTableMemberId'],
        accessorFn: (row) => row?.node?.member?.code,
      },

      {
        header: t['shareTableName'],
        accessorFn: (row) => row?.node.member.name?.local,
        cell: (props) => (
          <Box display="flex" alignItems="center" gap="2">
            <Avatar
              name={props.getValue() as string}
              size="sm"
              src={props?.row?.original?.node?.member?.profilePicUrl ?? ' '}
            />
            <span>{props.getValue() as string}</span>
          </Box>
        ),
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
        cell: (props) => <span>{Number(props.getValue()).toLocaleString('en-IN')}</span>,
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
      <Box position="sticky" top="110px" zIndex={3}>
        <TableListPageHeader heading={`${t['shareBalanceTable']} - ${featureCode?.shareBalance}`} />
      </Box>
      <Table
        isLoading={isFetching}
        data={rowData ?? []}
        columns={columns}
        pagination={{
          total: data?.share?.balance?.totalCount as number,
          pageInfo: data?.share?.balance?.pageInfo,
        }}
      />
    </>
  );
};
