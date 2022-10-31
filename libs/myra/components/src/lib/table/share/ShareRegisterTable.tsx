import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';

import { Share_Transaction_Direction, useGetShareRegisterListQuery } from '@coop/cbs/data-access';
import { PopoverComponent, TableListPageHeader } from '@coop/myra/components';
import { Column, Table } from '@coop/shared/table';
import { Avatar, Box } from '@coop/shared/ui';
import { featureCode, getRouterQuery, useTranslation } from '@coop/shared/utils';

export const ShareRegisterTable = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const { data, isFetching, refetch } = useGetShareRegisterListQuery(
    {
      pagination: getRouterQuery({ type: ['PAGINATION'] }),
    },
    {
      staleTime: 0,
    }
  );

  useEffect(() => {
    refetch();
  }, [router]);

  const rowData = useMemo(() => data?.share?.register?.edges ?? [], [data]);

  const popoverTitle = ['shareRegisterTableViewDetail', 'shareRegisterTableViewMemberProfile'];

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: t['shareRegisterDate'],
        accessorFn: (row) => row?.node.transactionDate,
      },

      {
        header: t['shareRegisterType'],
        accessorFn: (row) => row?.node.transactionDirection,
        cell: (props) => (
          <span>
            {(props.getValue() === Share_Transaction_Direction.Purchase &&
              t['shareRegisterTableIssue']) ||
              (props.getValue() === Share_Transaction_Direction.Return &&
                t['shareRegisterTableReturn'])}
          </span>
        ),
      },
      {
        header: t['shareRegisterTableMemberID'],
        accessorFn: (row) => row?.node.member?.id,
      },

      {
        header: t['shareRegisterTableName'],
        accessorFn: (row) => row?.node?.member?.name?.local,

        cell: (props) => (
          <Box display="flex" alignItems="center" gap="2">
            <Avatar
              name={props.getValue() as string}
              size="sm"
              src={props?.row?.original?.node?.member?.profilePic ?? ' '}
            />
            <span>{props.getValue() as string}</span>
          </Box>
        ),
      },

      {
        header: t['shareRegisterTableNameToFrom'],
        accessorFn: (row) => row?.node.startNumber,

        cell: (props) => (
          <span>
            {props.getValue() as string} - {props?.row?.original?.node?.endNumber}
          </span>
        ),
      },

      {
        id: 'share-dr',
        header: t['shareRegisterTableNameShareDr'],
        accessorFn: (row) => row?.node.debit,

        cell: (props) => (
          <span>
            {props.getValue() ? `${Number(props?.getValue())?.toLocaleString('en-IN')}` : '-'}
          </span>
        ),
      },
      {
        id: 'share-cr',
        header: t['shareRegisterTableNameShareCr'],
        accessorFn: (row) => row?.node.credit,

        cell: (props) => (
          <span>
            {props.getValue() ? `${Number(props.getValue()).toLocaleString('en-IN')}` : '-'}
          </span>
        ),
      },
      {
        header: t['shareRegisterTableNameBalance'],
        accessorFn: (row) => row?.node.balance,
        cell: (props) => <span>{Number(props.getValue()).toLocaleString('en-IN')}</span>,
      },
      {
        id: '_actions',
        header: '',
        cell: () => <PopoverComponent title={popoverTitle} />,
        meta: {
          width: '60px',
        },
      },
    ],
    [router.locale]
  );

  return (
    <>
      <Box position="sticky" top="110px" zIndex={3}>
        <TableListPageHeader
          heading={`${t['shareRegisterTable']} - ${featureCode?.shareRegister}`}
        />
      </Box>
      <Table
        isLoading={isFetching}
        data={rowData ?? []}
        columns={columns}
        pagination={{
          total: data?.share?.register?.totalCount ?? 'Many',
          pageInfo: data?.share?.register?.pageInfo,
        }}
      />
    </>
  );
};
