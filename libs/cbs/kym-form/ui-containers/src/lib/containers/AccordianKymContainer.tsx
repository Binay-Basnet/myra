import React from 'react';
import { BoxProps } from '@chakra-ui/react';
import { Box } from '@coop/shared/ui';

interface IGroupContainer extends BoxProps {
  children: React.ReactNode;
}

export const AccordianContainer = ({
  children,
  ...otherProps
}: IGroupContainer) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="s16"
      {...otherProps}
      p="s10"
    >
      {children}
    </Box>
  );
};
