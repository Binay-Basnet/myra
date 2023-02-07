import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Text } from '@myra-ui';
import { Column, Table, TablePopover } from '@myra-ui/table';

import { AccountingPageHeader } from '@coop/accounting/ui-components';
import { Filter_Mode, useGetJournalVoucherListQuery } from '@coop/cbs/data-access';
import { localizedDate, ROUTES } from '@coop/cbs/utils';
import { featureCode, getRouterQuery, useTranslation } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface AccountingFeatureJournalVouchersListProps {}

export const AccountingFeatureJournalVouchersList = () => {
  const { t } = useTranslation();

  const router = useRouter();
  const searchTerm = router?.query['search'] as string;

  const { data, isFetching } = useGetJournalVoucherListQuery({
    pagination: getRouterQuery({ type: ['PAGINATION'] }),
    filter: {
      id: searchTerm,
      transactionId: searchTerm,
      filterMode: Filter_Mode.Or,
    },
    // filter: {
    //   objState: (router.query['objState'] ?? ObjState.Approved) as ObjState,
    // },
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
        header: 'Amount',
        meta: {
          isNumeric: true,
        },
        accessorFn: (row) => row?.node?.amount,
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
        heading={`${t['accountingJournalVouchersListJournalVouchers']} - ${featureCode?.journalVoucherList}`}
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

export default AccountingFeatureJournalVouchersList;
