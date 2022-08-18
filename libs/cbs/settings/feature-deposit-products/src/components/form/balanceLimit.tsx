import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormInput } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

import { BoxContainer, TextBoxContainer, TopText } from '../formui';

export const BalanceLimit = () => {
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
      </InputGroupContainer>
    </BoxContainer>
  );
};
