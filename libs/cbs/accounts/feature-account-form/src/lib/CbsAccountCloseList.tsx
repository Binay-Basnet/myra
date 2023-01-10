import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Avatar, Box, PageHeader, Text } from '@myra-ui';
import { Column, Table, TablePopover } from '@myra-ui/table';

import { ObjState, useGetAccountTableListMinimalQuery } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { featureCode, getRouterQuery, useTranslation } from '@coop/shared/utils';

export const CBSAccountCloseList = () => {
  const router = useRouter();

  const { t } = useTranslation();

  const { data, isLoading } = useGetAccountTableListMinimalQuery(
    {
      paginate: getRouterQuery({ type: ['PAGINATION'], query: router.query }),
      filter: {
        objState: ObjState.Inactive,
      },
    },
    {
      staleTime: 0,
    }
  );

  const rowData = useMemo(() => data?.account?.list?.edges ?? [], [data]);

  // const popoverTitle = [
  //   {
  //     title: 'depositProductEdit',
  //     onClick: (id: string) => router.push(`/accounts/account-open/edit/${id}`),
  //   },
  // ];

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
        accessorFn: (row) => row?.node?.accountName,
      },
      {
        header: 'Product Name',
        accessorFn: (row) => row?.node?.product?.productName,
      },
      {
        header: 'Account Closed Date',
        accessorFn: (row) => row?.node?.createdAt,
        cell: (props) => <span>{props?.row?.original?.node?.closedAt?.split('T')[0]} </span>,
      },
      {
        id: '_actions',
        header: '',
        cell: (props) => (
          <TablePopover
            items={[
              {
                title: 'View Details',
                onClick: (row) =>
                  router.push(`${ROUTES.CBS_ACCOUNT_CLOSED_DETAILS}?id=${row['id']}`),
              },
            ]}
            node={props?.row?.original?.node}
          />
        ),
      },
    ],
    [t]
  );

  return (
    <>
      <PageHeader heading={`${t['accountClose']} - ${featureCode?.accountCloseList}`} />

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

export default CBSAccountCloseList;
