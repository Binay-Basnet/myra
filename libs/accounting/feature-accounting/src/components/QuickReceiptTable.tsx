import { FormEditableTable } from '@coop/shared/form';

type QuickReceiptTableType = {
  account: string;
  amount: string;
};

export const QuickReceiptTable = () => {
  return (
    <FormEditableTable<QuickReceiptTableType>
      name="data"
      columns={[
        {
          accessor: 'account',
          header: 'Account',
          cellWidth: 'auto',
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
