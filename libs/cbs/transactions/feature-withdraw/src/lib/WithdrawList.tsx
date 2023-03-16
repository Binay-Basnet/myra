import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Avatar, Box, TablePopover, Text } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import {
  useGetWithdrawFilterMappingQuery,
  useGetWithdrawListDataQuery,
} from '@coop/cbs/data-access';
import { TransactionPageHeader } from '@coop/cbs/transactions/ui-components';
import { localizedDate, ROUTES } from '@coop/cbs/utils';
import {
  amountConverter,
  featureCode,
  getFilterQuery,
  getPaginationQuery,
  useTranslation,
} from '@coop/shared/utils';

export const WithdrawList = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const { data: withdrawFilterMapping } = useGetWithdrawFilterMappingQuery();
  const { data, isFetching } = useGetWithdrawListDataQuery({
    pagination: getPaginationQuery(),
    filter: getFilterQuery(),
  });

  const rowData = useMemo(() => data?.transaction?.listWithdraw?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        id: 'date',
        header: t['withdrawListWithdrawnDate'],
        accessorKey: 'node.date.local',
        cell: (row) => <Text>{localizedDate(row?.row?.original?.node?.date)}</Text>,
        enableColumnFilter: true,
        filterFn: 'dateTime',
      },
      {
        header: t['withdrawListTransactionId'],
        accessorFn: (row) => row?.node?.transactionCode,
      },
      {
        accessorFn: (row) => row?.node?.name?.local,
        header: 'Member',
        cell: (props) => (
          <Box display="flex" alignItems="center" gap="s12">
            <Avatar
              name={props.getValue() as string}
              size="sm"
              src={props?.row?.original?.node?.profilePicUrl ?? ''}
            />
            <Text
              fontSize="s3"
              textTransform="capitalize"
              textOverflow="ellipsis"
              overflow="hidden"
            >
              {props.getValue() as string}
            </Text>
          </Box>
        ),

        meta: {
          width: '50%',
        },
      },
      {
        id: 'paymentMode',
        header: t['withdrawListPaymentMode'],
        accessorFn: (row) => row?.node?.paymentMode,
        enableColumnFilter: true,
        meta: {
          width: '25%',
          filterMaps: {
            comparator: 'CONTAINS',
            list: withdrawFilterMapping?.transaction?.filterMapping?.withdraw?.paymentMode?.map(
              (p) => ({
                label: p.label as string,
                value: p.value as string,
              })
            ),
          },
        },
      },
      {
        header: t['withdrawListWithdrawBy'],
        accessorFn: (row) => row?.node?.name?.local,
        meta: {
          width: '25%',
        },
      },
      {
        id: 'amount',
        header: t['withdrawListAmount'],
        filterFn: 'amount',

        meta: {
          isNumeric: true,
        },
        enableColumnFilter: true,

        accessorFn: (row) => (row?.node?.amount ? amountConverter(row?.node?.amount) : '-'),
      },

      {
        id: '_actions',
        header: '',
        cell: (props) =>
          props?.row?.original?.node && (
            <TablePopover
              node={props?.row?.original?.node}
              items={[
                {
                  title: t['transDetailViewDetail'],
                  aclKey: 'CBS_TRANSACTIONS_WITHDRAW',
                  action: 'VIEW',
                  onClick: (row) => {
                    router.push(`${ROUTES.CBS_TRANS_WITHDRAW_DETAILS}?id=${row?.transactionCode}`);
                  },
                },
              ]}
            />
          ),
        meta: {
          width: '3.125rem',
        },
      },
    ],
    [t, rowData]
  );

  return (
    <>
      <TransactionPageHeader
        heading={`${t['withdrawListWithdraw']} - ${featureCode?.withdrawList}`}
        // tabItems={tabList}
      />

      <Table
        data={rowData}
        getRowId={(row) => String(row?.node?.ID)}
        isLoading={isFetching}
        columns={columns}
        rowOnClick={(row) =>
          router.push(`${ROUTES.CBS_TRANS_WITHDRAW_DETAILS}?id=${row?.node?.transactionCode}`)
        }
        pagination={{
          total: data?.transaction?.listWithdraw?.totalCount ?? 'Many',
          pageInfo: data?.transaction?.listWithdraw?.pageInfo,
        }}
        searchPlaceholder={t['withdrawListSearchPlaceholder']}
        menu="TRANSACTIONS"
      />
    </>
  );
};

export default WithdrawList;
