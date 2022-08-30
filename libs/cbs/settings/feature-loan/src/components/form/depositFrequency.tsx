import React from 'react';

// import debounce from 'lodash/debounce';
import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormInput, FormSwitchTab } from '@coop/shared/form';
import { Box } from '@coop/shared/ui';

import {
  BoxContainer,
  SubHeadingText,
  SubText,
  TextBoxContainer,
  TopText,
} from '../formui';
const DepositFrequencyOptions = [
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
    value: 'enable',
  },
  {
    label: 'Disable',
    value: 'disable',
  },
];
export const DepositFrequency = ({ watch }: any) => {
  const penalty = watch('enablePenalty');
  const rebate = watch('enableRebate');
  return (
    <BoxContainer>
      <TextBoxContainer>
        <TopText>Deposit Frequency</TopText>
        <SubText>
          Select deposit frequency. Further details have to be added during
          account opening.
        </SubText>
      </TextBoxContainer>
      <FormSwitchTab
        name={'depositFrequency'}
        options={DepositFrequencyOptions}
      />
      <Box display={'flex'} justifyContent="space-between">
        <TextBoxContainer>
          <SubHeadingText>Penalty</SubHeadingText>
          <SubText>Enter Penalty details.</SubText>
        </TextBoxContainer>
        <FormSwitchTab name={'enablePenalty'} options={enableSwitch} />
      </Box>
      {penalty && penalty === 'enable' && (
        <BoxContainer
          p="s16"
          border={'1px solid'}
          borderColor="border.layout"
          borderRadius={'4px'}
        >
          <InputGroupContainer>
            <FormInput
              name="dayFromTheEndPenalty"
              type="number"
              label="Day from end date"
              __placeholder="Day from end date"
            />
            <FormInput
              name="minimumAmount"
              type="number"
              label="Minimum Amount"
              __placeholder="Minimum Amount"
            />
            <FormInput
              name="flatRatePenalty"
              type="number"
              label="Flat-rate Penalty"
              __placeholder="Flat-rate penalty"
            />
            <FormInput
              name="penaltyPercentage"
              type="number"
              label="Penalty"
              textAlign={'right'}
              __placeholder="0.00"
              rightElement={'%'}
            />
            <FormInput
              name="penaltyAmount"
              type="number"
              label="Penalty Amount"
              __placeholder="Penalty Amount"
              textAlign={'right'}
            />
          </InputGroupContainer>
        </BoxContainer>
      )}
      <Box display={'flex'} justifyContent="space-between">
        <TextBoxContainer>
          <SubHeadingText>Rebate</SubHeadingText>
          <SubText>Enter Rebate details.</SubText>
        </TextBoxContainer>
        <FormSwitchTab name={'enableRebate'} options={enableSwitch} />
      </Box>
      {rebate && rebate === 'enable' && (
        <BoxContainer
          p="s16"
          border={'1px solid'}
          borderColor="border.layout"
          borderRadius={'4px'}
        >
          <InputGroupContainer>
            <FormInput
              name="dayFromTheEndRebate"
              type="number"
              label="Day from end date"
              __placeholder="Day from end date"
            />
            <FormInput
              name="rebateAmount"
              type="number"
              label="Rebate Amount"
              __placeholder="Rebate Amount"
            />

            <FormInput
              name="percentageRebate"
              type="number"
              label="Percentage of Deposited Amount"
              textAlign={'right'}
              __placeholder="0.00"
              rightElement={'%'}
            />
            <FormInput
              name="nosOfInstallment"
              type="number"
              label="No. of Installment"
              __placeholder="Enter Number of Installments"
              textAlign={'right'}
            />
          </InputGroupContainer>
        </BoxContainer>
      )}
    </BoxContainer>
  );
};
