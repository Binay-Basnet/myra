import { GridItem } from '@myra-ui';

import { COASelectModal } from '@coop/shared/components';
import { FormEditableTable } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

type AllowChequeTable = {
  serviceName: string;
  ledgerName: string;
  amount: number;
};

export const AllowChequeIssue = () => {
  const { t } = useTranslation();

  const chequeList = [{ label: 'Cheque issue charge', value: 'Cheque issue charge' }];

  return (
    <GridItem mt="s32" colSpan={3}>
      <FormEditableTable<AllowChequeTable>
        name="chequeCharge"
        debug={false}
        columns={[
          {
            accessor: 'serviceName',
            header: t['depositProductAccServiceTableServiceName'],
            cellWidth: 'auto',
            fieldType: 'search',
            searchOptions: chequeList,
          },
          {
            accessor: 'ledgerName',
            header: t['depositProductAccServiceTableLedgerName'],
            cellWidth: 'auto',
            fieldType: 'modal',
            modal: COASelectModal,
          },
          {
            accessor: 'amount',
            header: t['depositProductAccServiceTableAmount'],
            cellWidth: 'auto',
            isNumeric: true,
          },
        ]}
      />
    </GridItem>
  );
};
