import { FormEditableTable } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

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
  const { t } = useTranslation();

  return (
    <FormEditableTable<ExpensesTableType>
      name="data"
      columns={[
        {
          accessor: 'transferred_to',
          header: t['accountingExpensesFormTableTransferredTo'],
          fieldType: 'select',
          cellWidth: 'auto',
        },
        {
          accessor: 'tax',
          header: t['accountingExpensesFormTableTax'],
          isNumeric: true,
          cellWidth: 'auto',
          fieldType: 'percentage',
        },
        {
          accessor: 'amount',
          header: t['accountingExpensesFormTableAmount'],
          isNumeric: true,
          cellWidth: 'auto',
        },
      ]}
    />
  );
};
