import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormSelect } from '@coop/shared/form';

import { BoxContainer, SubText, TextBoxContainer, TopText } from '../formui';

export const DefaultAccount = () => (
  <BoxContainer>
    <TextBoxContainer>
      <TopText>Default Amount Deposit Account Name</TopText>
      <SubText>
        If the member does not specify particular account for deposit, this mapped account will be
        set globally. Normally this is a compulsory account type.
      </SubText>
    </TextBoxContainer>
    <InputGroupContainer>
      <FormSelect name="defaultDepositAccount" label="Account Type" />
    </InputGroupContainer>
  </BoxContainer>
);
