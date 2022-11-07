import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { ObjState, useGetAccountTableListQuery } from '@coop/cbs/data-access';
import { Column, Table } from '@coop/shared/table';
import { Avatar, Box, PageHeader, TablePopover, Text } from '@coop/shared/ui';
import { featureCode, getRouterQuery, useTranslation } from '@coop/shared/utils';

const ACCOUNT_TAB_ITEMS = [
  {
    title: 'memberNavActive',
    key: ObjState.Active,
  },
  {
    title: 'accountNavDormant',
    key: ObjState.Dormant,
  },
  {
    title: 'accountSubmitted',
    key: ObjState.Submitted,
  },
];

export const CBSAccountList = () => {
  const router = useRouter();

  const { t } = useTranslation();

  const { data, isFetching } = useGetAccountTableListQuery(
    {
      paginate: getRouterQuery({ type: ['PAGINATION'] }),
      filter: {
        objState: (router.query['objState'] ?? ObjState.Active) as ObjState,
      },
    },
    {
      staleTime: 0,
    }
  );

  const rowData = useMemo(() => data?.account?.list?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Account Id',
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
            <Avatar
              src={props?.row?.original?.node?.member?.profilePicUrl as string}
              name={props.row?.original?.node?.member?.name?.local}
              size="sm"
            />
            <Text fontWeight="400" fontSize="r1">
              {props.row?.original?.node?.member?.name?.local}
            </Text>
          </Box>
        ),
      },

      {
        header: 'Account Name',
        accessorFn: (row) => row?.node?.accountName,
      },
      {
        header: 'Product Name',
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
        cell: (props) =>
          props?.row?.original?.node && (
            <TablePopover
              items={[
                {
                  title: 'View Details',
                  onClick: (row) => router.push(`/accounts/details/${row['id']}`),
                },
                {
                  title: 'depositProductEdit',
                  onClick: (row) => router.push(`/accounts/account-open/edit/${row['id']}`),
                },
              ]}
              node={props?.row?.original?.node}
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
      <Box position="sticky" top="110px" zIndex={3}>
        <PageHeader
          heading={`Account List - ${featureCode?.accountList}`}
          tabItems={ACCOUNT_TAB_ITEMS}
        />
      </Box>

      <Table
        isLoading={isFetching}
        data={rowData}
        columns={columns}
        rowOnClick={(row) => {
          router.push(`/accounts/details/${row?.node?.id}`);
        }}
        pagination={{
          total: data?.account?.list?.totalCount ?? 'Many',
          pageInfo: data?.account?.list?.pageInfo,
        }}
      />
    </>
  );
};
