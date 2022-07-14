import { FormEditableTable } from '@coop/shared/form';

type ExpensesTableType = {
  product_id: string;
  transferred_to: string;
  rate: number;
  tax: number;
  amount: number;
  product_description?: string;
  warehouse_partition?: number;
  purchase_ledger?: string;
};

export const ExpensesTable = () => {
  return (
    <FormEditableTable<ExpensesTableType>
      name="data"
      columns={[
        {
          accessor: 'transferred_to',
          header: 'Transferred To (Select Ledger)',
          fieldType: 'select',
          selectOptions: [
            {
              label: 'SAVINGS',
              value: 'savings',
            },
            {
              label: 'CURRENT',
              value: 'current',
            },
          ],
          cellWidth: 'auto',
        },
        {
          accessor: 'tax',
          header: 'Tax',
          isNumeric: true,
          cellWidth: 'auto',
          fieldType: 'percentage',
        },
        {
          accessor: 'amount',
          header: 'Amount',
          isNumeric: true,
          cellWidth: 'auto',
          //   hidden: true,

          // accessorFn: (row) => row.quantity * row.rate + row.tax,
        },
      ]}
    />
  );
};
