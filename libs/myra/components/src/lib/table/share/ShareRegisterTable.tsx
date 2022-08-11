import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';

import {
  Share_Transaction_Direction,
  useGetShareRegisterListQuery,
} from '@coop/cbs/data-access';
import { PopoverComponent, TableListPageHeader } from '@coop/myra/components';
import { Column, Table } from '@coop/shared/table';
import { Avatar, Box, DEFAULT_PAGE_SIZE } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const ShareRegisterTable = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const { data, isFetching, refetch } = useGetShareRegisterListQuery(
    router.query['before']
      ? {
          last: Number(router.query['last'] ?? DEFAULT_PAGE_SIZE),
          before: router.query['before'] as string,
        }
      : {
          first: Number(router.query['first'] ?? DEFAULT_PAGE_SIZE),
          after: (router.query['after'] ?? '') as string,
        },
    {
      staleTime: 0,
    }
  );

  useEffect(() => {
    refetch();
  }, [router]);

  const rowData = useMemo(() => data?.share?.register?.edges ?? [], [data]);

  const popoverTitle = [
    'shareRegisterTableViewDetail',
    'shareRegisterTableViewMemberProfile',
  ];

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: t['shareRegisterDate'],
        accessorFn: (row) => row?.node.transactionDate,
      },

      {
        header: t['shareRegisterType'],
        accessorFn: (row) => row?.node.transactionDirection,
        cell: (props) => {
          return (
            <span>
              {(props.getValue() === Share_Transaction_Direction.Purchase &&
                'Purchase') ||
                (props.getValue() === Share_Transaction_Direction.Return &&
                  'Return')}
            </span>
          );
        },
      },
      {
        header: t['shareRegisterTableMemberID'],
        accessorFn: (row) => row?.node.member?.id,
      },

      {
        header: t['shareRegisterTableName'],
        accessorFn: (row) => row?.node?.member?.name?.local,

        cell: (props) => {
          return (
            <Box display="flex" alignItems="center" gap="2">
              <Avatar
                name={props.getValue()}
                size="sm"
                src="https://bit.ly/dan-abramov"
              />
              <span>{props.getValue()}</span>
            </Box>
          );
        },
      },

      {
        header: t['shareRegisterTableNameToFrom'],
        accessorFn: (row) => row?.node.startNumber,

        cell: (props) => {
          return (
            <span>
              {props.getValue()} - {props?.row?.original?.node?.endNumber}
            </span>
          );
        },
      },

      {
        id: 'share-dr',
        header: t['shareRegisterTableNameShareDr'],
        accessorFn: (row) => row?.node.debit,

        cell: (props) => {
          return (
            <span>
              {props.getValue()
                ? `${Number(props?.getValue())?.toLocaleString('en-IN')}`
                : '-'}
            </span>
          );
        },
      },
      {
        id: 'share-cr',
        header: t['shareRegisterTableNameShareCr'],
        accessorFn: (row) => row?.node.credit,

        cell: (props) => {
          return (
            <span>
              {props.getValue()
                ? `${Number(props.getValue()).toLocaleString('en-IN')}`
                : '-'}
            </span>
          );
        },
      },
      {
        header: t['shareRegisterTableNameBalance'],
        accessorFn: (row) => row?.node.balance,
        cell: (props) => {
          return (
            <span>{Number(props.getValue()).toLocaleString('en-IN')}</span>
          );
        },
      },
      {
        id: '_actions',
        header: '',
        cell: () => <PopoverComponent title={popoverTitle} />,
      },
    ],
    [router.locale]
  );

  const shareRows = useMemo(
    () => [
      {
        title: 'shareActive',
        key: 'APPROVED',
      },
      {
        title: 'shareSubmitted',
        key: 'VALIDATED',
      },
      {
        title: 'shareDraft',
        key: 'DRAFT',
      },
    ],
    []
  );

  return (
    <>
      <TableListPageHeader
        heading={'shareRegisterTable'}
        tabItems={shareRows}
      />

      <Table
        isLoading={isFetching}
        data={rowData ?? []}
        columns={columns}
        pagination={{
          total: data?.share?.register?.totalCount ?? 'Many',
          endCursor: data?.share?.register?.pageInfo?.endCursor ?? '',
          startCursor: data?.share?.register?.pageInfo?.startCursor ?? '',
        }}
      />
    </>
  );
};
