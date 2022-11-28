import { FormEditableTable } from '@coop/shared/form';
import { FormSection, GridItem } from '@myra-ui';
import { useTranslation } from '@coop/shared/utils';

// const SearchOptions = [
//   { label: 'MI 001 - Lenovo Laptop', value: 'mi001' },
//   { label: 'MI 002 - Lenovo Laptop', value: 'mi002' },
//   { label: 'MI 003 - Lenovo Laptop', value: 'mi003' },
//   { label: 'MI 004 - Lenovo Laptop', value: 'mi004' },
//   { label: 'MI 005 - Lenovo Laptop', value: 'mi005' },
//   { label: 'MI 006 - Lenovo Laptop', value: 'mi006' },
//   { label: 'MI 007 - Lenovo Laptop', value: 'mi007' },
//   { label: 'MI 008 - Lenovo Laptop', value: 'mi008' },
//   { label: 'MI 009 - Lenovo Laptop', value: 'mi009' },
//   { label: 'MI 0010 - Lenovo Laptop', value: 'mi0010' },
// ];

type SalesTable = {
  name: string;
  quantity: number;
  account_type?: string;
  rate: number;
  tax: number;
  amount: number;
  productDescription?: string;
  warehousePartition?: number;
  salesLedger?: string;
};

export const EntryTable = () => {
  const { t } = useTranslation();
  return (
    <FormSection>
      <GridItem colSpan={3}>
        <FormEditableTable<SalesTable>
          name="products"
          columns={[
            {
              accessor: 'name',
              header: t['Salesproduct_id'],
              cellWidth: 'auto',
              // fieldType: 'search',
              // searchOptions: SearchOptions,
            },

            {
              accessor: 'quantity',
              header: t['SalesQuantity'],
              isNumeric: true,
            },
            {
              accessor: 'rate',
              header: t['SaleRate'],
              isNumeric: true,
            },
            {
              accessor: 'tax',
              header: t['SaleTax'],
              isNumeric: true,
              fieldType: 'percentage',
            },
            {
              accessor: 'amount',
              header: t['SaleTotalAmount'],
              isNumeric: true,

              accessorFn: (row) => String(row.quantity * row.rate),
            },
            {
              accessor: 'productDescription',
              header: t['SaleProductDescription'],
              hidden: true,

              fieldType: 'textarea',
            },

            {
              accessor: 'warehousePartition',
              hidden: true,
              header: t['SaleWarehousePartition'],
            },
            {
              accessor: 'salesLedger',
              hidden: true,
              header: t['SaleSelectWareLedger'],
            },
          ]}
        />
      </GridItem>
    </FormSection>
  );
};
