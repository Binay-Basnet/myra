import { useFormContext } from 'react-hook-form';

import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormInput, FormSwitchTab } from '@coop/shared/form';
import { Box } from '@coop/shared/ui';

import { BoxContainer, SubHeadingText, SubText, TextBoxContainer, TopText } from '../formui';

const depositFrequencyOptions = [
  {
    label: 'Daily',
    value: 'Daily',
  },
  {
    label: 'Weekly',
    value: 'Weekly',
  },
  {
    label: 'Monthly',
    value: 'Monthly',
  },
  {
    label: 'Yearly',
    value: 'Yearly',
  },
];

const enableSwitch = [
  {
    label: 'Enable',
    value: true,
  },
  {
    label: 'Disable',
    value: false,
  },
];

const DepositFrequency = () => {
  const { watch } = useFormContext();
  const penalty = watch('enablePenalty');
  const rebate = watch('enableRebate');
  return (
    <BoxContainer>
      <TextBoxContainer>
        <TopText>Deposit Frequency</TopText>
        <SubText>
          Select deposit frequency. Further details have to be added during account opening.
        </SubText>
      </TextBoxContainer>
      <FormSwitchTab name="depositFrequency" options={depositFrequencyOptions} />
      <Box display="flex" justifyContent="space-between">
        <TextBoxContainer>
          <SubHeadingText>Penalty</SubHeadingText>
          <SubText>Enter Penalty details.</SubText>
        </TextBoxContainer>
        <FormSwitchTab name="enablePenalty" options={enableSwitch} />
      </Box>
      {penalty && (
        <BoxContainer p="s16" border="1px solid" borderColor="border.layout" borderRadius="4px">
          <InputGroupContainer>
            <FormInput name="dayFromTheEndPenalty" type="number" label="Day from end date" />
            <FormInput name="minimumAmount" type="number" label="Minimum Amount" />
            <FormInput name="flatRatePenalty" type="number" label="Flat-rate Penalty" />
            <FormInput
              name="penaltyPercentage"
              type="number"
              label="Penalty"
              textAlign="right"
              rightElement="%"
            />
            <FormInput
              name="penaltyAmount"
              type="number"
              label="Penalty Amount"
              textAlign="right"
            />
          </InputGroupContainer>
        </BoxContainer>
      )}
      <Box display="flex" justifyContent="space-between">
        <TextBoxContainer>
          <SubHeadingText>Rebate</SubHeadingText>
          <SubText>Enter Rebate details.</SubText>
        </TextBoxContainer>
        <FormSwitchTab name="enableRebate" options={enableSwitch} />
      </Box>
      {rebate && (
        <BoxContainer p="s16" border="1px solid" borderColor="border.layout" borderRadius="4px">
          <InputGroupContainer>
            <FormInput name="dayFromTheEndRebate" type="number" label="Day from end date" />
            <FormInput name="rebateAmount" type="number" label="Rebate Amount" />

            <FormInput
              name="percentageRebate"
              type="number"
              label="Percentage of Deposited Amount"
              textAlign="right"
              rightElement="%"
            />
            <FormInput
              name="nosOfInstallment"
              type="number"
              label="No. of Installment"
              textAlign="right"
            />
          </InputGroupContainer>
        </BoxContainer>
      )}
    </BoxContainer>
  );
};

export default DepositFrequency;
