import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { ObjState, useGetMemberListQuery } from '@coop/cbs/data-access';
import { formatAddress } from '@coop/cbs/utils';
import { PopoverComponent } from '@coop/myra/components';
import { Column, Table } from '@coop/shared/table';
import { Avatar, Box, PageHeader, Text } from '@coop/shared/ui';
import { getRouterQuery, useTranslation } from '@coop/shared/utils';

import { MEMBER_TAB_ITEMS } from '../constants/MEMBER_TAB_ITEMS';

const memberTypeSlug = {
  INDIVIDUAL: 'individual',
  INSTITUTION: 'institution',
  COOPERATIVE: 'coop',
  COOPERATIVE_UNION: 'coop_union',
};

export function MemberListPage() {
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
        header: t['memberListTableMemberID'],
        accessorFn: (row) => row?.node?.id,
      },
      {
        accessorFn: (row) => row?.node?.name?.local,
        header: t['memberListTableName'],
        cell: (props) => {
          return (
            <Box display="flex" alignItems="center" gap="s12">
              <Avatar
                name={props.getValue() as string}
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
          );
        },

        meta: {
          width: '60%',
        },
      },
      {
        header: t['memberListTableAddress'],
        accessorFn: (row) => formatAddress(row?.node?.address),
      },
      {
        header: t['memberListTablePhoneNo'],
        accessorFn: (row) => row?.node?.contact,
        meta: {
          width: '30%',
        },
      },
      {
        header: t['memberListDateJoined'],
        accessorFn: (row) => row?.node?.dateJoined?.split(' ')[0] ?? 'N/A',
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
      <PageHeader
        heading={t['memberLayoutMembers']}
        tabItems={MEMBER_TAB_ITEMS}
      />

      <Table
        data={rowData}
        getRowId={(row) => String(row?.node?.id)}
        isLoading={isFetching}
        columns={columns}
        noDataTitle={t['member']}
        pagination={{
          total: data?.members?.list?.totalCount ?? 'Many',
          pageInfo: data?.members?.list?.pageInfo,
        }}
      />
    </>
  );
}

export default MemberListPage;
