import { FormSection, GridItem } from '@myra-ui';

import { COASelectModal } from '@coop/shared/components';
import { FormEditableTable } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

type AccountServiceTable = {
  serviceName: string;
  ledgerName: string;
  amount: number;
};

export const AccountOpenServices = () => {
  const { t } = useTranslation();

  return (
    <FormSection
      header="depositProductAccountOpenServiceCharge"
      subHeader="depositProductAdddifferentservicecharges"
    >
      <GridItem colSpan={3}>
        <FormEditableTable<AccountServiceTable>
          name="serviceCharge"
          debug={false}
          columns={[
            {
              accessor: 'serviceName',
              header: t['depositProductAccServiceTableServiceName'],
              cellWidth: 'auto',
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
    </FormSection>
  );
};
