// import debounce from 'lodash/debounce';
import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormInput, FormSwitchTab } from '@coop/shared/form';
import { Box, Text } from '@coop/shared/ui';

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
              placeholder="Day from end date"
            />
            <FormInput
              name="minimumAmount"
              type="number"
              label="Minimum Amount"
              placeholder="Minimum Amount"
            />
            <FormInput
              name="flatRatePenalty"
              type="number"
              label="Flat-rate Penalty"
              placeholder="Flat-rate penalty"
            />
            <FormInput
              name="penaltyPercentage"
              type="number"
              label="Penalty"
              textAlign={'right'}
              placeholder="0.00"
              rightElement={
                <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                  %
                </Text>
              }
            />
            <FormInput
              name="penaltyAmount"
              type="number"
              label="Penalty Amount"
              placeholder="Penalty Amount"
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
              placeholder="Day from end date"
            />
            <FormInput
              name="rebateAmount"
              type="number"
              label="Rebate Amount"
              placeholder="Rebate Amount"
            />

            <FormInput
              name="percentageRebate"
              type="number"
              label="Percentage of Deposited Amount"
              textAlign={'right'}
              placeholder="0.00"
              rightElement={
                <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                  %
                </Text>
              }
            />
            <FormInput
              name="nosOfInstallment"
              type="number"
              label="No. of Installment"
              placeholder="0"
              helperText="Enter Number of Installments"
              textAlign={'right'}
            />
          </InputGroupContainer>
        </BoxContainer>
      )}
    </BoxContainer>
  );
};
