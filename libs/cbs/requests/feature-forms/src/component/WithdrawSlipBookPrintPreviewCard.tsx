import React from 'react';
import { useFormContext } from 'react-hook-form';

import { Box, Text } from '@myra-ui';

interface IWithdrawSlipBookPrintPreviewCardProps {
  height: number;
  width: number;
  branchPosition:
    | { top?: number | undefined | null; left?: number | undefined | null }
    | undefined
    | null;
  accountPosition:
    | { top?: number | undefined | null; left?: number | undefined | null }
    | undefined
    | null;
  slipNumberPosition:
    | { top?: number | undefined | null; left?: number | undefined | null }
    | undefined
    | null;
  details: {
    branch: string;
    memberName: string;
    accountNumber: string;
    accountName: string;
    slipNumber: string;
    memberCode: string;
    productName: string;
  };
  number?: number;
}

export const WithdrawSlipBookPrintPreviewCard = ({
  height,
  width,
  branchPosition,
  accountPosition,
  slipNumberPosition,
  details,
  number,
}: IWithdrawSlipBookPrintPreviewCardProps) => (
  <Box
    height={`${height}in`}
    width={`${width}in`}
    bg="white"
    boxShadow="E2"
    position="relative"
    fontWeight={700}
    letterSpacing="1px"
    sx={{
      pageBreakAfter: number && number % 2 === 0 ? 'always' : 'avoid',
      '@media print': {
        display: 'flex',
        boxShadow: 'none',
      },
      '@page': {
        resolution: '360dpi',
        size: 'A4 landscape',
      },
    }}
  >
    <Text
      fontSize="r1"
      color="black"
      position="absolute"
      top={`${branchPosition?.top || 0}mm`}
      left={`${branchPosition?.left || 0}mm`}
      fontFamily="Roboto-Bold"
      textTransform="uppercase"
    >
      {details?.branch}
    </Text>
    <Box
      position="absolute"
      top={`${accountPosition?.top || 0}mm`}
      left={`${accountPosition?.left || 0}mm`}
      display="flex"
      flexDirection="column"
      gap="s4"
    >
      <Text fontSize="r1" color="black" fontFamily="Roboto-Bold" textTransform="uppercase">
        {`${details?.memberName} (${details?.memberCode})`}
      </Text>
      <Text fontSize="r1" color="black" fontFamily="Roboto-Bold" textTransform="uppercase">
        {details?.accountNumber}
      </Text>
      <Text fontSize="r1" color="black" fontFamily="Roboto-Bold" textTransform="uppercase">
        {details?.productName}
      </Text>
    </Box>

    <Text
      fontSize="r1"
      color="black"
      position="absolute"
      bottom={`${slipNumberPosition?.top || 0}mm`}
      left={`${slipNumberPosition?.left || 0}mm`}
      fontFamily="Roboto-Bold"
      textTransform="uppercase"
    >
      {details?.slipNumber}
    </Text>
  </Box>
);

export const WithdrawPrintCard = React.forwardRef<
  HTMLInputElement,
  IWithdrawSlipBookPrintPreviewCardProps
>((props, ref) => {
  const methods = useFormContext();

  const numberOfSlips = methods.watch('count');

  const slipNumberArray = Array.from(Array(numberOfSlips).keys())?.map((n) => n + 1);

  return (
    <Box ref={ref} display="flex" flexDir="column">
      {slipNumberArray?.map((number) => (
        <WithdrawSlipBookPrintPreviewCard
          {...props}
          number={number}
          details={{
            ...props.details,
            slipNumber: String(Number(props.details.slipNumber) + number - 1).padStart(10, '0'),
          }}
        />
      ))}
    </Box>
  );
});
