import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { AccountingPageHeader } from '@coop/accounting/ui-components';
import {
  DateType,
  useAppSelector,
  useGetSalesCreditNoteListDataQuery,
} from '@coop/cbs/data-access';
import { Column, Table } from '@myra-ui/table';
import { TablePopover } from '@myra-ui';
import { getRouterQuery, useTranslation } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface AccountingListCreditNoteProps {}

export const AccountingListCreditNote = () => {
  const preferenceDate = useAppSelector((state) => state?.auth?.preference?.date);

  const { t } = useTranslation();

  const router = useRouter();

  const { data, isFetching } = useGetSalesCreditNoteListDataQuery({
    pagination: getRouterQuery({ type: ['PAGINATION'] }),
  });

  const rowData = useMemo(() => data?.accounting?.sales?.listCreditNote?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        accessorFn: (row) => row?.node?.name,
        header: t['accountingCreditNoteListCustomer'],

        meta: {
          width: '60%',
        },
      },
      {
        header: t['accountingCreditNoteListTotalAmount'],
        accessorFn: (row) => row?.node?.totalAmount,
        meta: {
          width: '30%',
        },
      },
      {
        header: 'Date',
        accessorFn: (row) =>
          preferenceDate === DateType.Bs ? row?.node?.date?.np : row?.node?.date?.en ?? 'N/A',
      },
      {
        id: '_actions',
        header: '',
        accessorKey: 'actions',
        cell: (props) =>
          props?.row?.original?.node && (
            <TablePopover
              items={[
                {
                  title: 'Edit',
                  onClick: (row) => {
                    router.push(`/accounting/sales/credit-note/edit/${row['id']}`);
                  },
                },
              ]}
              node={props?.row?.original?.node}
            />
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
