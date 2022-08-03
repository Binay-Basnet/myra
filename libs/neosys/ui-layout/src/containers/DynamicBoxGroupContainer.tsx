import React from 'react';

import { Box, BoxProps } from '@coop/shared/ui';

interface IGroupContainer extends BoxProps {
  children: React.ReactNode;
}

export const DynamicBoxGroupContainer = ({
  children,
  ...rest
}: IGroupContainer) => {
  return (
    <Box
      p="s10"
      display="flex"
      flexDirection="column"
      gap="s16"
      boxShadow="E0"
      {...rest}
    >
      {children}
    </Box>
  );
};
