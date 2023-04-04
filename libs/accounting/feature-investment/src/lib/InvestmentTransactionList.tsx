import { useMemo } from 'react';

import { Column, Table } from '@myra-ui/table';

import { AccountingPageHeader } from '@coop/accounting/ui-components';
import {
  DateType,
  InvestmentType,
  RootState,
  useAppSelector,
  useGetInvestmentTransactionsListDataQuery,
} from '@coop/cbs/data-access';
import { getPaginationQuery } from '@coop/shared/utils';

const investmentAccountType = {
  [InvestmentType.Share]: 'Share',
  [InvestmentType.Saving]: 'Savings & Deposit',
  [InvestmentType.FixedDeposit]: 'Fixed Deposit',
};

export const InvestmentTransactionList = () => {
  const preferenceDate = useAppSelector((state: RootState) => state?.auth?.preference?.date);

  const { data, isFetching } = useGetInvestmentTransactionsListDataQuery({
    pagination: getPaginationQuery(),
  });

  const rowData = useMemo(() => data?.accounting?.investment?.listTransaction?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        id: 'id',
        header: 'Entry ID',
        accessorFn: (row) => row?.node?.id,
        // enableSorting: true,
      },
      {
        id: 'name',
        accessorFn: (row) => row?.node?.name,
        header: 'Investment Account',
        // enableSorting: true,
        // cell: (props) => (
        //   <Box display="flex" alignItems="center" gap="s12">
        //     <Text
        //       fontSize="s3"
        //       textTransform="capitalize"
        //       textOverflow="ellipsis"
        //       overflow="hidden"
        //     >
        //       {props.getValue() as string}
        //     </Text>
        //   </Box>
        // ),

        meta: {
          width: '400px',
        },
      },
      {
        header: 'Investment Type',
        accessorFn: (row) => (row?.node?.type ? investmentAccountType[row?.node?.type] : ''),
        meta: {
          width: '220px',
        },
      },
      {
        header: 'Transaction Amount',
        accessorFn: (row) => row?.node?.amount,
        meta: {
          width: '120px',
        },
      },
      {
        header: 'Transaction Date',
        accessorFn: (row) => {
          const date = preferenceDate === DateType.Bs ? row?.node?.date?.np : row?.node?.date?.en;
          return date?.split(' ')[0] ?? 'N/A';
        },
        meta: {
          width: '100px',
        },
      },
      // {
      //   id: '_actions',
      //   header: '',
      //   accessorKey: 'actions',
      //   cell: (props) =>
      //     props?.row?.original?.node && (
      //       <TablePopover node={props?.row?.original?.node} items={[]} />
      //     ),
      //   meta: {
      //     width: 's60',
      //   },
      // },
    ],
    [preferenceDate]
  );

  return (
    <>
      <AccountingPageHeader heading="Investment Transactions" />

      <Table
        data={rowData}
        getRowId={(row) => String(row?.node?.id)}
        // rowOnClick={(row) => {
        //   router.push(`/members/details?id=${row?.node?.id}`);
        // }}
        isLoading={isFetching}
        columns={columns}
        noDataTitle="transaction list"
        pagination={{
          total: data?.accounting?.investment?.listTransaction?.totalCount ?? 'Many',
          pageInfo: data?.accounting?.investment?.listTransaction?.pageInfo,
        }}
      />
    </>
  );
};

export default InvestmentTransactionList;
