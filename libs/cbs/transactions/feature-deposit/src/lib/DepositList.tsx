import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Avatar, Box, TablePopover, Text } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { DepositedBy, useGetDepositListDataQuery } from '@coop/cbs/data-access';
import { TransactionPageHeader } from '@coop/cbs/transactions/ui-components';
import { localizedDate, ROUTES } from '@coop/cbs/utils';
import { amountConverter, featureCode, getRouterQuery, useTranslation } from '@coop/shared/utils';

// const tabList = [
//   {
//     title: 'memberNavActive',
//     key: 'ACTIVE',
//   },
//   {
//     title: 'memberNavInactive',
//     key: 'SUBMITTED',
//   },
// ];

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

  const { data, isFetching } = useGetDepositListDataQuery({
    pagination: getRouterQuery({ type: ['PAGINATION'] }),
  });

  const rowData = useMemo(() => data?.transaction?.listDeposit?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: t['depositListDepositDate'],
        accessorFn: (row) => localizedDate(row?.node?.date),
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
          width: '60%',
        },
      },
      {
        header: t['depositListPaymentMode'],
        accessorFn: (row) => row?.node?.paymentMode,
      },
      {
        header: t['depositListDepositedBy'],
        accessorFn: (row) =>
          row?.node?.processedBy ? depositedBy[row?.node?.processedBy as DepositedBy] : '',
      },
      {
        header: t['depositListAmount'],

        accessorFn: (row) => amountConverter(row?.node?.amount as string),
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
                    router.push(`${ROUTES.CBS_TRANS_DEPOSIT_DETAILS}?id=${row?.ID}`);
                  },
                },
              ]}
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
      <TransactionPageHeader
        heading={`${t['depositListDeposit']} - ${featureCode?.depositList}`}
        // tabItems={tabList}
      />

      <Table
        data={rowData}
        getRowId={(row) => String(row?.node?.ID)}
        isLoading={isFetching}
        columns={columns}
        rowOnClick={(row) => router.push(`${ROUTES.CBS_TRANS_DEPOSIT_DETAILS}?id=${row?.node?.ID}`)}
        pagination={{
          total: data?.transaction?.listDeposit?.totalCount ?? 'Many',
          pageInfo: data?.transaction?.listDeposit?.pageInfo,
        }}
        searchPlaceholder={t['depositListSearchDeposit']}
      />
    </>
  );
};

export default DepositList;
