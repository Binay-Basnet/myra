import { FormEditableTable } from '@coop/shared/form';

type SupplierPaymentTableType = {
  type: string;
  date: string;
  amount: number;
  left_to_allocate?: number;
  this_allocation?: number;
};

export const SupplierPaymentTable = () => {
  return (
    <FormEditableTable<SupplierPaymentTableType>
      name="data"
      columns={[
        {
          accessor: 'type',
          header: 'Type',
          cellWidth: 'auto',
        },
        {
          accessor: 'date',
          header: 'Date',
          fieldType: 'date',
        },
        {
          accessor: 'amount',
          header: 'Amount',
          isNumeric: true,
        },
        {
          accessor: 'left_to_allocate',
          header: 'Left to Allocate',
          isNumeric: true,
        },
        {
          accessor: 'this_allocation',
          header: 'This Allocation',
          isNumeric: true,
        },
      ]}
    />
  );
};
