import React from 'react';

import { Divider, VStack, VStackProps } from '@coop/shared/ui';

interface IContainerWithDividerProps extends VStackProps {
  children: React.ReactNode;
}

export const ContainerWithDivider = ({
  children,
  ...rest
}: IContainerWithDividerProps) => {
  return (
    <VStack
      alignItems="stretch"
      justifyContent="center"
      width="100%"
      gap="s32"
      divider={
        <Divider my="s32" border="1px solid" borderColor="background.500" />
      }
      {...rest}
    >
      {children}
    </VStack>
  );
};
