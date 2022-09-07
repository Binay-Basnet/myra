import { FormEditableTable } from '@coop/shared/form';
import { FormSection, GridItem } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

type DormantSetupTable = {
  condition: string;
  duration: string;
};

const durationList = [
  { label: '3 months', value: '3Months' },
  { label: '6 months', value: '6Months' },
  { label: 'A year', value: 'year' },
];

const conditionList = [
  { label: 'Withdraw', value: 'Withdraw' },
  { label: 'Deposit', value: 'deposit' },
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
