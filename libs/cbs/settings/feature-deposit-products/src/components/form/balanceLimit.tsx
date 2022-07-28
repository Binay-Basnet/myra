import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormInput } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

import { BoxContainer, TextBoxContainer, TopText } from '../formui';

export const BalanceLimit = () => {
  const [rightElement, setRightElement] = useState('days');
  const { resetField, watch } = useFormContext();

  const frequencyUnit = watch('frequencyUnit');

  useEffect(() => {
    resetField('unitDays');
    setRightElement(frequencyUnit);
  }, [frequencyUnit]);

  const { t } = useTranslation();

  return (
    <BoxContainer>
      <TextBoxContainer>
        <TopText>{t['depositProductBalanceLimit']}</TopText>
      </TextBoxContainer>
      <InputGroupContainer>
        <FormInput
          name="balanceLimit.minAmount"
          label={t['depositProductMinimumAmount']}
          placeholder={t['depositProductEnterMinimumAmount']}
        />
        <FormInput
          name="balanceLimit.maxAmount"
          label={t['depositProductMaximumAmount']}
          placeholder={t['depositProductEnterMaximumAmount']}
        />
        <FormInput
          name="balanceLimit.avgAmount"
          label={t['depositProductAverage']}
          placeholder={t['depositProductAverage']}
        />
      </InputGroupContainer>
    </BoxContainer>
  );
};
