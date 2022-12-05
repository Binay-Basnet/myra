import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { AccountingPageHeader } from '@coop/accounting/ui-components';
import {
  CustomerPayment,
  DateType,
  useAppSelector,
  useGetSalesCustomerPaymentListDataQuery,
} from '@coop/cbs/data-access';
import { Column, Table } from '@myra-ui/table';
import { TablePopover } from '@myra-ui';
import { getRouterQuery, useTranslation } from '@coop/shared/utils';

const PayementMode = {
  [CustomerPayment.BankTransfer]: 'Bank Transfer',
  [CustomerPayment.Cash]: 'Cash',
  [CustomerPayment.Cheque]: 'Cheque',
};

export const AccountingCustomerPayment = () => {
  const preferenceDate = useAppSelector((state) => state?.auth?.preference?.date);

  const { t } = useTranslation();

  const router = useRouter();

  const { data, isFetching } = useGetSalesCustomerPaymentListDataQuery({
    pagination: getRouterQuery({ type: ['PAGINATION'] }),
  });

  const rowData = useMemo(() => data?.accounting?.sales?.listCustomerPayment?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: t['accountingCustomerPaymentListEntryNo'],
        accessorFn: (row) => row?.node?.id,
      },
      {
        accessorFn: (row) => row?.node?.receivedFrom,
        header: 'Recieved From',
        meta: {
          width: '30%',
        },
      },
      {
        header: t['accountingCustomerPaymentListTotalAmount'],
        accessorFn: (row) => row?.node?.totalAmount,
      },
      {
        header: t['accountingCustomerPaymentListDate'],
        accessorFn: (row) =>
          preferenceDate === DateType.Bs ? row?.node?.date?.np : row?.node?.date?.en ?? 'N/A',
      },
      {
        header: t['accountingCustomerPaymentListPaymentMode'],
        accessorFn: (row) => (row?.node?.paymentMode ? PayementMode[row?.node?.paymentMode] : ''),
        // meta: {
        //   width: '10%',
        // },
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
                    router.push(`/accounting/sales/customer-payment/edit/${row['id']}`);
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
      <AccountingPageHeader heading={t['accountingCustomerPaymentListCustomerPayment']} />

      <Table
        data={rowData}
        getRowId={(row) => String(row?.node?.id)}
        isLoading={isFetching}
        columns={columns}
        pagination={{
          total: data?.accounting?.sales?.listCustomerPayment?.totalCount ?? 'Many',
          pageInfo: data?.accounting?.sales?.listCustomerPayment?.pageInfo,
        }}
        noDataTitle="customer payment list"
      />
    </>
  );
};

export default AccountingCustomerPayment;
