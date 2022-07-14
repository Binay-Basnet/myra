import { FormEditableTable } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

type SupplierPaymentTableType = {
  type: string;
  date: string;
  amount: number;
  left_to_allocate?: number;
  this_allocation?: number;
};

export const SupplierPaymentTable = () => {
  const { t } = useTranslation();
  return (
    <FormEditableTable<SupplierPaymentTableType>
      name="data"
      columns={[
        {
          accessor: 'type',
          header: t['accountingSupplierPaymentFormTableType'],
          cellWidth: 'auto',
        },
        {
          accessor: 'date',
          header: t['accountingSupplierPaymentFormTableDate'],
          fieldType: 'date',
        },
        {
          accessor: 'amount',
          header: t['accountingSupplierPaymentFormTableAmount'],
          isNumeric: true,
        },
        {
          accessor: 'left_to_allocate',
          header: t['accountingSupplierPaymentFormTableLeftToAllocate'],
          isNumeric: true,
        },
        {
          accessor: 'this_allocation',
          header: t['accountingSupplierPaymentFormTableThisAllocation'],
          isNumeric: true,
        },
      ]}
    />
  );
};
