import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Column, PageHeader, Table } from '@myra-ui';

import { useGetBankTransferListQuery } from '@coop/cbs/data-access';
import { localizedDate, ROUTES } from '@coop/cbs/utils';
import { amountConverter, getRouterQuery } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface BankTransferListProps {}

export const BankTransferList = () => {
  const router = useRouter();
  const { data, isFetching } = useGetBankTransferListQuery(
    {
      pagination: getRouterQuery({ type: ['PAGINATION'] }),
    },
    {
      staleTime: 0,
    }
  );

  const rowData = useMemo(() => data?.transaction?.tellerBankTransfer?.list?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Transfer Date',
        accessorFn: (row) => localizedDate(row?.node?.transactionDate),
        cell: (props) => localizedDate(props?.row?.original?.node?.transactionDate),
      },
      {
        header: 'ID',
        accessorFn: (row) => row?.node?.id,
      },
      {
        header: 'Teller Name',
        accessorFn: (row) => row?.node?.tellerName,
        meta: {
          width: '25%',
        },
      },
      {
        header: 'Transfer Type',
        accessorFn: (row) => row?.node?.transferType,
        meta: {
          width: '25%',
        },
      },
      {
        header: 'Amount',
        meta: {
          isNumeric: true,
        },
        accessorFn: (row) => amountConverter(row?.node?.amount as string),
      },
      // {
      //   id: '_actions',
      //   header: '',
      //   accessorKey: 'actions',
      //   cell: (cell) => {
      //     const member = cell?.row?.original?.node;
      //     const memberData = { id: member?.ID };
      //     return <PopoverComponent items={[]} member={memberData} />;
      //   },
      //   meta: {
      //     width: '60px',
      //   },
      // },
    ],
    []
  );
  return (
    <>
      <PageHeader
        heading="Teller to Bank transfer"
        // tabItems={tabList}
      />

      <Table
        data={rowData}
        getRowId={(row) => String(row?.node?.id)}
        rowOnClick={(row) =>
          router.push(`${ROUTES.CBS_TRANSFER_BANK_DETAILS}?id=${row?.node?.transactionId}`)
        }
        isLoading={isFetching}
        columns={columns}
        pagination={{
          total: data?.transaction?.tellerBankTransfer?.list?.totalCount ?? 'Many',
          pageInfo: data?.transaction?.tellerBankTransfer?.list?.pageInfo,
        }}
        noDataTitle="service center cash transfer list"
        menu="TRANSFERS"
      />
    </>
  );
};

export default BankTransferList;
