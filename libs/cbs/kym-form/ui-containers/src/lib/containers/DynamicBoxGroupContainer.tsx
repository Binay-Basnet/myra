import React from 'react';
import { BiTrashAlt } from 'react-icons/bi';

import { Box, BoxProps, Icon } from '@myra-ui';

interface IGroupContainer extends BoxProps {
  children?: React.ReactNode;
}

export const DynamicBoxGroupContainer = ({ children, ...rest }: IGroupContainer) => (
  <Box
    flexShrink={0}
    display="grid"
    gridTemplateColumns="repeat(3, 1fr)"
    gap="s16"
    p="s12"
    bg="highlight.500"
    border="1px"
    borderRadius="br2"
    borderColor="border.layout"
    overflow="hidden"
    w="calc(100% - 3rem)"
    {...rest}
  >
    {children}
  </Box>
);

export const KYMRemoveButton = (props: IGroupContainer) => (
  <Box
    h="s36"
    w="s36"
    borderRadius="br2"
    bg="danger.0"
    color="danger.500"
    flexShrink={0}
    display="flex"
    alignItems="center"
    justifyContent="center"
    cursor="pointer"
    _hover={{
      bg: 'danger.100',
    }}
    {...props}
  >
    <Icon as={BiTrashAlt} size="lg" />
  </Box>
);
