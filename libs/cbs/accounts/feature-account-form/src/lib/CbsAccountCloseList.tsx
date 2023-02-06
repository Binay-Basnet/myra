import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Avatar, Box, PageHeader, Text } from '@myra-ui';
import { Column, Table, TablePopover } from '@myra-ui/table';

import { Filter_Mode, ObjState, useGetAccountTableListMinimalQuery } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { featureCode, getRouterQuery, useTranslation } from '@coop/shared/utils';

export const CBSAccountCloseList = () => {
  const router = useRouter();

  const { t } = useTranslation();
  const searchTerm = router?.query['search'] as string;

  const { data, isLoading } = useGetAccountTableListMinimalQuery(
    {
      paginate: getRouterQuery({ type: ['PAGINATION'], query: router.query }),
      filter: {
        objState: ObjState.Inactive,
        query: searchTerm,
        id: searchTerm,
        memberId: searchTerm,
        memberCode: searchTerm,
        productID: searchTerm,
        filterMode: Filter_Mode.Or,
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
        header: 'Account Closed Date',
        accessorFn: (row) => row?.node?.createdAt,
        cell: (props) => <span>{props?.row?.original?.node?.closedAt} </span>,
      },
      {
        header: 'Member Code',
        accessorFn: (row) => row?.node?.member?.code,
      },
      {
        header: 'Account Name',
        accessorFn: (row) => row?.node?.accountName,
        meta: { width: '50%' },
      },
      {
        header: 'Product Name',
        accessorFn: (row) => row?.node?.product?.productName,
        meta: { width: '50%' },
      },
      {
        header: 'Member',
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
        id: '_actions',
        header: '',
        cell: (props) => (
          <TablePopover
            items={[
              {
                title: 'View Details',
                aclKey: 'CBS_SAVINGS_SAVING_ACCOUNT_CLOSE',
                action: 'VIEW',
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
      <PageHeader heading={`${t['accountClose']} - ${featureCode?.savingCloseAccountList}`} />

      <Table
        isLoading={isLoading}
        data={rowData}
        columns={columns}
        rowOnClick={(row) => {
          router.push(`${ROUTES.CBS_ACCOUNT_CLOSED_DETAILS}?id=${row?.node?.id}`);
        }}
        pagination={{
          total: data?.account?.list?.totalCount ?? 'Many',
          pageInfo: data?.account?.list?.pageInfo,
        }}
        menu="SAVINGS"
      />
    </>
  );
};

export default CBSAccountCloseList;
