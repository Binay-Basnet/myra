import { useFormContext } from 'react-hook-form';

// import debounce from 'lodash/debounce';
import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormSelect, FormSwitchTab } from '@coop/shared/form';
import { Box } from '@coop/shared/ui';

import { BoxContainer, SubHeadingText, TopText } from '../formui';
const loanschemeOptions = [
  { label: 'EPI', value: 'epi' },
  { label: 'EMI', value: 'emi' },
  { label: 'Flat', value: 'flat' },
];
const YesNoOptions = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
];

export const LoanRepaymentScheme = () => {
  const { watch } = useFormContext();
  const loanScheme = watch('loanRepaymentScheme');

  return (
    <BoxContainer>
      <Box
        display={'flex'}
        flexDirection="row"
        justifyContent={'space-between'}
      >
        <TopText>Loan Repayment Scheme</TopText>
        <FormSwitchTab name="loanRepaymentScheme" options={loanschemeOptions} />
      </Box>
      <InputGroupContainer>
        {loanScheme && (loanScheme === 'epi' || loanScheme === 'emi') && (
          <FormSelect
            name="modeOfPayment"
            label="Mode of Payment"
            placeholder="Select Mode of Payment"
            // options={loanschemeOptions}
          />
        )}

        <FormSelect
          name="installmentType"
          label="Installment Type"
          placeholder="Select Installment Type"
        />
      </InputGroupContainer>
      <Box
        display={'flex'}
        flexDirection="row"
        justifyContent={'space-between'}
        alignItems="center"
        pt="s16"
      >
        <SubHeadingText>Allow Partial Installment</SubHeadingText>
        <FormSwitchTab name="allowPartialInstallment" options={YesNoOptions} />
      </Box>
      <Box
        display={'flex'}
        flexDirection="row"
        justifyContent={'space-between'}
        alignItems="center"
        pt="s16"
      >
        <SubHeadingText>Is Monthly Interest Compulsory</SubHeadingText>
        <FormSwitchTab
          name="monthlyInterestCompulsory"
          options={YesNoOptions}
        />
      </Box>
    </BoxContainer>
  );
};
