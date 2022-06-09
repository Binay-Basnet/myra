import React from 'react';
import { Box, Text } from '@coop/myra/ui';

import { GroupContainer, InputGroupContainer } from '../containers';
import { FormInput } from '../../newFormComponents';

export const KYMFinancialTransactionDetails = ({ control }: any) => {
  return (
    <GroupContainer>
      <Text fontSize="r1" fontWeight="SemiBold">
        FINANCIAL TRANSACTION DETAILS
      </Text>

      <Box display="flex" flexDirection="column" gap="s16">
        <Text fontSize={'s3'} fontWeight="500" color="gray.700">
          Details of the amount initially deposited in the instituion or
          deposited till now
        </Text>
        <InputGroupContainer>
          <FormInput
            control={control}
            type="number"
            name="share"
            textAlign="right"
            label="Ordinary Share"
            placeholder="0.00"
          />
          <FormInput
            control={control}
            type="number"
            name="savings"
            label="Savings"
            textAlign="right"
            placeholder="0.00"
          />
          <FormInput
            control={control}
            type="number"
            name="loan"
            label="Loan"
            textAlign="right"
            placeholder="0.00"
          />
          <FormInput
            control={control}
            type="number"
            name="other"
            label="Other"
            textAlign="right"
            placeholder="0.00"
          />
        </InputGroupContainer>
      </Box>
    </GroupContainer>
  );
};
