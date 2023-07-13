import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Column, PageHeader, Table } from '@myra-ui';

import {
  TellerBankTransferType,
  useGetBankTransferListQuery,
  useGetSettingsUserListDataQuery,
} from '@coop/cbs/data-access';
import { localizedDate, ROUTES } from '@coop/cbs/utils';
import { amountConverter, getFilterQuery, getPaginationQuery } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface BankTransferListProps {}

export const BankTransferList = () => {
  const router = useRouter();
  const { data: userList } = useGetSettingsUserListDataQuery({
    paginate: { after: '', first: -1 },
  });
  const { data, isFetching } = useGetBankTransferListQuery(
    {
      pagination: getPaginationQuery(),
      filter: getFilterQuery(),
    },
    {
      staleTime: 0,
    }
  );

  const rowData = useMemo(() => data?.transaction?.tellerBankTransfer?.list?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        id: 'date',
        header: 'Transfer Date',
        accessorFn: (row) => localizedDate(row?.node?.transactionDate),
        cell: (props) => localizedDate(props?.row?.original?.node?.transactionDate),
        filterFn: 'dateTime',
        enableColumnFilter: true,
      },
      {
        header: 'ID',
        accessorFn: (row) => row?.node?.id,
      },
      {
        id: 'tellerName',
        header: 'Teller Name',
        accessorFn: (row) => row?.node?.tellerName,
        enableColumnFilter: true,

        meta: {
          width: '25%',
          filterMaps: {
            list: userList?.settings?.myraUser?.list?.edges?.map((e) => ({
              label: e?.node?.name,
              value: e?.node?.id,
            })),
          },
        },
      },
      {
        id: 'transferType',
        header: 'Transfer Type',
        accessorFn: (row) => row?.node?.transferType,
        enableColumnFilter: true,

        meta: {
          filterMaps: {
            list: [
              { label: 'Deposit', value: TellerBankTransferType.Deposit },
              { label: 'Withdraw', value: TellerBankTransferType.Withdraw },
            ],
          },
          width: '25%',
        },
      },
      {
        header: 'Service Center',
        accessorFn: (row) => row?.node?.transactionBranchName,
      },
      {
        id: 'amount',
        header: 'Amount',
        meta: {
          isNumeric: true,
        },
        accessorFn: (row) => amountConverter(row?.node?.amount as string),
        filterFn: 'amount',
        enableColumnFilter: true,
      },
    ],
    [userList]
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
