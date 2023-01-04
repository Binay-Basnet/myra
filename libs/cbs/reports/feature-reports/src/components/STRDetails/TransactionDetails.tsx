import { useMemo } from 'react';

import { DetailsCard } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { amountConverter, quantityConverter } from '@coop/shared/utils';

import { useSTRDetails } from '../../hooks/useSTRDetails';

export const TransactionDetails = () => {
  const { transactionDetails } = useSTRDetails();

  const transactionDetailsList = useMemo(
    () =>
      transactionDetails?.map((details, index) => ({ index: String(index + 1), ...details })) ?? [],
    [transactionDetails]
  );

  const columns = useMemo<Column<typeof transactionDetailsList[0]>[]>(
    () => [
      {
        header: 'SN',
        accessorKey: 'index',
        cell: (props) => (props.getValue() ? props.getValue() : 'N/A'),
      },
      {
        header: 'Account No.',
        accessorKey: 'accountNo',
        meta: {
          width: '30%',
        },
      },
      {
        header: 'Year',
        accessorKey: 'year',
      },
      {
        header: 'Total Dr. Transaction No.',
        accessorFn: (row) => quantityConverter(row?.drTransactionNo ?? 0),
        meta: { isNumeric: true },
      },
      {
        header: 'Total Dr. Amount',
        accessorFn: (row) => amountConverter(row?.drTransactionAmount ?? 0),
        meta: { isNumeric: true },
      },
      {
        header: 'Total Cr. Transaction No.',
        accessorFn: (row) => quantityConverter(row?.crTransactionNo ?? 0),
        meta: { isNumeric: true },
      },
      {
        header: 'Total Cr. Amount',
        accessorFn: (row) => amountConverter(row?.crTransactionAmount ?? 0),
        meta: { isNumeric: true },
      },
      {
        header: 'Closing Balance',
        accessorFn: (row) => amountConverter(row?.closingBalance ?? 0),
        meta: { isNumeric: true },
      },
    ],
    []
  );

  return (
    <DetailsCard title="Transaction Details (Accountwise)" hasTable>
      <Table
        isDetailPageTable
        isStatic
        data={transactionDetailsList}
        columns={columns}
        showFooter
      />
    </DetailsCard>
  );
};
