import { GroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormEditableTable } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

import { TextBoxContainer, TopText } from '../formui';

type DormantSetupTable = {
  duration: string;
  condition: string;
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
    <GroupContainer
      scrollMarginTop={'200px'}
      display="flex"
      flexDirection={'column'}
      gap="s16"
    >
      <TextBoxContainer>
        <TopText>{t['depositProductDormantSetup']} </TopText>
      </TextBoxContainer>
      <FormEditableTable<DormantSetupTable>
        name="dormantSetup"
        debug={false}
        columns={[
          {
            accessor: 'duration',
            header: t['depositProductDuration'],
            fieldType: 'select',
            cellWidth: 'auto',
            selectOptions: durationList,
          },
          {
            accessor: 'condition',
            header: t['depositProductCondition'],
            fieldType: 'select',
            cellWidth: 'auto',
            selectOptions: conditionList,
          },
        ]}
      />
    </GroupContainer>
  );
};
