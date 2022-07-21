import { FormEditableTable } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

type JournalVouchersTableType = {
  transferred_to: string;
  dr_amount: string;
  cr_amount: string;
};

export const JournalVouchersTable = () => {
  const { t } = useTranslation();

  return (
    <FormEditableTable<JournalVouchersTableType>
      name="data"
      columns={[
        {
          accessor: 'transferred_to',
          header: t['accountingJournalVouchersFormTableTransferredTo'],
          cellWidth: 'auto',
          fieldType: 'select',
          selectOptions: [
            {
              label: 'Savings Account',
              value: 'savings_account',
            },
            {
              label: 'Current Account',
              value: 'current_account',
            },
          ],
        },
        {
          accessor: 'dr_amount',
          header: t['accountingJournalVouchersFormTableDRAmount'],
          isNumeric: true,
        },
        {
          accessor: 'cr_amount',
          header: t['accountingJournalVouchersFormTableCRAmount'],
          isNumeric: true,
        },
      ]}
    />
  );
};
