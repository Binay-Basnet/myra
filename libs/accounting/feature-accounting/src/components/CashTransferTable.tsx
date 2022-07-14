import { FormEditableTable } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

type CashTransferTableType = {
  transferred_to: string;
  amount: string;
};

export const CashTransferTable = () => {
  const { t } = useTranslation();

  return (
    <FormEditableTable<CashTransferTableType>
      name="data"
      columns={[
        {
          accessor: 'transferred_to',
          header: t['accountingCashTransferFormTableTransferredTo'],
          cellWidth: 'auto',
          fieldType: 'select',
        },
        {
          accessor: 'amount',
          header: t['accountingCashTransferFormTableAmount'],
          isNumeric: true,
        },
      ]}
    />
  );
};
