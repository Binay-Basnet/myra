import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Column, Table } from '@myra-ui/table';

import { AccountingPageHeader } from '@coop/accounting/ui-components';
import { useGetSalesCreditNoteListDataQuery } from '@coop/cbs/data-access';
import { localizedDate } from '@coop/cbs/utils';
import { amountConverter, getPaginationQuery, useTranslation } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface AccountingListCreditNoteProps {}

export const AccountingListCreditNote = () => {
  const { t } = useTranslation();

  const router = useRouter();

  const { data, isFetching } = useGetSalesCreditNoteListDataQuery({
    pagination: getPaginationQuery(),
  });

  const rowData = useMemo(() => data?.accounting?.sales?.listCreditNote?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        accessorFn: (row) => row?.node?.customerName,
        header: t['accountingCreditNoteListCustomer'],

        meta: {
          width: '60%',
        },
      },
      {
        header: t['accountingCreditNoteListTotalAmount'],
        accessorFn: (row) => amountConverter(row?.node?.amount ?? 0),
        meta: {
          width: '30%',
        },
      },
      {
        header: 'Date',
        accessorFn: (row) => localizedDate(row?.node?.date),
      },
      // {
      //   id: '_actions',
      //   header: '',
      //   accessorKey: 'actions',
      //   cell: (props) =>
      //     props?.row?.original?.node && (
      //       <TablePopover
      //         items={[
      //           {
      //             title: 'Edit',
      //             onClick: (row) => {
      //               router.push(`/accounting/sales/credit-note/edit/${row['id']}`);
      //             },
      //           },
      //         ]}
      //         node={props?.row?.original?.node}
      //       />
      //     ),
      //   meta: {
      //     width: '60px',
      //   },
      // },
    ],
    [t]
  );

  return (
    <>
      <AccountingPageHeader heading={t['accountingCreditNoteListCreditNote']} />

      <Table
        data={rowData}
        getRowId={(row) => String(row?.node?.id)}
        isLoading={isFetching}
        columns={columns}
        pagination={{
          total: data?.accounting?.sales?.listCreditNote?.totalCount ?? 'Many',
          pageInfo: data?.accounting?.sales?.listCreditNote?.pageInfo,
        }}
        noDataTitle="credit note list"
      />
    </>
  );
};

export default AccountingListCreditNote;
