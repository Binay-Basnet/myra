import React from 'react';

import { Text, TextProps } from '@coop/shared/ui';

interface IGroupContainer extends TextProps {
  children: React.ReactNode;
}

export const SubHeadingText = ({ children, ...rest }: IGroupContainer) => {
  return (
    <Text fontSize={'s3'} fontWeight="500" color="gray.700" {...rest}>
      {children}
    </Text>
  );
};
