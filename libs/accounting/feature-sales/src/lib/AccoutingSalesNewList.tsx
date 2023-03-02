import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { AccountingPageHeader } from '@coop/accounting/ui-components';
import {
  DateType,
  RootState,
  useAppSelector,
  useGetSalesSaleEntryListDataQuery,
} from '@coop/cbs/data-access';
import { Column, Table } from '@myra-ui/table';
import { TablePopover } from '@myra-ui';
import { getPaginationQuery, useTranslation } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface AccountingSalesListProps {}

export const AccountingSalesList = () => {
  const { t } = useTranslation();

  const router = useRouter();

  const preferenceDate = useAppSelector((state: RootState) => state?.auth?.preference?.date);

  const { data, isFetching } = useGetSalesSaleEntryListDataQuery({
    pagination: getPaginationQuery(),
  });

  const rowData = useMemo(() => data?.accounting?.sales?.listSaleEntry?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Order No',
        accessorFn: (row) => row?.node?.id,
      },
      {
        accessorFn: (row) => row?.node?.name,
        header: t['accountingSalesListCustomer'],
        meta: {
          width: '60%',
        },
      },
      {
        header: t['accountingSalesListTotalAmount'],
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
              node={props?.row?.original?.node}
              items={[
                {
                  title: 'Edit',
                  onClick: (row) => {
                    router.push(`/accounting/sales/edit/${row['id']}`);
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
      <AccountingPageHeader heading="Sales Entry" />

      <Table
        data={rowData}
        getRowId={(row) => String(row?.node?.id)}
        isLoading={isFetching}
        columns={columns}
        pagination={{
          total: data?.accounting?.sales?.listSaleEntry?.totalCount ?? 'Many',
          pageInfo: data?.accounting?.sales?.listSaleEntry?.pageInfo,
        }}
        noDataTitle="sales list"
      />
    </>
  );
};

export default AccountingSalesList;
