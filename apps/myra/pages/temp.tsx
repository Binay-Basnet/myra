import { Box } from '@chakra-ui/react';

import { EditableTable } from '@coop/shared/editable-table';

type SalesTable = {
  product: string;
  quantity: number;
  account_type?: string;
  rate: number;
  tax: number;
  total_amount: number;
  product_description?: string;
  warehouse_partition?: number;
  sales_ledger?: string;
};

const Temp = () => {
  return (
    <Box p="s16" bg="white" minH="100vh">
      <EditableTable<SalesTable>
        defaultData={[
          {
            product: 'MI 001. Lenovo Laptop',
            quantity: 100,
            account_type: 'savings',
            rate: 40,
            tax: 400,
            total_amount: 100,
          },
          {
            product: 'MI 001. Lenovo Laptop',
            quantity: 100,
            rate: 40,
            tax: 400,
            account_type: 'current',
            total_amount: 100,
          },
          {
            product: 'MI 001. Lenovo Laptop',
            quantity: 100,
            account_type: 'savings',

            rate: 40,
            tax: 400,
            total_amount: 100,
          },
        ]}
        columns={[
          {
            accessor: 'product',
            header: 'Product',
            cellWidth: 'auto',
          },
          {
            accessor: 'account_type',
            header: 'Account Type',
            cellWidth: 'lg',
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
          },
          {
            accessor: 'quantity',
            header: 'Quantity',
            isNumeric: true,
          },
          {
            accessor: 'rate',
            header: 'Rate',
            isNumeric: true,
          },
          {
            accessor: 'tax',
            header: 'Tax',
            isNumeric: true,
          },
          {
            accessor: 'total_amount',
            header: 'Total Amount',
            isNumeric: true,
            accessorFn: (row) => row.quantity * row.rate + row.tax,
          },
          {
            accessor: 'product_description',
            header: 'Product Description',
            hidden: true,
          },

          {
            accessor: 'warehouse_partition',
            header: 'Warehouse Partition',
            hidden: true,
          },
          {
            accessor: 'sales_ledger',
            header: 'Sales Ledger',
            hidden: true,
          },
        ]}
      />
    </Box>
  );
};

export default Temp;
