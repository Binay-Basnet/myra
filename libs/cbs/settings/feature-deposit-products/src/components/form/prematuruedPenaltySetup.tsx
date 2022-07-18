// import debounce from 'lodash/debounce';
import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormInput, FormSelect } from '@coop/shared/form';
import { Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { BoxContainer, TextBoxContainer, TopText } from '../formui';

export const PrematuredPenalty = () => {
  const { t } = useTranslation();
  return (
    <BoxContainer>
      <TextBoxContainer>
        <TopText>{t['depositProductPrematuredPenaltySetup']} </TopText>
      </TextBoxContainer>
      <InputGroupContainer>
        <FormInput
          name="efffectiveDaysFromStart"
          label={t['depositProductEffectiveDaysfromStart']}
          placeholder={t['depositProductEffectiveDaysfromStart']}
        />
        <FormInput
          name="remainingDaystoMatured"
          label={t['depositProductRemainingDaysTogetmatured']}
          placeholder={t['depositProductRemainingDaysTogetmatured']}
        />
        <FormInput
          name="penaltyRupees"
          type={'number'}
          label={t['depositProductPenaltyRs']}
          textAlign={'right'}
          placeholder="0.0"
        />
        <FormInput
          name="penaltyRate"
          label={t['depositProductPenaltyRate']}
          placeholder="0.00"
          rightElement={
            <Text fontWeight="Medium" fontSize="r1" color="primary.500">
              %
            </Text>
          }
          textAlign={'right'}
        />
        <FormSelect
          name="penaltyLedgerMapping"
          label={t['depositProductPenaltyLedgerMapping']}
          placeholder={t['depositProductPenaltyLedgerMapping']}
        />
      </InputGroupContainer>
    </BoxContainer>
  );
};
