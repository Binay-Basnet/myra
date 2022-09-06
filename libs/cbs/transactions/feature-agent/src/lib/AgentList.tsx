import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { useGetAgentListDataQuery } from '@coop/cbs/data-access';
import { ActionPopoverComponent } from '@coop/myra/components';
import { Column, Table } from '@coop/shared/table';
import { Avatar, Box, PageHeader, Text } from '@coop/shared/ui';
import { getRouterQuery, useTranslation } from '@coop/shared/utils';

const MEMBER_TAB_ITEMS = [
  {
    title: 'memberNavActive',
    key: 'APPROVED',
  },
  {
    title: 'memberNavInactive',
    key: 'VALIDATED',
  },
  {
    title: 'memberNavDraft',
    key: 'DRAFT',
  },
];

export function AgentList() {
  const { t } = useTranslation();

  const router = useRouter();

  // const { data, isFetching } = useGetMemberListQuery({
  //   pagination: getRouterQuery({ type: ['PAGINATION'] }),
  //   filter: {
  //     objState: (router.query['objState'] ?? ObjState.Approved) as ObjState,
  //   },
  // });

  const { data, isFetching } = useGetAgentListDataQuery({
    pagination: getRouterQuery({ type: ['PAGINATION'] }),
    // filter: {
    //   objState: (router.query['objState'] ?? ObjState.Approved) as ObjState,
    // },
  });

  const rowData = useMemo(
    () => data?.transaction?.listAgent?.edges ?? [],
    [data]
  );

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: t['memberListTablePhoneNo'],
        accessorFn: (row) => row?.node?.phoneNo,
        // meta: {
        //   width: '20%',
        // },
      },
      {
        header: 'Agent ID',
        accessorFn: (row) => row?.node?.id,
      },
      {
        accessorFn: (row) => row?.node?.agentName,
        header: 'Agent Name',
        cell: (props) => {
          return (
            <Box display="flex" alignItems="center" gap="s12">
              <Avatar
                name="Dan Abrahmov"
                size="sm"
                src="https://bit.ly/dan-abramov"
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
          );
        },

        meta: {
          width: '60%',
        },
      },
      {
        header: 'Member Assigned',
        accessorFn: (row) => row?.node?.assignedMember,
      },
      {
        id: '_actions',
        header: '',
        accessorKey: 'actions',
        cell: (cell) => {
          return (
            <ActionPopoverComponent
              items={[
                {
                  title: 'transactionsAgentListViewDetail',
                  onClick: () => {
                    router.push(
                      `/transactions/agent/${cell?.row?.original?.node?.id}/overview`
                    );
                  },
                },
              ]}
              id={cell?.row?.original?.node?.id as string}
            />
          );
        },
        meta: {
          width: '60px',
        },
      },
    ],
    [t]
  );

  return (
    <>
      <PageHeader heading={'Agent List'} tabItems={MEMBER_TAB_ITEMS} />

      <Table
        data={rowData}
        getRowId={(row) => String(row?.node?.id)}
        isLoading={isFetching}
        columns={columns}
        noDataTitle={'Agent'}
        pagination={{
          total: data?.transaction?.listAgent?.totalCount ?? 'Many',
          pageInfo: data?.transaction?.listAgent?.pageInfo,
        }}
      />
    </>
  );
}

export default AgentList;
