import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Avatar, Box, PageHeader, Text } from '@myra-ui';
import { Column, Table, TablePopover } from '@myra-ui/table';

import { useGetAgentListDataQuery } from '@coop/cbs/data-access';
import { featureCode, getRouterQuery, getUrl, useTranslation } from '@coop/shared/utils';

// const MEMBER_TAB_ITEMS = [
//   {
//     title: 'memberNavActive',
//     key: 'APPROVED',
//   },
//   {
//     title: 'memberNavInactive',
//     key: 'VALIDATED',
//   },
//   {
//     title: 'memberNavDraft',
//     key: 'DRAFT',
//   },
// ];

export const AgentList = () => {
  const { t } = useTranslation();

  const router = useRouter();

  // const { data, isFetching } = useGetMemberListQuery({
  //   pagination: getRouterQuery({ type: ['PAGINATION'] }),
  //   filter: {
  //     objState: (router.query['objState'] ?? ObjState.Approved) as ObjState,
  //   },
  // });

  const { data, isFetching } = useGetAgentListDataQuery(
    {
      pagination: getRouterQuery({ type: ['PAGINATION'] }),
      // filter: {
      //   objState: (router.query['objState'] ?? ObjState.Approved) as ObjState,
      // },
    },
    { staleTime: 0 }
  );

  const rowData = useMemo(() => data?.transaction?.listAgent?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: t['agentListPhoneNo'],
        accessorFn: (row) => row?.node?.phoneNo,
        // meta: {
        //   width: '20%',
        // },
      },
      {
        header: t['agentListMarketRepresentativeId'],
        accessorFn: (row) => row?.node?.id,
      },
      {
        accessorFn: (row) => row?.node?.agentName,
        header: t['agentListMarketRepresentativeName'],
        cell: (props) => (
          <Box display="flex" alignItems="center" gap="s12">
            <Avatar
              name={props?.getValue() as string}
              size="sm"
              src={props?.row?.original?.node?.profilePicUrl ?? ''}
            />
            <Text
              fontSize="s3"
              textTransform="capitalize"
              textOverflow="ellipsis"
              overflow="hidden"
            >
              {props.getValue() as string}
            </Text>
          </Box>
        ),

        meta: {
          width: '60%',
        },
      },
      {
        header: t['agentListMemberAssigned'],
        accessorFn: (row) => row?.node?.assignedMember,
      },
      {
        id: '_actions',
        header: '',
        accessorKey: 'actions',
        cell: (cell) => (
          <TablePopover
            items={[
              {
                title: 'transactionsAgentListViewDetail',
                aclKey: 'CBS_MISCELLANEOUS_MARKET_REPRESENTATIVES',
                action: 'VIEW',
                onClick: () => {
                  router.push(
                    `/${getUrl(router.pathname, 3)}/details?id=${cell?.row?.original?.node?.id}`
                  );
                },
              },
            ]}
            node={cell?.row?.original?.node}
          />
        ),
        meta: {
          width: '60px',
        },
      },
    ],
    [t]
  );

  return (
    <>
      <PageHeader
        heading={`${t['agentListMarketRepresentativeList']} - ${featureCode?.marketRepresentativeList}`}
        // tabItems={MEMBER_TAB_ITEMS}
      />

      <Table
        data={rowData}
        getRowId={(row) => String(row?.node?.id)}
        isLoading={isFetching}
        columns={columns}
        rowOnClick={(row) =>
          router.push(`/${getUrl(router.pathname, 3)}/details?id=${row?.node?.id}`)
        }
        noDataTitle={t['agentListMarketRepresentative']}
        pagination={{
          total: data?.transaction?.listAgent?.totalCount ?? 'Many',
          pageInfo: data?.transaction?.listAgent?.pageInfo,
        }}
      />
    </>
  );
};

export default AgentList;
