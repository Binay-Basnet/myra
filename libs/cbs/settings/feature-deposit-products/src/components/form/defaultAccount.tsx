// import debounce from 'lodash/debounce';
import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormSelect } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

import { BoxContainer, SubText, TextBoxContainer, TopText } from '../formui';

export const DefaultAccountName = () => {
  const { t } = useTranslation();
  return (
    <BoxContainer>
      <TextBoxContainer>
        <TopText>{t['depositProductDefaultAmountDepositAccountName']} </TopText>
        <SubText>{t['depositProductIf']}</SubText>
      </TextBoxContainer>
      <InputGroupContainer>
        <FormSelect
          name="accountType"
          label={t['depositProductAccountType']}
          __placeholder={t['depositProductSelectAccount']}
        />
      </InputGroupContainer>
    </BoxContainer>
  );
};
