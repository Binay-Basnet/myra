import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Column, Table } from '@myra-ui/table';

import { AccountingPageHeader } from '@coop/accounting/ui-components';
import { useGetAccountingPurchaseEntryListQuery } from '@coop/cbs/data-access';
import { localizedDate, ROUTES } from '@coop/cbs/utils';
import { amountConverter, getPaginationQuery, useTranslation } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface AccountingFeaturePurchaseListProps {}

export const AccountingFeaturePurchaseList = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const { data, isFetching } = useGetAccountingPurchaseEntryListQuery({
    pagination: getPaginationQuery(),
  });

  const rowData = useMemo(() => data?.accounting?.purchase?.list?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Date',
        accessorFn: (row) => localizedDate(row?.node?.date),
      },
      {
        header: 'Entry No',
        accessorFn: (row) => row?.node?.entryNo,
      },

      {
        header: 'Supplier Name',
        accessorFn: (row) => row?.node?.supplierName,
        meta: {
          width: '30%',
        },
      },
      {
        header: t['accountingPurchaseListTotalAmount'],
        accessorFn: (row) => amountConverter(row?.node?.totalAmount || 0),
        meta: {
          width: '30%',
        },
      },
    ],
    [t]
  );

  return (
    <>
      <AccountingPageHeader heading={t['accountingPurchaseListPurchase']} />

      <Table
        data={rowData}
        getRowId={(row) => String(row?.node?.id)}
        rowOnClick={(row) => {
          router.push(`${ROUTES.ACCOUNTING_PURCHASE_LIST_DETAILS}?id=${row?.node?.id}`);
        }}
        isLoading={isFetching}
        columns={columns}
        pagination={{
          total: data?.accounting?.purchase?.list?.totalCount ?? 'Many',
          pageInfo: data?.accounting?.purchase?.list?.pageInfo,
        }}
      />
    </>
  );
};

export default AccountingFeaturePurchaseList;
