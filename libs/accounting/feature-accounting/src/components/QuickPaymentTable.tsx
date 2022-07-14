import { FormEditableTable } from '@coop/shared/form';

type QuickPaymentTableType = {
  account: string;
  amount: string;
};

export const QuickPaymentTable = () => {
  return (
    <FormEditableTable<QuickPaymentTableType>
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
