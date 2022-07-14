import { FormEditableTable } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

type QuickReceiptTableType = {
  account: string;
  amount: string;
};

export const QuickReceiptTable = () => {
  const { t } = useTranslation();

  return (
    <FormEditableTable<QuickReceiptTableType>
      name="data"
      columns={[
        {
          accessor: 'account',
          header: t['accountingQuickReceiptFormTableAccount'],
          cellWidth: 'auto',
        },
        {
          accessor: 'amount',
          header: t['accountingQuickReceiptFormTableAmount'],
          isNumeric: true,
        },
      ]}
    />
  );
};
