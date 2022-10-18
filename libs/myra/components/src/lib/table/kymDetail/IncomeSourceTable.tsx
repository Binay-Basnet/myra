import { Table } from '@coop/shared/table';

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

export const IncomeSourceTable = () => (
  <Table
    isLoading={false}
    data={data}
    columns={[
      {
        header: 'SN',
        accessorFn: (row: any) => row?.id,
        meta: {
          width: 's16',
        },
      },

      {
        header: 'Income Source',
        accessorFn: (row: any) => row?.incomeSource,
        meta: {
          width: '80%',
        },
      },
      {
        header: 'Amount',
        accessorFn: (row: any) => row?.amount,
        meta: {
          isNumeric: true,
        },
      },
    ]}
    isStatic
    size="compact"
  />
);
