import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';

import { Avatar, Box } from '@myra-ui';
import { Column, Table, TablePopover } from '@myra-ui/table';

import {
  Filter_Mode,
  Share_Transaction_Direction,
  useGetShareRegisterListQuery,
} from '@coop/cbs/data-access';
import { localizedDate, ROUTES } from '@coop/cbs/utils';
import { TableListPageHeader } from '@coop/myra/components';
import { featureCode, getRouterQuery, useTranslation } from '@coop/shared/utils';

export const ShareRegisterTable = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const searchTerm = router?.query['search'] as string;

  const { data, isFetching, refetch } = useGetShareRegisterListQuery(
    {
      pagination: getRouterQuery({ type: ['PAGINATION'] }),
      filter: {
        memberName: searchTerm,
        memberCode: searchTerm,
        filterMode: Filter_Mode.Or,
      },
    },
    {
      staleTime: 0,
    }
  );

  useEffect(() => {
    refetch();
  }, [router]);

  const rowData = useMemo(() => data?.share?.register?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: t['shareRegisterDate'],
        accessorFn: (row) => localizedDate(row?.node.transactionDate),
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
        accessorFn: (row) => row?.node.member?.code,
      },

      {
        header: t['shareRegisterTableName'],
        accessorFn: (row) => row?.node?.member?.name?.local,

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
        accessorFn: (row) => row?.node?.shareAmount,
        cell: (props) => <span>{Number(props.getValue()).toLocaleString('en-IN')}</span>,
      },
      {
        id: '_actions',
        header: '',
        cell: (props) => (
          <TablePopover
            node={props?.row?.original.node}
            items={[
              {
                title: t['shareRegisterTableViewDetail'],
                aclKey: 'CBS_SHARE_SHARE_REGISTER',
                action: 'VIEW',
                onClick: (node) => {
                  router.push(`${ROUTES.CBS_SHARE_REGISTER_DETAILS}?id=${node?.id}`);
                },
              },
              {
                title: t['shareRegisterTableViewMemberProfile'],
                aclKey: 'CBS_MEMBERS_MEMBER_DETAIL',
                action: 'VIEW',
                onClick: (node) => {
                  router.push(`${ROUTES.CBS_MEMBER_DETAILS}?id=${node?.member?.id}&tab=share`);
                },
              },
            ]}
          />
        ),
        meta: {
          width: '60px',
        },
      },
    ],
    [router.locale]
  );

  return (
    <>
      <Box position="sticky" top="0" zIndex={3}>
        <TableListPageHeader
          heading={`${t['shareRegisterTable']} - ${featureCode?.shareRegisterList}`}
        />
      </Box>
      <Table
        isLoading={isFetching}
        data={rowData ?? []}
        columns={columns}
        rowOnClick={(row) =>
          router.push(`${ROUTES.CBS_SHARE_REGISTER_DETAILS}?id=${row?.node?.id}`)
        }
        pagination={{
          total: data?.share?.register?.totalCount ?? 'Many',
          pageInfo: data?.share?.register?.pageInfo,
        }}
        menu="SHARE"
      />
    </>
  );
};
