import React from 'react';
import { Box, Text } from '@saccos/myra/ui';

import { GroupContainer, InputGroupContainer } from '../containers';
import { FormInput } from '../../newFormComponents';

export const KYMFinancialTransactionDetails = ({ control }: any) => {
  return (
    <GroupContainer>
      <Text fontSize="r1" fontWeight="SemiBold">
        FINANCIAL TRANSACTION DETAILS
      </Text>
      <Box display="flex" flexDirection="column" gap="s16">
        <InputGroupContainer>
          <FormInput
            control={control}
            type="number"
            name="financialTransactionOrdinaryShare"
            label="Ordinary Share"
            placeholder="0.00"
          />
          <FormInput
            control={control}
            type="number"
            name="financialTransactionSavings"
            label="Savings"
            placeholder="0.00"
          />
          <FormInput
            control={control}
            type="number"
            name="financialTransactionLoan"
            label="Loan"
            placeholder="0.00"
          />
          <FormInput
            control={control}
            type="number"
            name="financialTransactionOthers"
            label="Other"
            placeholder="0.00"
          />
        </InputGroupContainer>
      </Box>
    </GroupContainer>
  );
};
