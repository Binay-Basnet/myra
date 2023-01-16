import React from 'react';

import { Box, Text } from '@myra-ui';

interface IPrintBlockProps {
  posTop: number | null | undefined;
  posLeft: number | null | undefined;
  label: React.ReactNode;
  borderColor?: string;
  origin?: 'bottom' | 'top';
}

export const WithdrawSlipPrintBlock = ({
  posTop = 0,
  posLeft = 0,
  label,
  origin = 'top',
  borderColor = 'primary.400',
}: IPrintBlockProps) => {
  if (!posTop || !posLeft) {
    return null;
  }

  return (
    <>
      <Box
        bg="transparent"
        position="absolute"
        borderBottom={origin === 'top' ? '1px dashed' : '0'}
        borderRight="1px dashed"
        borderTop={origin === 'bottom' ? '1px dashed' : '0'}
        borderColor={borderColor}
        height={`${posTop}mm`}
        width={`${posLeft}mm`}
        bottom={origin === 'bottom' ? 0 : undefined}
      >
        <Box
          position="absolute"
          px="s8"
          py="s4"
          top={origin === 'top' ? `${(posTop || 0) / 2}mm` : undefined}
          bottom={origin === 'bottom' ? `${(posTop || 0) / 2}mm` : undefined}
          left={`${(posLeft || 0) - 7}mm`}
          border="1px solid"
          borderColor="border.layout"
          borderRadius="br2"
          bg="white"
          transform={origin === 'bottom' ? 'translate(0%, 50%)' : 'translate(0%, -50%)'}
        >
          <Text
            fontSize="s1"
            color="gray.800"
            fontWeight="500"
            lineHeight="125%"
            whiteSpace="nowrap"
          >
            {posTop} mm
          </Text>
        </Box>
        <Box
          position="absolute"
          px="s8"
          py="s4"
          top={origin === 'top' ? `${posTop || 0}mm` : undefined}
          bottom={origin === 'bottom' ? `${posTop || 0}mm` : undefined}
          left={`${(posLeft || 0) / 2}mm`}
          border="1px solid"
          borderColor="border.layout"
          borderRadius="br2"
          bg="white"
          transform={origin === 'bottom' ? 'translate(-50%, 50%)' : 'translate(-50%, -50%)'}
        >
          <Text
            fontSize="s1"
            color="gray.800"
            fontWeight="500"
            lineHeight="125%"
            whiteSpace="nowrap"
          >
            {posLeft} mm
          </Text>
        </Box>
      </Box>
      <Text
        as="div"
        position="absolute"
        top={origin === 'top' ? `${posTop}mm` : undefined}
        bottom={origin === 'bottom' ? `${posTop}mm` : undefined}
        left={`${posLeft}mm`}
        fontSize="s1"
        color="#000"
        fontWeight="500"
        lineHeight="125%"
      >
        {label}
      </Text>
    </>
  );
};
