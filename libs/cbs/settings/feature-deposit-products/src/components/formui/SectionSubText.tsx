import React from 'react';

import { Text, TextProps } from '@myra-ui';

interface IGroupContainer extends TextProps {
  children: React.ReactNode;
}

export const SubText = ({ children, ...rest }: IGroupContainer) => (
  <Text fontSize="s2" fontWeight="400" color="gray.700" {...rest}>
    {children}
  </Text>
);
