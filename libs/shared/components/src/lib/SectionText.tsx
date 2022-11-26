import React from 'react';

import { Text, TextProps } from '@myra-ui';

interface IGroupContainer extends TextProps {
  children: React.ReactNode;
}

export const TopText = ({ children, ...rest }: IGroupContainer) => (
  <Text fontSize="r1" fontWeight="500" color="gray.700" {...rest}>
    {children}
  </Text>
);
