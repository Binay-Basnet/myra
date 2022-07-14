import { FormEditableTable } from '@coop/shared/form';

type CashTransferTableType = {
  transferred_to: string;
  amount: string;
};

export const CashTransferTable = () => {
  return (
    <FormEditableTable<CashTransferTableType>
      name="data"
      columns={[
        {
          accessor: 'transferred_to',
          header: 'Transferred To (Select Ledger)',
          cellWidth: 'auto',
          fieldType: 'select',
        },
        {
          accessor: 'amount',
          header: 'Amount',
          isNumeric: true,
        },
      ]}
    />
  );
};
