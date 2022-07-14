import { FormEditableTable } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

type QuickPaymentTableType = {
  account: string;
  amount: string;
};

export const QuickPaymentTable = () => {
  const { t } = useTranslation();

  return (
    <FormEditableTable<QuickPaymentTableType>
      name="data"
      columns={[
        {
          accessor: 'account',
          header: t['accountingQuickPaymentFormTableAccount'],
          cellWidth: 'auto',
        },
        {
          accessor: 'amount',
          header: t['accountingQuickPaymentFormTableAmount'],
          isNumeric: true,
        },
      ]}
    />
  );
};
