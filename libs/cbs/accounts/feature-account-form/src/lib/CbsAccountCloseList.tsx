import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Avatar, Box, PageHeader, Text } from '@myra-ui';
import { Column, Table, TablePopover } from '@myra-ui/table';

import {
  useGetAccountTableListMinimalQuery,
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

  const { data, isLoading } = useGetAccountTableListMinimalQuery({
    paginate: getPaginationQuery(),
    filter: getFilterQuery({ objState: { value: 'INACTIVE', compare: '=' } }),
  });

  const { data: savingFilterMapping } = useGetSavingFilterMappingQuery();

  const rowData = useMemo(() => data?.account?.list?.edges ?? [], [data]);
  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        id: 'closedAt',
        header: 'Account Closed Date',
        accessorFn: (row) => row?.node?.createdAt,
        cell: (props) => <span>{props?.row?.original?.node?.closedAt} </span>,
        enableColumnFilter: true,
        filterFn: 'dateTime',
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
    [router, savingFilterMapping?.account.filterMapping?.productID]
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
