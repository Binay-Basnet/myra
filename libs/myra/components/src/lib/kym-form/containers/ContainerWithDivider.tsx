import React from 'react';
import { Divider, VStack } from '@saccos/myra/ui';

interface IContainerWithDividerProps {
  children: React.ReactNode;
}

export const ContainerWithDivider = ({
  children,
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
    >
      {children}
    </VStack>
  );
};
