import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Column, Table, TablePopover } from '@myra-ui/table';

import { AccountingPageHeader } from '@coop/accounting/ui-components';
import {
  DateType,
  RootState,
  useAppSelector,
  useGetJournalVoucherListQuery,
} from '@coop/cbs/data-access';
import { getRouterQuery, useTranslation } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface AccountingFeatureJournalVouchersListProps {}

export const AccountingFeatureJournalVouchersList = () => {
  const preferenceDate = useAppSelector((state: RootState) => state?.auth?.preference?.date);

  const { t } = useTranslation();

  const router = useRouter();

  const { data, isFetching } = useGetJournalVoucherListQuery({
    pagination: getRouterQuery({ type: ['PAGINATION'] }),
    // filter: {
    //   objState: (router.query['objState'] ?? ObjState.Approved) as ObjState,
    // },
  });

  const rowData = useMemo(() => data?.accounting?.journalVoucher?.list?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Entry Id',
        accessorFn: (row) => row?.node?.id,
      },
      {
        accessorFn: (row) =>
          preferenceDate === DateType.Bs ? row?.node?.date?.np : row?.node?.date?.en,
        header: 'Date',

        // meta: {
        //   width: '60%',
        // },
      },
      {
        header: 'Reference',
        accessorFn: (row) => row?.node?.reference,
        // meta: {
        //   width: '30%',
        // },
      },
      {
        header: 'Amount',
        accessorFn: (row) => row?.node?.amount,
        // meta: {
        //   width: '30%',
        // },
      },
      {
        id: '_actions',
        header: '',
        accessorKey: 'actions',
        cell: (props) =>
          props?.row?.original?.node && (
            <TablePopover
              node={props?.row?.original?.node}
              items={
                [
                  // {
                  //   title: 'Edit Account',
                  //   onClick: (row) => {
                  //     router.push(`/accounting/investment/investment-account/edit/${row['id']}`);
                  //   },
                  // },
                ]
              }
            />
          ),
        // meta: {
        //   width: '60px',
        // },
      },
    ],
    [t]
  );

  return (
    <>
      <AccountingPageHeader
        heading={t['accountingJournalVouchersListJournalVouchers']}
        buttonLabel={t['accountingJournalVouchersListNewJournalVoucher']}
        buttonHandler={() => router.push('/accounting/accounting/journal-vouchers/add')}
      />

      <Table
        data={rowData}
        getRowId={(row) => String(row?.node?.id)}
        isLoading={isFetching}
        columns={columns}
        rowOnClick={(row) =>
          router.push(`/accounting/accounting/journal-vouchers/view?id=${row?.node?.id}`)
        }
        pagination={{
          total: data?.accounting?.journalVoucher?.list?.totalCount ?? 'Many',
          pageInfo: data?.accounting?.journalVoucher?.list?.pageInfo,
        }}
      />
    </>
  );
};

export default AccountingFeatureJournalVouchersList;
