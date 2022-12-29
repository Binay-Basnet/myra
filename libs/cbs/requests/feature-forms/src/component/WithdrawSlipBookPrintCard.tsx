import React from 'react';

import { Box, Text } from '@myra-ui';

interface IWithdrawSlipBookPrintCardProps {
  // height: string;
  // width: string;
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
  size: '7*3.5' | '9*3' | '7.5*3.5';
}

export const WithdrawSlipBookPrintCard = React.forwardRef<
  HTMLInputElement,
  IWithdrawSlipBookPrintCardProps
>(({ branchPosition, accountPosition, slipNumberPosition, details, size }, ref) => {
  const getPrintProps = (pageSize: '7*3.5' | '9*3' | '7.5*3.5') => {
    switch (pageSize) {
      case '7*3.5':
        return { pageSize: '7in 3.5in' };

      case '9*3':
        return { pageSize: '9in 3in' };

      case '7.5*3.5':
        return { pageSize: '7.5in 3.5in' };

      default:
        return { pageSize: '7in 3.5in' };
    }
  };

  return (
    <Box
      // height={height}
      // width={width}
      bg="transparent"
      position="relative"
      ref={ref}
      display="none"
      sx={{
        '@media print': {
          display: 'block',
        },
        '@page': {
          size: getPrintProps(size),
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
  );
});
