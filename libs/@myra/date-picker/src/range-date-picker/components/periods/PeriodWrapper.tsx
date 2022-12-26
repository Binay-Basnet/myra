import React from 'react';
import { Box } from '@chakra-ui/react';

interface IPeriodWrapperProps extends React.ComponentProps<'div'> {
  isSelected?: boolean;
  title: string;
}

export const PeriodWrapper = ({ isSelected = false, title, ...rest }: IPeriodWrapperProps) => (
  <Box
    w="100%"
    _hover={{
      bg: 'gray.100',
    }}
    color="gray.700"
    borderRadius="br2"
    px="s8"
    h="s40"
    bg={isSelected ? 'gray.100' : 'transparent'}
    fontSize="r1"
    display="flex"
    alignItems="center"
    cursor="pointer"
    {...rest}
  >
    {title}
  </Box>
);
