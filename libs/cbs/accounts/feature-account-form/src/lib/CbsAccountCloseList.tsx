import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import qs from 'qs';

import { Avatar, Box, PageHeader, Text } from '@myra-ui';
import { Column, Table, TablePopover } from '@myra-ui/table';

import {
  useAppSelector,
  useGetAccountTableListMinimalQuery,
  useGetMemberFilterMappingQuery,
  useGetSavingFilterMappingQuery,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import {
  featureCode,
  getFilterQuery,
  getPaginationQuery,
  useTranslation,
} from '@coop/shared/utils';

export const CBSAccountCloseList = () => {
  const router = useRouter();

  const { t } = useTranslation();

  const [triggerQuery, setTriggerQuery] = useState(false);

  const { data, isFetching } = useGetAccountTableListMinimalQuery(
    {
      paginate: getPaginationQuery(),
      filter: getFilterQuery({ objState: { value: 'INACTIVE', compare: '=' } }),
    },
    { enabled: triggerQuery }
  );

  const { data: savingFilterMapping } = useGetSavingFilterMappingQuery();
  const { data: memberFilterMapping } = useGetMemberFilterMappingQuery();

  const rowData = useMemo(() => data?.account?.list?.data?.edges ?? [], [data]);
  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        id: 'closedAt',
        header: 'Account Closed Date',
        accessorFn: (row) => row?.node?.createdAt,
        cell: (props) => <span>{props?.row?.original?.node?.closedAt} </span>,
        enableColumnFilter: true,
        filterFn: 'dateTime',
        enableSorting: true,
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
        header: 'Account Id',
        accessorFn: (row) => row?.node?.id,
      },
      {
        id: 'productName',
        header: 'Product Name',
        accessorFn: (row) => row?.node?.product?.productName,
        meta: {
          width: '50%',
          filterMaps: {
            list: savingFilterMapping?.account.filterMapping?.productID,
          },
        },
        enableColumnFilter: true,
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
    [router, savingFilterMapping?.account.filterMapping?.productID, memberFilterMapping]
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

    router
      .push(
        {
          query: {
            ...router.query,
            filter: queryString,
          },
        },
        undefined,
        { shallow: true }
      )
      .then(() => setTriggerQuery(true));
  }, []);

  return (
    <>
      <PageHeader heading={`${t['accountClose']} - ${featureCode?.savingCloseAccountList}`} />

      <Table
        isLoading={triggerQuery ? isFetching : true}
        data={rowData}
        columns={columns}
        rowOnClick={(row) => {
          router.push(`${ROUTES.CBS_ACCOUNT_CLOSED_DETAILS}?id=${row?.node?.id}`);
        }}
        pagination={{
          total: data?.account?.list?.data?.totalCount ?? 'Many',
          pageInfo: data?.account?.list?.data?.pageInfo,
        }}
        menu="SAVINGS"
      />
    </>
  );
};

export default CBSAccountCloseList;
