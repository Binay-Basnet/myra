import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import qs from 'qs';

import { Avatar, Box, Column, Table, TablePopover } from '@myra-ui';

import {
  useAppSelector,
  useGetMemberFilterMappingQuery,
  useGetShareBalanceListQuery,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { TableListPageHeader } from '@coop/myra/components';
import {
  amountConverter,
  featureCode,
  getFilterQuery,
  getPaginationQuery,
  useTranslation,
} from '@coop/shared/utils';

export const ShareBalanceTable = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const { data, isFetching } = useGetShareBalanceListQuery({
    pagination: getPaginationQuery(),
    filter: getFilterQuery(),
  });

  const { data: memberFilterMapping } = useGetMemberFilterMappingQuery();

  const rowData = useMemo(() => data?.share?.balance?.edges ?? [], [data]);
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
      },

      {
        id: 'count',
        header: t['shareTableShareCount'],
        accessorFn: (row) => row?.node.count,
        filterFn: 'amount',
        enableColumnFilter: true,
      },
      {
        id: 'amount',
        header: t['shareTableShareAmount'],
        accessorFn: (row) => amountConverter(row?.node?.amount || 0),
        // cell: (props) => <span>{Number(props.getValue()).toLocaleString('en-IN')}</span>,
        filterFn: 'amount',
        enableColumnFilter: true,
        meta: {
          isNumeric: true,
        },
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
            node={props?.row?.original?.node}
            items={[
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
      },
    ],
    [router, t, memberFilterMapping]
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

    router.push(
      {
        query: {
          ...router.query,
          filter: queryString,
        },
      },
      undefined,
      { shallow: true }
    );
  }, []);

  return (
    <>
      <Box position="sticky" top={0} zIndex={3}>
        <TableListPageHeader
          heading={`${t['shareBalanceTable']} - ${featureCode?.shareBalanceList}`}
        />
      </Box>
      <Table
        isLoading={isFetching}
        data={rowData}
        columns={columns}
        rowOnClick={(row) =>
          router.push(`${ROUTES.CBS_MEMBER_DETAILS}?id=${row?.node?.member?.id}&tab=share`)
        }
        pagination={{
          total: data?.share?.balance?.totalCount as number,
          pageInfo: data?.share?.balance?.pageInfo,
        }}
        menu="SHARE"
      />
    </>
  );
};
