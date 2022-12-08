import { GridItem } from '@myra-ui';

import { COASelectModal } from '@coop/shared/components';
import { FormEditableTable } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

type AtmFacilityTable = {
  serviceName: string;
  ledgerName: string;
  amount: number;
};

export const AtmFacility = () => {
  const { t } = useTranslation();

  const atmList = [{ label: 'Atm charge', value: 'Atm charge' }];

  return (
    <GridItem mt="s32" colSpan={3}>
      <FormEditableTable<AtmFacilityTable>
        name="atmCharge"
        debug={false}
        columns={[
          {
            accessor: 'serviceName',
            header: t['depositProductAccServiceTableServiceName'],
            cellWidth: 'auto',
            fieldType: 'search',
            searchOptions: atmList,
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
