import React from 'react';

import { Box, Text, TextFields } from '@coop/shared/ui';

interface CardContainerProps {
  children: React.ReactNode;
}

export const CardContainer = ({ children }: CardContainerProps) => {
  return (
    <Box p="s16" display="flex" flexDir="column" gap="s32">
      {children}
    </Box>
  );
};

export const CardBodyContainer = ({ children }: CardContainerProps) => {
  return (
    <Box display="flex" flexDir="column" gap="s16">
      {children}
    </Box>
  );
};

export const CardHeader = ({ children }: CardContainerProps) => {
  return (
    <TextFields variant="tableHeader" color="gray.500">
      {children}
    </TextFields>
  );
};

interface CardContentProps {
  title: string;
  subtitle: string;
}

export const CardContent = ({ title, subtitle }: CardContentProps) => {
  return (
    <Box display="flex" flexDir="column" gap="s4" color="gray.800">
      <Text color="gray.800" fontSize="s3" fontWeight="600">
        {title}
      </Text>
      <TextFields variant="formInput">{subtitle}</TextFields>
    </Box>
  );
};
