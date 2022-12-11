import { ComponentProps } from 'react';
import { Box } from '@chakra-ui/react';

type TopButtonWrapperProps = ComponentProps<'div'>;

export const TopButtonWrapper = (props: TopButtonWrapperProps) => (
  <Box
    w="s32"
    h="s32"
    display="flex"
    alignItems="center"
    justifyContent="center"
    flexShrink={0}
    cursor="pointer"
    bg="gray.50"
    borderRadius="br1"
    _hover={{ bg: 'gray.100' }}
    {...props}
  />
);
