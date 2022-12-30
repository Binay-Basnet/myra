import React from 'react';
import { useFormContext } from 'react-hook-form';

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
    from: number;
  };
  size: '7*3.5' | '9*3' | '7.5*3.5';
}

export const WithdrawSlipBookPrintCard = React.forwardRef<
  HTMLInputElement,
  IWithdrawSlipBookPrintCardProps
>(({ branchPosition, accountPosition, slipNumberPosition, details, size }, ref) => {
  const methods = useFormContext();
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

  const numberOfSlips = methods.watch('count');
  const slipNumberArray = Array.from(Array(numberOfSlips).keys())?.map((n) => n + 1);

  return (
    <Box ref={ref} display="flex" flexDir="column">
      {slipNumberArray?.map((number) => (
        <Box
          // height={height}
          // width={width}
          w={getPrintProps(size)?.pageSize?.split(' ')[0]}
          h={getPrintProps(size)?.pageSize?.split(' ')[1]}
          key={number}
          display="none"
          position="relative"
          bg="white"
          opacity="0.9"
          sx={{
            pageBreakAfter: number && number % 2 === 0 ? 'always' : 'avoid',
            '@media print': {
              display: 'flex',
            },
            '@page': {
              size: 'A4 landscape',
            },
          }}
        >
          <Text
            fontSize="s1"
            fontWeight={500}
            color="black"
            top={branchPosition.top}
            left={branchPosition.left}
            position="absolute"
          >
            {details?.branch}
          </Text>
          <Box
            top={accountPosition.top}
            left={accountPosition.left}
            display="flex"
            flexDirection="column"
            gap="s4"
            position="absolute"
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
            {String(details.from + number - 1).padStart(10, '0')}
          </Text>
        </Box>
      ))}
    </Box>
  );
});
