import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Avatar, Box, PageHeader, TablePopover, Text } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { Filter_Mode, ObjState, useGetAccountTableListMinimalQuery } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
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
  const searchTerm = router?.query['search'] as string;
  const objState = router?.query['objState'];

  const { data, isFetching } = useGetAccountTableListMinimalQuery(
    {
      paginate: getRouterQuery({ type: ['PAGINATION'] }),
      filter: {
        query: searchTerm,
        id: searchTerm,
        memberId: searchTerm,
        productID: searchTerm,
        filterMode: Filter_Mode.Or,
        objState: (router.query['objState'] ?? ObjState.Active) as ObjState,
      },
    },
    {
      enabled: searchTerm !== 'undefined',
    }
  );

  const rowData = useMemo(() => data?.account?.list?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Account Open Date',
        accessorFn: (row) => row?.node?.createdAt,
        cell: (props) => <span>{props?.row?.original?.node?.createdAt.split('T')[0]} </span>,
      },
      {
        header: 'Account ID',
        accessorFn: (row) => row?.node?.id,
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
        id: '_actions',
        header: '',
        cell: (props) =>
          props?.row?.original?.node && objState !== 'DORMANT' && objState !== 'SUBMITTED' ? (
            <TablePopover
              items={[
                {
                  title: 'View Details',
                  aclKey: 'CBS_SAVINGS_SAVING_ACCOUNT',
                  action: 'VIEW',
                  onClick: (row) =>
                    router.push(`${ROUTES.CBS_ACCOUNT_SAVING_DETAILS}?id=${row['id']}`),
                },
                {
                  title: 'depositProductEdit',
                  aclKey: 'CBS_SAVINGS_SAVING_ACCOUNT',
                  action: 'UPDATE',
                  onClick: (row) => router.push(`${ROUTES.CBS_ACCOUNT_OPEN_EDIT}?id=${row['id']}`),
                },
              ]}
              node={props?.row?.original?.node}
            />
          ) : (
            <TablePopover
              items={[
                {
                  title: 'View Details',
                  aclKey: 'CBS_SAVINGS_SAVING_ACCOUNT',
                  action: 'VIEW',
                  onClick: (row) =>
                    router.push(`${ROUTES.CBS_ACCOUNT_SAVING_DETAILS}?id=${row['id']}`),
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
    [t, objState]
  );

  return (
    <>
      <Box position="sticky" top="0px" zIndex={3}>
        <PageHeader
          heading={`Saving Accounts - ${featureCode?.accountList}`}
          tabItems={ACCOUNT_TAB_ITEMS}
        />
      </Box>

      <Table
        isLoading={isFetching}
        data={rowData}
        columns={columns}
        rowOnClick={(row) => {
          router.push(`${ROUTES.CBS_ACCOUNT_SAVING_DETAILS}?id=${row?.node?.id}`);
        }}
        pagination={{
          total: data?.account?.list?.totalCount ?? 'Many',
          pageInfo: data?.account?.list?.pageInfo,
        }}
      />
    </>
  );
};
