import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Column, Table } from '@myra-ui/table';

import { AccountingPageHeader } from '@coop/accounting/ui-components';
import { useGetAccountingPurchaseSalesListQuery } from '@coop/cbs/data-access';
import { localizedDate, ROUTES } from '@coop/cbs/utils';
import { PopoverComponent } from '@coop/myra/components';
import { amountConverter, getPaginationQuery, useTranslation } from '@coop/shared/utils';

export const AccountingFeaturePurchaseExpenses = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const { data, isFetching } = useGetAccountingPurchaseSalesListQuery({
    pagination: getPaginationQuery(),
  });

  const rowData = useMemo(() => data?.accounting?.purchase?.listExpense?.edges ?? [], [data]);

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
        header: 'Date',
        accessorFn: (row) => localizedDate(row?.node?.date),
      },
      {
        accessorFn: (row) => row?.node?.entryNo,
        header: 'Entry No',

        meta: {
          width: '60%',
        },
      },
      {
        header: 'Supplier Name',
        accessorFn: (row) => row?.node?.supplierName,
        meta: {
          width: '30%',
        },
      },
      {
        header: 'Reference',
        accessorFn: (row) => row?.node?.reference,
      },
      {
        header: 'Amount',
        accessorFn: (row) => row?.node?.totalAmount,
        cell: (props) => amountConverter(props.getValue() as string),
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
      <AccountingPageHeader heading={t['accountingExpensesListExpenses']} />

      <Table
        data={rowData}
        getRowId={(row) => String(row?.node?.id)}
        isLoading={isFetching}
        rowOnClick={(row) => {
          router.push(`${ROUTES.ACCOUNTING_PURCHASE_EXPENSE_DETAILS}?id=${row?.node?.id}`);
        }}
        columns={columns}
        pagination={{
          total: data?.accounting?.purchase?.listExpense?.totalCount ?? 'Many',
          pageInfo: data?.accounting?.purchase?.listExpense?.pageInfo,
        }}
      />
    </>
  );
};

export default AccountingFeaturePurchaseExpenses;
