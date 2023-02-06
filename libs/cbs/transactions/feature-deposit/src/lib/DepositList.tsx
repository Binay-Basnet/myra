import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Avatar, Box, TablePopover, Text } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { DepositedBy, Filter_Mode, useGetDepositListDataQuery } from '@coop/cbs/data-access';
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
  const searchTerm = router?.query['search'] as string;

  const { data, isFetching } = useGetDepositListDataQuery(
    {
      pagination: getRouterQuery({ type: ['PAGINATION'] }),
      filter: {
        id: searchTerm,
        memberId: searchTerm,
        memberName: searchTerm,
        transactionId: searchTerm,
        depositedBy: searchTerm,
        filterMode: Filter_Mode.Or,
      },
    },

    {
      enabled: searchTerm !== 'undefined',
    }
  );

  const rowData = useMemo(() => data?.transaction?.listDeposit?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: t['depositListDepositDate'],
        cell: (row) => <Text>{localizedDate(row?.row?.original?.node?.date)}</Text>,
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
        header: t['depositListPaymentMode'],
        accessorFn: (row) => row?.node?.paymentMode,
        meta: {
          width: '25%',
        },
      },
      {
        header: t['depositListDepositedBy'],
        accessorFn: (row) =>
          row?.node?.processedBy ? depositedBy[row?.node?.processedBy as DepositedBy] : '',
        meta: {
          width: '25%',
        },
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
                    router.push(`${ROUTES.CBS_TRANS_DEPOSIT_DETAILS}?id=${row?.transactionCode}`);
                  },
                },
              ]}
            />
          ),
      },
    ],
    [t, rowData]
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
