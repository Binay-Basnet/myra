import { FormEditableTable } from '@coop/shared/form';

type JournalVouchersTableType = {
  transferred_to: string;
  dr_amount: string;
  cr_amount: string;
};

export const JournalVouchersTable = () => {
  return (
    <FormEditableTable<JournalVouchersTableType>
      name="data"
      columns={[
        {
          accessor: 'transferred_to',
          header: 'Transferred To (Select Ledger)',
          cellWidth: 'auto',
          fieldType: 'select',
        },
        {
          accessor: 'dr_amount',
          header: 'DR Amount',
          isNumeric: true,
        },
        {
          accessor: 'cr_amount',
          header: 'CR Amount',
          isNumeric: true,
        },
      ]}
    />
  );
};
