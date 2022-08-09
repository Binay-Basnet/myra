import { useMemo } from 'react';
import { useRouter } from 'next/router';

import {
  Arrange,
  ObjState,
  useGetMemberListQuery,
} from '@coop/cbs/data-access';
import { Address } from '@coop/cbs/data-access';
import { PopoverComponent } from '@coop/myra/components';
import { Column, Table } from '@coop/shared/table';
import {
  Avatar,
  Box,
  DEFAULT_PAGE_SIZE,
  PageHeader,
  Text,
} from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { MEMBER_TAB_ITEMS } from '../constants/MEMBER_TAB_ITEMS';

const formatAddress = (address: Address | undefined | null) => {
  if (
    !address?.locality?.local &&
    !address?.district?.local &&
    !address?.state?.local
  ) {
    return '-';
  }

  const addressArr = [];

  if (address?.locality?.local) {
    addressArr.push(address?.locality?.local);
  }

  if (address?.district?.local) {
    addressArr.push(address?.district?.local);
  }

  if (address?.state?.local) {
    addressArr.push(address?.state?.local);
  }

  return addressArr.join(', ');
};

export function MemberListPage() {
  const { t } = useTranslation();

  const router = useRouter();
  const { data, isFetching } = useGetMemberListQuery(
    router.query['before']
      ? {
          objState: (router.query['objState'] ?? ObjState.Approved) as ObjState,
          pagination: {
            last: Number(router.query['last'] ?? DEFAULT_PAGE_SIZE),
            before: router.query['before'] as string,
          },
          column: 'ID',
          arrange: Arrange.Desc,
        }
      : {
          objState: (router.query['objState'] ?? ObjState.Approved) as ObjState,
          pagination: {
            first: Number(router.query['first'] ?? DEFAULT_PAGE_SIZE),
            after: (router.query['after'] ?? '') as string,
          },
          column: 'ID',
          arrange: Arrange.Desc,
        },
    {
      staleTime: 0,
    }
  );

  const rowData = useMemo(() => data?.members?.list?.edges ?? [], [data]);

  // const popoverTitle = [
  //   {
  //     title: 'memberListTableViewMemberProfile',
  //   },
  //   {
  //     title: 'memberListTableEditMember',
  //     onClick: (member?: Member | null) =>
  //       router.push(
  //         `/members/${member?.type.toLowerCase()}/edit/${member?.id}`
  //       ),
  //   },
  //   {
  //     title: 'memberListTableMakeInactive',
  //   },
  // ];

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
        cell: (cell) => (
          <PopoverComponent
            items={[
              {
                title: 'memberListTableViewMemberProfile',
              },
              {
                title: 'memberListTableEditMember',
                onClick: (member) =>
                  router.push(
                    `/members/${member?.type?.toLowerCase()}/edit/${member?.id}`
                  ),
              },
              {
                title: 'memberListTableMakeInactive',
              },
            ]}
            member={cell?.row?.original?.node}
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
        heading={t['memberLayoutMembers']}
        tabItems={MEMBER_TAB_ITEMS}
      />

      <Table
        data={rowData}
        getRowId={(row) => String(row?.node?.id)}
        isLoading={isFetching}
        columns={columns}
        pagination={{
          total: data?.members?.list?.totalCount ?? 'Many',
          endCursor: data?.members?.list.pageInfo?.endCursor ?? '',
          startCursor: data?.members?.list.pageInfo?.startCursor ?? '',
        }}
      />
    </>
  );
}

export default MemberListPage;
