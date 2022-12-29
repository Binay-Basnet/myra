import React from 'react';

import { Box, Text } from '@myra-ui';

interface IWithdrawSlipBookPrintCardProps {
  height: string;
  width: string;
  branchPosition: { top: string; left: string };
  accountPosition: { top: string; left: string };
  slipNumberPosition: { top: string; left: string };
  details: {
    branch: string;
    memberName: string;
    accountNumber: string;
    accountName: string;
    slipNumber: string;
  };
}

export const WithdrawSlipBookPrintCard = React.forwardRef<
  HTMLInputElement,
  IWithdrawSlipBookPrintCardProps
>(({ height, width, branchPosition, accountPosition, slipNumberPosition, details }, ref) => (
  <Box
    height={height}
    width={width}
    bg="white"
    boxShadow="E2"
    position="relative"
    ref={ref}
    sx={{
      '@media print': {
        display: 'flex',
      },
      '@page': {
        size: 'A4 portrait',
      },
    }}
  >
    <Text
      fontSize="s1"
      fontWeight={500}
      color="black"
      position="absolute"
      top={branchPosition.top}
      left={branchPosition.left}
    >
      {details?.branch}
    </Text>
    <Box
      position="absolute"
      top={accountPosition.top}
      left={accountPosition.left}
      display="flex"
      flexDirection="column"
      gap="s4"
    >
      <Text fontSize="s1" fontWeight={500} color="black">
        {details?.memberName}
      </Text>
      <Text fontSize="s1" fontWeight={500} color="black">
        {details?.accountNumber}
      </Text>
      <Text fontSize="s1" fontWeight={500} color="black">
        {details?.accountName}
      </Text>
    </Box>

    <Text
      fontSize="s1"
      fontWeight={500}
      color="black"
      position="absolute"
      top={slipNumberPosition.top}
      left={slipNumberPosition.left}
    >
      {details?.slipNumber}
    </Text>
  </Box>
));
