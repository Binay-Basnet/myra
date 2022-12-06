import React from 'react';

import { Box, Text } from '@myra-ui';

interface CardContainerProps {
  children: React.ReactNode;
}

export const CardContainer = ({ children }: CardContainerProps) => (
  <Box p="s16" display="flex" flexDir="column" gap="s32">
    {children}
  </Box>
);

export const CardBodyContainer = ({ children }: CardContainerProps) => (
  <Box display="flex" flexDir="column" gap="s16">
    {children}
  </Box>
);

export const CardHeader = ({ children }: CardContainerProps) => (
  <Text variant="tableHeader" color="gray.500">
    {children}
  </Text>
);

interface CardContentProps {
  title: string;
  subtitle: string;
}

export const CardContent = ({ title, subtitle }: CardContentProps) => (
  <Box display="flex" flexDir="column" gap="s4" color="gray.800">
    <Text color="gray.800" fontSize="s3" fontWeight="600">
      {title}
    </Text>
    <Text variant="formInput" textTransform="capitalize">
      {subtitle}
    </Text>
  </Box>
);
