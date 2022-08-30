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
        <TopText>{t['loanProductLoanAmountLimit']}</TopText>
      </TextBoxContainer>
      <InputGroupContainer>
        <FormInput
          textAlign={'right'}
          name="minimumLoanAmount"
          label={t['loanProductMinimumAmount']}
          __placeholder="0.00"
        />
        <FormInput
          textAlign={'right'}
          name="maxLoanAmount"
          label={t['loanProductMaximumAmount']}
          __placeholder="0.00"
        />
      </InputGroupContainer>
    </BoxContainer>
  );
};
