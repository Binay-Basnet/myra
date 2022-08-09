import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { useGetAccountTableListQuery } from '@coop/cbs/data-access';
import { ActionPopoverComponent } from '@coop/myra/components';
import { Column, Table } from '@coop/shared/table';
import {
  Avatar,
  Box,
  DEFAULT_PAGE_SIZE,
  PageHeader,
  Text,
} from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { MEMBER_TAB_ITEMS } from '../component/form/utils/memberTabItems';
export function CBSAccountList() {
  const router = useRouter();

  const { t } = useTranslation();

  const { data, isLoading } = useGetAccountTableListQuery(
    router.query['before']
      ? {
          paginate: {
            last: Number(router.query['last'] ?? DEFAULT_PAGE_SIZE),
            before: router.query['before'] as string,
          },
        }
      : {
          paginate: {
            first: Number(router.query['first'] ?? DEFAULT_PAGE_SIZE),
            after: (router.query['after'] ?? '') as string,
          },
        },
    {
      staleTime: 0,
    }
  );

  const rowData = useMemo(() => data?.account?.list?.edges ?? [], [data]);

  const popoverTitle = [
    {
      title: 'depositProductEdit',
      onClick: (id: string) => router.push(`/accounts/account-open/edit/${id}`),
    },
  ];

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Member Id',
        accessorFn: (row) => row?.node?.id,
      },

      {
        header: 'Member Name',
        accessorFn: (row) => row?.node?.member?.name?.local,
        cell: (props) => {
          return (
            <Box
              display="flex"
              flexDirection="row"
              gap="s8"
              justifyContent="flex-start"
              alignItems={'center'}
            >
              <Avatar
                name={props.row?.original?.node?.member?.name?.local}
                size="sm"
              />
              <Text fontWeight="400" fontSize="r1">
                {props.row?.original?.node?.member?.name?.local}
              </Text>
            </Box>
          );
        },
      },

      {
        header: 'Account Name',
        accessorFn: (row) => row?.node?.product?.productName,
      },
      {
        header: 'Account Open Date',
        accessorFn: (row) => row?.node?.createdAt,
        cell: (props) => {
          return (
            <span>{props?.row?.original?.node?.createdAt.split('T')[0]} </span>
          );
        },
      },
      {
        id: '_actions',
        header: '',
        cell: (props) => (
          <ActionPopoverComponent
            items={popoverTitle}
            id={props?.row?.original?.node?.id}
          />
        ),
        meta: {
          width: '50px',
        },
      },
    ],
    [t]
  );

  return (
    <>
      {/* <Box borderBottom="1px solid #E6E6E6" p="8px 16px">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          h="100%"
        >
          <Text fontSize="r2" fontWeight="600" color="gray.800">
            "Account List"
          </Text>
        </Box>
      </Box> */}

      <PageHeader heading="Account List" tabItems={MEMBER_TAB_ITEMS} />

      <Table
        isLoading={isLoading}
        data={rowData}
        columns={columns}
        pagination={{
          total: data?.account?.list?.totalCount ?? 'Many',
          endCursor: data?.account?.list?.pageInfo?.startCursor ?? '',
          startCursor: data?.account?.list?.pageInfo?.endCursor ?? '',
        }}
      />
    </>
  );
}

export default CBSAccountList;
