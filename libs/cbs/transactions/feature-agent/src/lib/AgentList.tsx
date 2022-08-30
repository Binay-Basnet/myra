import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { ObjState, useGetMemberListQuery } from '@coop/cbs/data-access';
import { PopoverComponent } from '@coop/myra/components';
import { Column, Table } from '@coop/shared/table';
import { Avatar, Box, PageHeader, Text } from '@coop/shared/ui';
import { getRouterQuery, useTranslation } from '@coop/shared/utils';

const memberTypeSlug = {
  INDIVIDUAL: 'individual',
  INSTITUTION: 'institution',
  COOPERATIVE: 'coop',
  COOPERATIVE_UNION: 'coop_union',
};

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

  const { data, isFetching } = useGetMemberListQuery({
    pagination: getRouterQuery({ type: ['PAGINATION'] }),
    filter: {
      objState: (router.query['objState'] ?? ObjState.Approved) as ObjState,
    },
  });

  const rowData = useMemo(() => data?.members?.list?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: t['memberListTablePhoneNo'],
        accessorFn: (row) => row?.node?.contact,
        // meta: {
        //   width: '20%',
        // },
      },
      {
        header: 'Agent ID',
        accessorFn: (row) => row?.node?.id,
      },
      {
        accessorFn: (row) => row?.node?.name?.local,
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
                {props.getValue()}
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
        accessorFn: (row) => row?.node?.code,
      },
      {
        id: '_actions',
        header: '',
        accessorKey: 'actions',
        cell: (cell) => {
          const member = cell?.row?.original?.node;
          const memberData = { id: member?.id, type: member?.type };
          return (
            <PopoverComponent
              items={[
                {
                  title: 'memberListTableViewMemberProfile',
                },
                {
                  title: 'memberListTableEditMember',
                  onClick: (member) => {
                    router.push(
                      `/members/${
                        memberTypeSlug[member?.type || 'INDIVIDUAL']
                      }/edit/${member?.id}`
                    );
                  },
                },
                {
                  title: 'memberListTableMakeInactive',
                },
              ]}
              member={memberData}
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
        noDataTitle={t['member']}
        pagination={{
          total: data?.members?.list?.totalCount ?? 'Many',
          pageInfo: data?.members.list.pageInfo,
        }}
      />
    </>
  );
}

export default AgentList;
