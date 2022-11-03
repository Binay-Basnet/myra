import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { useGetWithdrawListDataQuery } from '@coop/cbs/data-access';
import { TransactionPageHeader } from '@coop/cbs/transactions/ui-components';
import { ActionPopoverComponent } from '@coop/myra/components';
import { Column, Table } from '@coop/shared/table';
import { Avatar, Box, Text } from '@coop/shared/ui';
import { featureCode, getRouterQuery, useTranslation } from '@coop/shared/utils';

const tabList = [
  {
    title: 'memberNavActive',
    key: 'APPROVED',
  },
  {
    title: 'memberNavInactive',
    key: 'VALIDATED',
  },
  {
    title: 'memberNavDraft',
    key: 'DRAFT',
  },
];

/* eslint-disable-next-line */
export interface WithdrawListProps {}

export const WithdrawList = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const popoverTitle = [
    {
      title: 'transDetailViewDetail',
      onClick: (id: string) => {
        router.push(`/transactions/withdraw/view?id=${id}`);
      },
    },
  ];

  const { data, isFetching } = useGetWithdrawListDataQuery(
    {
      pagination: getRouterQuery({ type: ['PAGINATION'] }),
    },
    {
      staleTime: 0,
    }
  );

  const rowData = useMemo(() => data?.transaction?.listWithdraw?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: t['withdrawListTransactionId'],
        accessorFn: (row) => row?.node?.ID,
      },
      {
        accessorFn: (row) => row?.node?.name?.local,
        header: t['withdrawListTransactionName'],
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
        header: t['withdrawListAmount'],
        accessorFn: (row) => row?.node?.amount,
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
        header: t['withdrawListWithdrawnDate'],
        accessorFn: (row) => row?.node?.date?.split(' ')[0] ?? 'N/A',
      },
      {
        id: '_actions',
        header: '',
        cell: (props) => (
          <ActionPopoverComponent items={popoverTitle} id={props?.row?.original?.node?.ID ?? ''} />
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
        heading={`${t['withdrawListWithdraw']} - ${featureCode?.withdrawList}`}
        tabItems={tabList}
      />

      <Table
        data={rowData}
        getRowId={(row) => String(row?.node?.ID)}
        isLoading={isFetching}
        columns={columns}
        pagination={{
          total: data?.transaction?.listWithdraw?.totalCount ?? 'Many',
          pageInfo: data?.transaction?.listWithdraw?.pageInfo,
        }}
        searchPlaceholder={t['withdrawListSearchPlaceholder']}
      />
    </>
  );
};

export default WithdrawList;
