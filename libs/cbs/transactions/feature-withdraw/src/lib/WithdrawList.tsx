import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Avatar, Box, TablePopover, Text } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { Filter_Mode, useGetWithdrawListDataQuery } from '@coop/cbs/data-access';
import { TransactionPageHeader } from '@coop/cbs/transactions/ui-components';
import { localizedDate, ROUTES } from '@coop/cbs/utils';
import { amountConverter, featureCode, getRouterQuery, useTranslation } from '@coop/shared/utils';

// const tabList = [
//   {
//     title: 'memberNavActive',
//     key: 'APPROVED',
//   },
//   {
//     title: 'memberNavInactive',
//     key: 'VALIDATED',
//   },
//   {
//     title: 'memberNavDraft',
//     key: 'DRAFT',
//   },
// ];

/* eslint-disable-next-line */
export interface WithdrawListProps {}

export const WithdrawList = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const searchTerm = router?.query['search'] as string;

  const { data, isFetching } = useGetWithdrawListDataQuery(
    {
      pagination: getRouterQuery({ type: ['PAGINATION'] }),
      filter: {
        id: searchTerm,
        memberId: searchTerm,
        memberName: searchTerm,
        transactionId: searchTerm,
        filterMode: Filter_Mode.Or,
      },
    },
    {
      enabled: searchTerm !== 'undefined',
    }
  );

  const rowData = useMemo(() => data?.transaction?.listWithdraw?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: t['withdrawListWithdrawnDate'],
        accessorFn: (row) => localizedDate(row?.node?.date),
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
          width: '60%',
        },
      },
      {
        header: t['withdrawListPaymentMode'],
        accessorFn: (row) => row?.node?.paymentMode,
      },
      {
        header: t['withdrawListWithdrawBy'],
        accessorFn: (row) => row?.node?.name?.local,
      },
      {
        header: t['withdrawListAmount'],
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
          width: '50px',
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
