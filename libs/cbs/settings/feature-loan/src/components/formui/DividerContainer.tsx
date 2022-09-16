import React from 'react';

import { Divider, VStack } from '@coop/shared/ui';

interface IContainerWithDividerProps {
  children: React.ReactNode;
}

export const DividerContainer = ({ children }: IContainerWithDividerProps) => (
  <VStack
    alignItems="stretch"
    justifyContent="center"
    width="100%"
    gap="s16"
    divider={<Divider my="s16" border="1px solid" borderColor="background.500" />}
  >
    {children}
  </VStack>
);
