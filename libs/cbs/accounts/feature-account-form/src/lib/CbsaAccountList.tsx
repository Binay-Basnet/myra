import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { useGetAccountTableListQuery } from '@coop/cbs/data-access';
import { ActionPopoverComponent } from '@coop/myra/components';
import { Column, Table } from '@coop/shared/table';
import { Avatar, Box, PageHeader, Text } from '@coop/shared/ui';
import { featureCode, getRouterQuery, useTranslation } from '@coop/shared/utils';

import { MEMBER_TAB_ITEMS } from '../component/form/utils/memberTabItems';

export const CBSAccountList = () => {
  const router = useRouter();

  const { t } = useTranslation();

  const { data, isLoading } = useGetAccountTableListQuery(
    {
      paginate: getRouterQuery({ type: ['PAGINATION'], query: router.query }),
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
        cell: (props) => (
          <Box
            display="flex"
            flexDirection="row"
            gap="s8"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Avatar name={props.row?.original?.node?.member?.name?.local} size="sm" />
            <Text fontWeight="400" fontSize="r1">
              {props.row?.original?.node?.member?.name?.local}
            </Text>
          </Box>
        ),
      },

      {
        header: 'Account Name',
        accessorFn: (row) => row?.node?.product?.productName,
      },
      {
        header: 'Account Open Date',
        accessorFn: (row) => row?.node?.createdAt,
        cell: (props) => <span>{props?.row?.original?.node?.createdAt.split('T')[0]} </span>,
      },
      {
        id: '_actions',
        header: '',
        cell: (props) => (
          <ActionPopoverComponent
            items={popoverTitle}
            id={props?.row?.original?.node?.id as string}
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
      <PageHeader
        heading={`Account List - ${featureCode?.accountList}`}
        tabItems={MEMBER_TAB_ITEMS}
      />

      <Table
        isLoading={isLoading}
        data={rowData}
        columns={columns}
        pagination={{
          total: data?.account?.list?.totalCount ?? 'Many',
          pageInfo: data?.account?.list?.pageInfo,
        }}
      />
    </>
  );
};

export default CBSAccountList;
