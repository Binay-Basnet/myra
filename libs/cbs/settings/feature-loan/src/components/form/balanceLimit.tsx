// import debounce from 'lodash/debounce';
import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormInput } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

import { BoxContainer, TextBoxContainer, TopText } from '../formui';

export const AmountLimit = () => {
  const { t } = useTranslation();
  return (
    <BoxContainer>
      <TextBoxContainer>
        <TopText>{t['loanProductMaxinumTenure']}</TopText>
      </TextBoxContainer>
      <InputGroupContainer>
        <FormInput
          textAlign={'right'}
          name="minimunBalaneAmount"
          label={t['loanProductMinimumAmount']}
          placeholder="0.00"
        />
        <FormInput
          textAlign={'right'}
          name="maximumBalaneAmount"
          label={t['loanProductMaximumAmount']}
          placeholder="0.00"
        />
      </InputGroupContainer>
    </BoxContainer>
  );
};
