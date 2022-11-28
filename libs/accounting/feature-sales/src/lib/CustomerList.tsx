import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { AccountingPageHeader } from '@coop/accounting/ui-components';
import { useGetSalesCustomerListDataQuery } from '@coop/cbs/data-access';
import { Column, Table } from '@coop/shared/table';
import { TablePopover } from '@myra-ui';
import { getRouterQuery, useTranslation } from '@coop/shared/utils';

export const CustomerList = () => {
  const { t } = useTranslation();

  const router = useRouter();

  const { data, isFetching } = useGetSalesCustomerListDataQuery({
    pagination: getRouterQuery({ type: ['PAGINATION'] }),
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
