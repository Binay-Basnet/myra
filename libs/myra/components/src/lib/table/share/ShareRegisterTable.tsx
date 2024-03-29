import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import qs from 'qs';

import { Avatar, Box, Text } from '@myra-ui';
import { Column, Table, TablePopover } from '@myra-ui/table';

import {
  Share_Transaction_Direction,
  useAppSelector,
  useGetMemberFilterMappingQuery,
  useGetShareFilterMappingQuery,
  useGetShareRegisterListQuery,
} from '@coop/cbs/data-access';
import { localizedDate, ROUTES } from '@coop/cbs/utils';
import { TableListPageHeader } from '@coop/myra/components';
import {
  amountConverter,
  featureCode,
  getFilterQuery,
  getPaginationQuery,
  useTranslation,
} from '@coop/shared/utils';

export const ShareRegisterTable = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const [triggerQuery, setTriggerQuery] = useState(false);

  const { data: shareFilterMapping } = useGetShareFilterMappingQuery();

  const { data: memberFilterMapping } = useGetMemberFilterMappingQuery();

  const { data, isFetching } = useGetShareRegisterListQuery(
    {
      pagination: getPaginationQuery(),
      filter: getFilterQuery(),
    },
    { enabled: triggerQuery }
  );

  const rowData = useMemo(() => data?.share?.register?.edges ?? [], [data]);
  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        id: 'transactionDate',
        header: t['shareRegisterDate'],
        accessorKey: 'node.transactionDate',
        cell: (row) => <Text>{localizedDate(row?.row?.original?.node?.transactionDate)}</Text>,
        filterFn: 'dateTime',
        enableColumnFilter: true,
        enableSorting: true,
        meta: {
          orderId: 'id',
        },
      },

      {
        id: 'transactionDirection',
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
        enableColumnFilter: true,
        meta: {
          filterMaps: {
            list: shareFilterMapping?.share?.filterMapping?.transactionDirection || [],
          },
        },
      },
      {
        header: t['shareRegisterTableMemberID'],
        accessorFn: (row) => row?.node.member?.code,
      },

      {
        header: t['shareRegisterTableName'],
        accessorFn: (row) => row?.node?.member?.name?.local,
        meta: {
          width: '25%',
        },

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
        meta: {
          width: '10%',
        },

        cell: (props) => (
          <span>
            {props.getValue() as string} - {props?.row?.original?.node?.endNumber}
          </span>
        ),
      },

      {
        id: 'debit',
        header: t['shareRegisterTableNameShareDr'],
        accessorFn: (row) => row?.node.debit,
        meta: {
          width: '10%',
        },
        enableColumnFilter: true,
        filterFn: 'amount',
        cell: (props) => (
          <span>
            {props.getValue() ? `${Number(props?.getValue())?.toLocaleString('en-IN')}` : '-'}
          </span>
        ),
      },
      {
        id: 'credit',
        header: t['shareRegisterTableNameShareCr'],
        accessorFn: (row) => row?.node.credit,
        cell: (props) => (
          <span>
            {props.getValue() ? `${Number(props.getValue()).toLocaleString('en-IN')}` : '-'}
          </span>
        ),
        enableColumnFilter: true,
        filterFn: 'amount',
      },
      {
        id: 'shareAmount',
        header: t['shareRegisterTableNameBalance'],
        accessorFn: (row) => amountConverter(row?.node?.shareAmount as string),
        meta: { isNumeric: true },
        enableColumnFilter: true,
        filterFn: 'amount',
      },
      {
        id: 'serviceCenter',
        header: 'Service Center',
        accessorFn: (row) => row?.node?.serviceCenter,
        enableColumnFilter: true,
        meta: {
          filterMaps: {
            list: memberFilterMapping?.members?.filterMapping?.serviceCenter,
          },
        },
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
          width: 's60',
        },
      },
    ],
    [t, shareFilterMapping?.share?.filterMapping?.transactionDirection, router, memberFilterMapping]
  );

  const user = useAppSelector((state) => state.auth?.user);

  useEffect(() => {
    const queryString = qs.stringify(
      {
        serviceCenter: {
          value: user?.currentBranch?.id,
          compare: '=',
        },
      },
      { allowDots: true, arrayFormat: 'brackets', encode: false }
    );

    router
      .push(
        {
          query: {
            ...router.query,
            filter: queryString,
          },
        },
        undefined,
        { shallow: true }
      )
      .then(() => setTriggerQuery(true));
  }, []);

  return (
    <>
      <Box position="sticky" top="0" zIndex={3}>
        <TableListPageHeader
          heading={`${t['shareRegisterTable']} - ${featureCode?.shareRegisterList}`}
        />
      </Box>
      <Table
        isLoading={triggerQuery ? isFetching : true}
        data={rowData}
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
