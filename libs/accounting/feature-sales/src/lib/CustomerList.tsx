import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { TablePopover } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { AccountingPageHeader } from '@coop/accounting/ui-components';
import { useGetSalesCustomerListDataQuery } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { getPaginationQuery, useTranslation } from '@coop/shared/utils';

export const CustomerList = () => {
  const { t } = useTranslation();

  const router = useRouter();

  const { data, isFetching } = useGetSalesCustomerListDataQuery({
    pagination: getPaginationQuery(),
  });

  const rowData = useMemo(() => data?.accounting?.sales?.listCustomer?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        accessorFn: (row) => row?.node?.name,
        header: 'Full Name',
        meta: {
          width: '60%',
        },
      },
      {
        header: 'Phone Number',
        accessorFn: (row) => row?.node?.phoneNumber,
      },
      {
        header: 'Email',
        accessorFn: (row) => row?.node?.email,
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
                  title: 'Edit',
                  onClick: (row) => {
                    router.push(`/accounting/sales/customer/edit/${row['id']}`);
                  },
                },
              ]}
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
      <AccountingPageHeader heading="Customers" />

      <Table
        data={rowData}
        getRowId={(row) => String(row?.node?.id)}
        rowOnClick={(row) => {
          router.push(`${ROUTES.ACCOUNTING_SALES_CUSTOMER_DETAILS}?id=${row?.node?.id}`);
        }}
        isLoading={isFetching}
        columns={columns}
        pagination={{
          total: data?.accounting?.sales?.listCustomer?.totalCount ?? 'Many',
          pageInfo: data?.accounting?.sales?.listCustomer?.pageInfo,
        }}
        noDataTitle="customer list"
      />
    </>
  );
};

export default CustomerList;
