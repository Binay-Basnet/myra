import { useMemo } from 'react';

import { Column, Table } from '@myra-ui/table';

import { AccountingPageHeader } from '@coop/accounting/ui-components';
import { useGetAccountingDebitNoteListQuery } from '@coop/cbs/data-access';
import { localizedDate } from '@coop/cbs/utils';
import { amountConverter, getPaginationQuery, useTranslation } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface AccountingFeaturePurchaseDebitNoteProps {}

export const AccountingFeaturePurchaseDebitNote = () => {
  const { t } = useTranslation();

  const { data, isFetching } = useGetAccountingDebitNoteListQuery({
    pagination: getPaginationQuery(),
  });

  const rowData = useMemo(() => data?.accounting?.purchase?.listDebitNote?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Date',
        accessorFn: (row) => row?.node?.date,
        cell: (props) => localizedDate(props.cell?.row?.original?.node?.date),
      },
      {
        header: 'Note No',
        accessorFn: (row) => row?.node?.noteNo,
      },
      {
        header: 'Supplier',
        accessorFn: (row) => row?.node?.supplierName,
      },
      {
        header: 'Amount',
        accessorFn: (row) => row?.node?.totalAmount,
        cell: (props) => amountConverter(props.getValue() as string),
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Reference',
        accessorFn: (row) => row?.node?.referenceNo,
      },
    ],
    [t]
  );

  return (
    <>
      <AccountingPageHeader heading={t['accountingDebitNoteListDebitNote']} />

      <Table
        data={rowData}
        isLoading={isFetching}
        columns={columns}
        pagination={{
          total: data?.accounting?.purchase.listDebitNote?.totalCount ?? 'Many',
          pageInfo: data?.accounting?.purchase?.listDebitNote?.pageInfo,
        }}
      />
    </>
  );
};

export default AccountingFeaturePurchaseDebitNote;
