import { useMemo } from 'react';
import { Column, Table } from '@coop/shared/ui';

export const IncomeSourceTable = () => {
  const data = [
    {
      id: 1,
      incomeSource: 'Agriculture',
      amount: '20,000.00',
    },
    {
      id: 2,
      incomeSource: 'Business',
      amount: '4,00,000.00',
    },
  ];

  const rowData = useMemo(() => data ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        Header: 'SN',
        accessor: 'id',
        maxWidth: 4,
        disableSortBy: false,
      },

      {
        Header: 'Income Source',
        accessor: 'incomeSource',
        width: '80%',
      },
      {
        Header: 'Amount',
        accessor: 'amount',
      },
    ],
    []
  );

  return (
    <Table
      isLoading={false}
      data={rowData}
      columns={columns}
      isStatic={true}
      size="compact"
    />
  );
};
