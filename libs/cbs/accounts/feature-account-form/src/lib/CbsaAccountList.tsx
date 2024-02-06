import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';
import qs from 'qs';

import { Avatar, Box, PageHeader, TablePopover, Text, toast, Tooltip } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import {
  ObjState,
  useAppSelector,
  useGetAccountTableListMinimalExportQuery,
  useGetAccountTableListMinimalQuery,
  useGetMemberFilterMappingQuery,
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
  const [triggerExport, setTriggerExport] = useState(false);
  const [isExportPDF, setIsExportPDF] = useState(false);
  const [isExportExcel, setIsExportExcel] = useState(false);

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

  const filterParams = {
    filter: getFilterQuery({ objState: { value: 'ACTIVE', compare: '=' } }),
  };

  const sortParams = router.query['sort'] as string;

  const { data, isFetching } = useGetAccountTableListMinimalQuery({
    ...filterParams,
    paginate: sortParams
      ? getPaginationQuery()
      : { ...getPaginationQuery(), order: { column: 'accountOpenedDate', arrange: 'DESC' } },
  });

  const { data: memberFilterMapping } = useGetMemberFilterMappingQuery();

  const rowData = useMemo(() => data?.account?.list?.data?.edges ?? [], [data]);
  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        id: 'accountOpenedDate',
        header: 'Account Open Date',
        accessorFn: (row) => row?.node?.accountOpenedDate?.local,
        cell: (row) => <Text>{localizedDate(row?.row?.original?.node?.accountOpenedDate)}</Text>,
        filterFn: 'dateTime',
        enableColumnFilter: true,
        enableSorting: true,
      },
      {
        id: 'memberCode',
        header: 'Member Code',
        accessorFn: (row) => row?.node?.member?.code,
        enableSorting: true,
        meta: {
          orderId: 'member__code',
        },
      },
      {
        id: 'id',
        header: 'Account ID',
        accessorFn: (row) => row?.node?.id,
        enableSorting: true,
      },
      {
        id: 'accountName',
        header: 'Account Name',
        accessorFn: (row) => row?.node?.accountName,
        cell: (props) => <Tooltip title={props?.row?.original?.node?.accountName as string} />,
        enableSorting: true,
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
          orderId: 'product__productName',
        },
        enableSorting: true,
      },
      {
        id: 'memberName',
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
            <Text fontWeight="400" fontSize="s3">
              {props.row?.original?.node?.member?.name?.local}
            </Text>
          </Box>
        ),
      },
      {
        id: 'serviceCenter',
        header: 'Service Center',
        accessorFn: (row) => row?.node?.serviceCenter,
        enableColumnFilter: true,
        meta: {
          filterMaps: {
            list: memberFilterMapping?.members?.filterMapping?.serviceCenter,
          },
        },
      },
      {
        header: 'MF Group',
        accessorFn: (row) => row?.node?.groupName,
      },
      {
        id: '_actions',
        header: '',
        cell: (props) =>
          props?.row?.original?.node && objState !== 'DORMANT' && objState !== 'ACTIVE' ? (
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
    [
      savingFilterMapping?.account.filterMapping?.productID,
      objState,
      router,
      makeActiveHandler,
      memberFilterMapping,
    ]
  );

  useGetAccountTableListMinimalExportQuery(
    { ...filterParams, paginate: { after: '', first: -1 }, isExportExcel, isExportPDF },
    {
      enabled: triggerExport,
      staleTime: 0,
      onSettled: () => setTriggerExport(false),
      onSuccess: (res) => {
        setTriggerExport(false);
        toast({
          id: 'export',
          type: 'success',
          message: res?.account?.list?.success?.message as string,
        });
      },
    }
  );

  const user = useAppSelector((state) => state.auth?.user);

  useEffect(() => {
    const queryString = qs.stringify(
      {
        serviceCenter: {
          value: user?.currentBranch?.id,
          compare: '=',
        },
      },
      { allowDots: true, arrayFormat: 'brackets', encode: false }
    );

    router.push(
      {
        query: {
          ...router.query,
          filter: queryString,
        },
      },
      undefined,
      { shallow: true }
    );
  }, []);

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
          total: data?.account?.list?.data?.totalCount ?? 'Many',
          pageInfo: data?.account?.list?.data?.pageInfo,
        }}
        menu="SAVINGS"
        canExport
        handleExportPDF={() => {
          setTriggerExport(true);
          setIsExportPDF(true);
          setIsExportExcel(false);
        }}
        handleExportCSV={() => {
          setTriggerExport(true);
          setIsExportPDF(false);
          setIsExportExcel(true);
        }}
      />
    </>
  );
};
