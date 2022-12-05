import { FormSection, GridItem } from '@myra-ui';

import { FormEditableTable } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

type AccountServiceTable = {
  serviceName: string;
  ledgerName: string;
  amount: number;
};

export const Institution = () => {
  const { t } = useTranslation();
  return (
    <FormSection>
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
