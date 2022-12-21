import { FormSection, GridItem } from '@myra-ui';

import { DormantCondition, DormantDuration } from '@coop/cbs/data-access';
import { FormEditableTable } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

type DormantSetupTable = {
  condition: string;
  duration: string;
};

const durationList = [
  { label: '1 Day', value: DormantDuration.Day },
  { label: '1 month', value: DormantDuration.Month },
  { label: '3 months', value: DormantDuration.Quarter },
  { label: '6 months', value: DormantDuration.HalfYear },
  { label: '1 year', value: DormantDuration.Year },
  { label: '2 years', value: DormantDuration.TwoYear },
];

const conditionList = [
  { label: 'Withdraw', value: DormantCondition.Withdraw },
  { label: 'Deposit', value: DormantCondition.Deposit },
];

export const DormantSetup = () => {
  const { t } = useTranslation();

  return (
    <FormSection header="depositProductDormantSetup">
      <GridItem colSpan={3}>
        <FormEditableTable<DormantSetupTable>
          name="dormantSetup"
          debug={false}
          columns={[
            {
              accessor: 'condition',
              header: t['depositProductCondition'],
              fieldType: 'select',
              cellWidth: 'auto',
              selectOptions: conditionList,
            },
            {
              accessor: 'duration',
              header: t['depositProductDuration'],
              fieldType: 'select',
              cellWidth: 'auto',
              selectOptions: durationList,
            },
          ]}
        />
      </GridItem>
    </FormSection>
  );
};
