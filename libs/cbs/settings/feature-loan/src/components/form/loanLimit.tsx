import React from 'react';

// import debounce from 'lodash/debounce';
import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormInput, FormSelect, FormSwitchTab } from '@coop/shared/form';
import { Box, Text } from '@coop/shared/ui';

import {
  BoxContainer,
  SubHeadingText,
  SubText,
  TextBoxContainer,
  TopText,
} from '../formui';

const yesNo = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
];
export const LoanLimit = () => {
  return (
    <BoxContainer>
      <TextBoxContainer>
        <TopText>Loan Limit</TopText>
      </TextBoxContainer>
      <InputGroupContainer>
        <FormInput
          name="maxLoanPerMember"
          type="number"
          label="Maximum Loan Per Member"
          textAlign={'right'}
          placeholder="0.00"
          //   rightElement={'%'}
        />
        <FormInput
          name="loanProvisionTreatment"
          type="number"
          label="Loan Provision Treatment"
          // textAlign={'right'}
          placeholder="Enter Loan Provision Treatment"
          //   rightElement={'%'}
        />
        <FormInput
          name="loanProvisionFrequency"
          type="number"
          label="Loan Provision Frequency"
          // textAlign={'right'}
          placeholder="Loan Provision Frequency"
          //   rightElement={'%'}
        />
        <FormInput
          name="ceoAuthenticationRate"
          type="number"
          label="Schedule Change Override"
          // textAlign={'right'}
          placeholder="Schedule Change Override"
          //   rightElement={'%'}
        />
      </InputGroupContainer>
    </BoxContainer>
  );
};
