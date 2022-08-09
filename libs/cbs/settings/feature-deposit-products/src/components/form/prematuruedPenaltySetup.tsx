// import debounce from 'lodash/debounce';
import { PrematurePenaltyDateType } from '@coop/cbs/data-access';
import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormInput, FormSelect } from '@coop/shared/form';
import { Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { BoxContainer, TextBoxContainer, TopText } from '../formui';

export const PrematuredPenalty = () => {
  const { t } = useTranslation();

  const penaltyDataType = [
    {
      label: t['depositProductEffectiveDaysFromStart'],
      value: PrematurePenaltyDateType.EffectiveDaysFromStart,
    },
    {
      label: t['depositProductRemainingDaystoGetMatured'],
      value: PrematurePenaltyDateType.RemainingDaysToGetMatured,
    },
  ];

  return (
    <BoxContainer>
      <TextBoxContainer>
        <TopText>{t['depositProductPrematuredPenaltySetup']} </TopText>
      </TextBoxContainer>
      <InputGroupContainer>
        <FormSelect
          name="prematurePenalty.penaltyDateType"
          label={t['depositProductPenaltyDateType']}
          options={penaltyDataType}
          placeholder={t['depositProductEffectiveDaysfromStart']}
        />
        <FormInput
          name="prematurePenalty.noOfDays"
          label={t['depositProductNumberofDays']}
          placeholder={t['depositProductNoofdays']}
        />
        <FormSelect
          name="prematurePenalty.penaltyLedgerMapping"
          label={t['depositProductPenaltyLedgerMapping']}
          placeholder={t['depositProductPenaltyLedgerMapping']}
          options={[
            {
              label: 'Option 1',
              value: 'option1',
            },
            {
              label: 'Option 2',
              value: 'option2',
            },
            {
              label: 'Option 3',
              value: 'option3',
            },
          ]}
        />
        <FormInput
          name="prematurePenalty.penaltyAmount"
          type={'number'}
          label={t['depositProductPenaltyRs']}
          textAlign={'right'}
          placeholder="0"
        />
        <FormInput
          name="prematurePenalty.penaltyRate"
          label={t['depositProductPenaltyRate']}
          placeholder="0.00"
          rightElement={
            <Text fontWeight="Medium" fontSize="r1" color="primary.500">
              %
            </Text>
          }
          textAlign={'right'}
        />
      </InputGroupContainer>
    </BoxContainer>
  );
};
