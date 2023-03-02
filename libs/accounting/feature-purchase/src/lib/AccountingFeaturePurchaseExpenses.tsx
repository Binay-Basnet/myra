import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Avatar, Box, Text } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { AccountingPageHeader } from '@coop/accounting/ui-components';
import { ObjState, useGetMemberListQuery } from '@coop/cbs/data-access';
import { localizedDate } from '@coop/cbs/utils';
import { PopoverComponent } from '@coop/myra/components';
import { getPaginationQuery, useTranslation } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface AccountingFeaturePurchaseExpensesProps {}

export const AccountingFeaturePurchaseExpenses = () => {
  const { t } = useTranslation();

  const router = useRouter();

  const { data, isFetching } = useGetMemberListQuery({
    pagination: getPaginationQuery(),
  });

  const rowData = useMemo(() => data?.members?.list?.edges ?? [], [data]);

  const popoverTitle = [
    {
      title: 'memberListTableViewMemberProfile',
    },
    {
      title: 'memberListTableEditMember',
    },
    {
      title: 'memberListTableMakeInactive',
    },
  ];

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: t['accountingExpensesListBillNo'],
        accessorFn: (row) => row?.node?.id,
      },
      {
        accessorFn: (row) => row?.node?.name?.local,
        header: t['accountingExpensesListSupplierName'],
        cell: (props) => (
          <Box display="flex" alignItems="center" gap="s12">
            <Avatar name="Dan Abrahmov" size="sm" src="https://bit.ly/dan-abramov" />
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
        header: t['accountingExpensesListTotalAmount'],
        accessorFn: (row) => row?.node?.contact,
        meta: {
          width: '30%',
        },
      },
      {
        header: t['accountingExpensesListInvoiceDate'],
        accessorFn: (row) => localizedDate(row?.node?.dateJoined),
      },
      {
        id: '_actions',
        header: '',
        accessorKey: 'actions',
        cell: (cell) => (
          <PopoverComponent items={popoverTitle} member={cell?.row?.original?.node} />
        ),
        meta: {
          width: '60px',
        },
      },
    ],
    [t]
  );

  return (
    <>
      <AccountingPageHeader
        heading={t['accountingExpensesListExpenses']}
        buttonLabel={t['accountingExpensesListExpensesNew']}
        buttonHandler={() => router.push('/accounting/purchase/expenses/add')}
      />

      <Table
        data={rowData}
        getRowId={(row) => String(row?.node?.id)}
        isLoading={isFetching}
        columns={columns}
        pagination={{
          total: data?.members?.list?.totalCount ?? 'Many',
          pageInfo: data?.members.list.pageInfo,
        }}
      />
    </>
  );
};

export default AccountingFeaturePurchaseExpenses;
