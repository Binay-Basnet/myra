import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Text } from '@myra-ui';
import { Column, Table, TablePopover } from '@myra-ui/table';

import { AccountingPageHeader } from '@coop/accounting/ui-components';
import {
  useGetJournalVoucherListQuery,
  useGetMemberFilterMappingQuery,
} from '@coop/cbs/data-access';
import { localizedDate, ROUTES } from '@coop/cbs/utils';
import {
  amountConverter,
  featureCode,
  getFilterQuery,
  getPaginationQuery,
  useTranslation,
} from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface AccountingFeatureJournalVouchersListProps {}

export const AccountingFeatureJournalVouchersList = () => {
  const { t } = useTranslation();
  const { data: filterMapping } = useGetMemberFilterMappingQuery();

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
        id: 'transaction_date',
        header: 'Date',
        accessorFn: (row) => row?.node?.transactionDate,
        cell: (row) => <Text>{localizedDate(row?.row?.original?.node?.transactionDate)}</Text>,
        enableColumnFilter: true,
        filterFn: 'dateTime',
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
        id: 'branchId',
        header: 'Service Center',
        accessorFn: (row) => row?.node?.branchName,
        enableColumnFilter: true,
        meta: {
          filterMaps: {
            list: filterMapping?.members?.filterMapping?.serviceCenter,
          },
        },
      },
      {
        id: 'amount',
        header: 'Amount',
        meta: {
          isNumeric: true,
          width: '15%',
        },
        accessorFn: (row) => amountConverter(row?.node?.amount || 0),
        enableColumnFilter: true,
        filterFn: 'amount',
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
    [baseRoute, filterMapping?.members?.filterMapping?.serviceCenter, router]
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
