import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Avatar, Box, TablePopover, Text } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import {
  DepositedBy,
  useGetDepositFilterMappingQuery,
  useGetDepositListDataQuery,
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

const depositedBy: Record<DepositedBy, string> = {
  [DepositedBy.Agent]: 'Market Representative',
  [DepositedBy.Self]: 'Self',
  [DepositedBy.Other]: 'Other',
};

/* eslint-disable-next-line */
export interface DepositListProps {}

export const DepositList = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const { data: depositFilterMapping } = useGetDepositFilterMappingQuery();
  const { data, isFetching } = useGetDepositListDataQuery({
    pagination: getPaginationQuery(),
    filter: getFilterQuery(),
  });

  const rowData = useMemo(() => data?.transaction?.listDeposit?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        id: 'date',
        header: t['depositListDepositDate'],
        accessorKey: 'node.date.en',
        cell: (row) => <Text>{localizedDate(row?.row?.original?.node?.date)}</Text>,
        enableColumnFilter: true,
        filterFn: 'dateTime',
      },
      {
        header: t['depositListTransactionId'],
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

        header: t['depositListPaymentMode'],
        enableColumnFilter: true,

        accessorFn: (row) => row?.node?.paymentMode,
        meta: {
          width: '25%',
          filterMaps: {
            comparator: 'CONTAINS',
            list: depositFilterMapping?.transaction?.filterMapping?.deposit?.paymentMode,
          },
        },
      },
      {
        id: 'depositedBy',
        header: t['depositListDepositedBy'],
        enableColumnFilter: true,

        accessorFn: (row) =>
          row?.node?.processedBy ? depositedBy[row?.node?.processedBy as DepositedBy] : '',
        meta: {
          width: '25%',
          filterMaps: {
            list: depositFilterMapping?.transaction?.filterMapping?.deposit?.depositedBy?.map(
              (d) => ({
                label: d.label,
                value: d.value,
              })
            ),
          },
        },
      },
      {
        header: t['depositListAmount'],

        accessorFn: (row) => amountConverter(row?.node?.amount as string),
        enableColumnFilter: true,
        filterFn: 'amount',
        meta: {
          isNumeric: true,
        },
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
                  aclKey: 'CBS_TRANSACTIONS_DEPOSIT',
                  action: 'VIEW',
                  onClick: (row) => {
                    router.push(`${ROUTES.CBS_TRANS_DEPOSIT_DETAILS}?id=${row?.transactionCode}`);
                  },
                },
              ]}
            />
          ),
      },
    ],
    [
      t,
      depositFilterMapping?.transaction?.filterMapping?.deposit?.paymentMode,
      depositFilterMapping?.transaction?.filterMapping?.deposit?.depositedBy,
      router,
    ]
  );

  return (
    <>
      <TransactionPageHeader
        heading={`${t['depositListDeposit']} - ${featureCode?.depositList}`}
        // tabItems={tabList}
      />

      <Table
        data={rowData}
        getRowId={(row) => String(row?.node?.ID)}
        isLoading={isFetching}
        columns={columns}
        rowOnClick={(row) =>
          router.push(`${ROUTES.CBS_TRANS_DEPOSIT_DETAILS}?id=${row?.node?.transactionCode}`)
        }
        pagination={{
          total: data?.transaction?.listDeposit?.totalCount ?? 'Many',
          pageInfo: data?.transaction?.listDeposit?.pageInfo,
        }}
        searchPlaceholder={t['depositListSearchDeposit']}
        menu="TRANSACTIONS"
      />
    </>
  );
};

export default DepositList;
