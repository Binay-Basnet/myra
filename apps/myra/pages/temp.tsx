import { Box } from '@chakra-ui/react';

import { EditableTable } from '@coop/shared/editable-table';

interface SalesTable {
  product: string;
  quantity: number;
  rate: number;
  tax: number;
  total_amount: number;
  product_description?: string;
  warehouse_partition?: string;
  sales_ledger?: string;
}

const Temp = () => {
  return (
    <Box p="s8">
      <EditableTable<SalesTable>
        defaultData={[
          {
            product: 'MI 001. Lenovo Laptop',
            quantity: 100,
            rate: 40,
            tax: 400,
            total_amount: 100,
          },
          {
            product: 'MI 001. Lenovo Laptop',
            quantity: 100,
            rate: 40,
            tax: 400,
            total_amount: 100,
          },
          {
            product: 'MI 001. Lenovo Laptop',
            quantity: 100,
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
          { accessor: 'total_amount', header: 'Total Amount', isNumeric: true },
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
