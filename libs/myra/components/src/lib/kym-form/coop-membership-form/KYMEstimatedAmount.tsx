import React from 'react';
import { Box, Checkbox, Text } from '@coop/myra/ui';

import { GroupContainer, InputGroupContainer } from '../containers';
import { FormInput } from '../../newFormComponents';

const annualFamilyIncome = ['Upto 50', 'Upto 100', 'Upto 500', 'Above 500'];

export const KYMEstimatedAmount = ({ control }: any) => {
  return (
    <GroupContainer>
      <Text fontSize="r1" fontWeight="SemiBold">
        ESTIMATED WITHDRAW / DEPOSIT AMOUNT IN THE INSTITUTION
      </Text>

      <InputGroupContainer>
        <FormInput
          control={control}
          type="number"
          name="estimatedAnnualAccountTransactionAmount"
          label="Estimated annual account transaction (Debit/Credit)"
          placeholder="0.00"
          textAlign="right"
        />
      </InputGroupContainer>

      <Box display="flex" flexDirection="column">
        <Text fontSize="s3" mb="s16">
          Estimated no. of Annual Transaction
        </Text>
        <Box display="flex" flexDirection="column" gap="s8">
          {annualFamilyIncome.map((item, index) => (
            <Checkbox key={index}>
              <Text fontSize="s3">{item}</Text>
            </Checkbox>
          ))}
        </Box>
      </Box>

      <InputGroupContainer>
        <FormInput
          control={control}
          type="number"
          name="estimatedAnnualDepositAmount"
          label="Estimated Annual Deposit"
          placeholder="0.00"
          textAlign="right"
        />
      </InputGroupContainer>

      <InputGroupContainer>
        <FormInput
          control={control}
          type="number"
          name="estimatedAnnualLoanAmount"
          label="Estimated Annual Loan"
          placeholder="0.00"
          textAlign="right"
        />
      </InputGroupContainer>
    </GroupContainer>
  );
};
