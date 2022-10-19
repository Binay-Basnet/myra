import React, { useMemo } from 'react';
import { useRouter } from 'next/router';

import { ObjState, useGetMemberListQuery } from '@coop/cbs/data-access';
import { formatTableAddress } from '@coop/cbs/utils';
import { PopoverComponent } from '@coop/myra/components';
import { Column, Table } from '@coop/shared/table';
import { Avatar, Box, PageHeader, Text } from '@coop/shared/ui';
import { featureCode, getRouterQuery, useTranslation } from '@coop/shared/utils';

import { MEMBER_TAB_ITEMS } from '../constants/MEMBER_TAB_ITEMS';

const memberTypeSlug = {
  INDIVIDUAL: 'individual',
  INSTITUTION: 'institution',
  COOPERATIVE: 'coop',
  COOPERATIVE_UNION: 'coop_union',
};

export const MemberListPage = () => {
  const { t } = useTranslation();

  const router = useRouter();

  const { data, isFetching, refetch } = useGetMemberListQuery({
    pagination: getRouterQuery({ type: ['PAGINATION'] }),
    filter: {
      objState: (router.query['objState'] ?? ObjState.Approved) as ObjState,
    },
  });

  React.useEffect(() => {
    refetch();
  }, []);

  const rowData = useMemo(() => data?.members?.list?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        id: 'id',
        header: t['memberListTableMemberID'],
        accessorFn: (row) => row?.node?.id,
        // enableSorting: true,
      },
      {
        id: 'name',
        accessorFn: (row) => row?.node?.name?.local,
        header: t['memberListTableName'],
        // enableSorting: true,
        cell: (props) => (
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
        ),

        meta: {
          width: '400px',
        },
      },
      {
        header: t['memberListTableAddress'],
        accessorFn: (row) => formatTableAddress(row?.node?.address),
        meta: {
          width: '220px',
        },
      },
      {
        header: t['memberListTablePhoneNo'],
        accessorFn: (row) => row?.node?.contact,
        meta: {
          width: '120px',
        },
      },
      {
        header: t['memberListDateJoined'],
        accessorFn: (row) => row?.node?.dateJoined?.split(' ')[0] ?? 'N/A',
        meta: {
          width: '100px',
        },
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
                  onClick: (memberRow) => {
                    router.push(
                      `/members/${memberTypeSlug[memberRow?.type || 'INDIVIDUAL']}/edit/${
                        memberRow?.id
                      }`
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
        heading={`${t['memberLayoutMembers']} - ${featureCode?.memberList}`}
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
};

export default MemberListPage;
