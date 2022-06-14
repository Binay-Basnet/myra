import React from 'react';
import { Box, Text } from '@coop/shared/ui';

type loanCardProps = {
  accountName: string;
  accNum: string;
  amount: string;
  intrestRate: string;
};

export const LoanCard = (cardItem: loanCardProps) => {
  return (
    <Box
      p="s16"
      borderRadius="br3"
      border="1px solid"
      borderColor="border.layout"
      display="flex"
      justifyContent="space-between"
    >
      <Box>
        <Text color="primary.500" fontWeight="SemiBold" fontSize="r1">
          {cardItem.accountName}
        </Text>
        <Text
          color="neutralColorLight.Gray-70"
          fontWeight="Regular"
          fontSize="s3"
        >
          {cardItem.accNum}
        </Text>
      </Box>

      <Box>
        <Text
          color="neutralColorLight.Gray-80"
          fontWeight="Medium"
          fontSize="r2"
        >
          {cardItem.amount}
        </Text>
        <Text
          color="neutralColorLight.Gray-60"
          fontWeight="Regular"
          fontSize="s3"
        >
          Interest Rate: {cardItem.intrestRate}
        </Text>
      </Box>
    </Box>
  );
};
