import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Text } from '@myra-ui';
import { Column, Table, TablePopover } from '@myra-ui/table';

import { AccountingPageHeader } from '@coop/accounting/ui-components';
import { useGetJournalVoucherListQuery } from '@coop/cbs/data-access';
import { localizedDate, ROUTES } from '@coop/cbs/utils';
import {
  amountConverter,
  getFilterQuery,
  getPaginationQuery,
  useTranslation,
} from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface AccountingFeatureLedgerBalanceTransferListProps {}

export const AccountingFeatureLedgerBalanceTransferList = () => {
  const { t } = useTranslation();

  const router = useRouter();

  const { data, isFetching } = useGetJournalVoucherListQuery({
    pagination: getPaginationQuery(),
    filter: getFilterQuery(),
  });

  const rowData = useMemo(() => data?.accounting?.journalVoucher?.list?.edges ?? [], [data]);

  const baseRoute = router?.pathname?.includes('transactions')
    ? 'transactions/journal-vouchers'
    : 'accounting/accounting';

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Date',
        cell: (row) => <Text>{localizedDate(row?.row?.original?.node?.transactionDate)}</Text>,
      },
      {
        header: 'Transaction Id',
        accessorFn: (row) => row?.node?.transactionCode,
      },
      {
        header: 'Note',
        accessorFn: (row) => row?.node?.note,
      },
      {
        header: 'Service Center',
        accessorFn: (row) => row?.node?.branchName,
      },
      {
        header: 'Amount',
        meta: {
          isNumeric: true,
          width: '15%',
        },
        accessorFn: (row) => amountConverter(row?.node?.amount || 0),
      },
      {
        id: '_actions',
        header: '',
        accessorKey: 'actions',
        cell: (props) =>
          props?.row?.original?.node && (
            <TablePopover
              node={props?.row?.original?.node}
              items={[
                {
                  title: 'View Details',
                  onClick: (row) => {
                    router?.pathname?.includes('transactions')
                      ? router.push(
                          `/${ROUTES.CBS_TRANS_JOURNAL_VOUCHER_DETAILS}?id=${row?.transactionCode}`
                        )
                      : router.push(
                          `/${baseRoute}/journal-vouchers/view?id=${row?.transactionCode}`
                        );
                  },
                },
              ]}
            />
          ),
      },
    ],
    [t]
  );

  return (
    <>
      <AccountingPageHeader
        heading="Ledger Balance Transfer"
        // buttonLabel={t['accountingJournalVouchersListNewJournalVoucher']}
        // buttonHandler={() => router.push('/accounting/accounting/journal-vouchers/add')}
      />

      <Table
        data={rowData}
        getRowId={(row) => String(row?.node?.id)}
        isLoading={isFetching}
        columns={columns}
        rowOnClick={(row) =>
          router?.pathname?.includes('transactions')
            ? router.push(
                `/${ROUTES.CBS_TRANS_JOURNAL_VOUCHER_DETAILS}?id=${row?.node?.transactionCode}`
              )
            : router.push(`/${baseRoute}/journal-vouchers/view?id=${row?.node?.transactionCode}`)
        }
        pagination={{
          total: data?.accounting?.journalVoucher?.list?.totalCount ?? 'Many',
          pageInfo: data?.accounting?.journalVoucher?.list?.pageInfo,
        }}
        menu="TRANSACTIONS"
      />
    </>
  );
};

export default AccountingFeatureLedgerBalanceTransferList;
