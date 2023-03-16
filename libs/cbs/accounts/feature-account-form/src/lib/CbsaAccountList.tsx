import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';

import { Avatar, Box, PageHeader, TablePopover, Text, toast, Tooltip } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import {
  ObjState,
  useGetAccountTableListMinimalQuery,
  useGetSavingFilterMappingQuery,
  useSetMakeDormantAccountActiveMutation,
} from '@coop/cbs/data-access';
import { localizedDate, ROUTES } from '@coop/cbs/utils';
import { featureCode, getFilter, getFilterQuery, getPaginationQuery } from '@coop/shared/utils';

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
  const queryClient = useQueryClient();

  const objState = getFilter('objState') || 'ACTIVE';
  const { mutateAsync: makeActiveMutation } = useSetMakeDormantAccountActiveMutation();

  const makeActiveHandler = useCallback(
    (id: string) => {
      makeActiveMutation({ accountId: id }).then(() => {
        toast({
          id: 'Making Account Active',
          type: 'success',
          message: 'Account Activated Successfully',
        });
        queryClient.invalidateQueries(['getAccountTableListMinimal']);
        router.push(ROUTES.CBS_ACCOUNT_LIST);
      });
    },
    [makeActiveMutation, queryClient, router]
  );

  const { data: savingFilterMapping } = useGetSavingFilterMappingQuery();
  const { data, isFetching } = useGetAccountTableListMinimalQuery({
    paginate: getPaginationQuery(),
    filter: getFilterQuery({ objState: { value: 'ACTIVE', compare: '=' } }),
  });

  const rowData = useMemo(() => data?.account?.list?.edges ?? [], [data]);
  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        id: 'accountOpenedDate',
        header: 'Account Open Date',
        accessorFn: (row) => row?.node?.accountOpenedDate?.local,
        cell: (row) => <Text>{localizedDate(row?.row?.original?.node?.accountOpenedDate)}</Text>,
        filterFn: 'dateTime',
        enableColumnFilter: true,
      },
      {
        header: 'Member Code',
        accessorFn: (row) => row?.node?.member?.code,
      },
      {
        header: 'Account ID',
        accessorFn: (row) => row?.node?.id,
      },

      {
        header: 'Account Name',
        cell: (props) => <Tooltip title={props?.row?.original?.node?.accountName as string} />,
      },
      {
        id: 'productName',
        header: 'Product Name',
        accessorFn: (row) => row?.node?.product?.productName,
        enableColumnFilter: true,
        meta: {
          filterMaps: {
            list: savingFilterMapping?.account.filterMapping?.productID,
          },
        },
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
          ) : objState === 'DORMANT' ? (
            <TablePopover
              items={[
                {
                  title: 'Make Active',
                  aclKey: 'CBS_TRANSACTIONS_DEPOSIT',
                  action: 'CREATE',

                  onClick: (row) => makeActiveHandler(row?.id),
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
          width: '3.125rem',
        },
      },
    ],
    [savingFilterMapping?.account.filterMapping?.productID, objState, router, makeActiveHandler]
  );

  return (
    <>
      <Box position="sticky" top="0px" zIndex={3}>
        <PageHeader
          heading={`Saving Accounts - ${featureCode?.savingAccountList}`}
          tabItems={ACCOUNT_TAB_ITEMS}
          showTabsInFilter
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
        menu="SAVINGS"
      />
    </>
  );
};
