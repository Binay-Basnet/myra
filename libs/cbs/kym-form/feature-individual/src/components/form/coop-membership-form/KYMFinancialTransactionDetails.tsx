import React from 'react';

import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { useGetIndividualKymOptionQuery } from '@coop/shared/data-access';
import { FormInput } from '@coop/shared/form';
import { Box, Text } from '@coop/shared/ui';

export const KYMFinancialTransactionDetails = () => {
  const {
    data: financialTransactionDetailsData,
    isLoading: financialTransactionLoading,
  } = useGetIndividualKymOptionQuery({
    fieldName: 'financial_transaction_details',
  });

  return (
    <GroupContainer
      id="Financial Transaction Details"
      scrollMarginTop={'200px'}
    >
      <Text fontSize="r1" fontWeight="SemiBold">
        FINANCIAL TRANSACTION DETAILS
      </Text>

      <Box display="flex" flexDirection="column" gap="s16">
        <Text fontSize={'s3'} fontWeight="500" color="gray.700">
          Details of the amount initially deposited in the instituion or
          deposited till now
        </Text>
        <InputGroupContainer>
          {financialTransactionDetailsData?.members?.individual?.options.list?.data?.[0]?.options?.map(
            (option) => (
              <FormInput
                type="number"
                name={String(option?.name?.local)}
                textAlign="right"
                label={option?.name.local}
                placeholder="0.00"
              />
            )
          )}
        </InputGroupContainer>
      </Box>
    </GroupContainer>
  );
};
