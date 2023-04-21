import { FormSection } from '@myra-ui/templates';

import { useGetAllAccountingTaxesQuery } from '@coop/cbs/data-access';
import { COASelectModal } from '@coop/shared/components';
import { FormEditableTable } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

type ExpensesTableType = {
  accountId?: string;
  tax: string;
  amount: string;
};

export const ExpensesTable = () => {
  const { t } = useTranslation();

  const { data: taxData } = useGetAllAccountingTaxesQuery();

  const taxDataOptions = taxData?.settings?.general?.accounting?.taxRates?.map((data) => ({
    label: `${data?.name} - ${data?.rate}`,
    value: data?.id as string,
  }));

  return (
    <FormSection flexLayout>
      <FormEditableTable<ExpensesTableType>
        name="transferredLedgers"
        columns={[
          {
            accessor: 'accountId',
            header: t['accountingExpensesFormTableTransferredTo'],
            cellWidth: 'auto',
            fieldType: 'modal',
            modal: COASelectModal,
          },
          {
            accessor: 'tax',
            header: t['accountingExpensesFormTableTax'],
            cellWidth: 'auto',
            fieldType: 'select',
            selectOptions: taxDataOptions,
          },
          {
            accessor: 'amount',
            header: t['accountingExpensesFormTableAmount'],
            isNumeric: true,
            cellWidth: 'auto',
          },
        ]}
      />
    </FormSection>
  );
};
