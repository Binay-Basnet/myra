import React from 'react';

import { Box, Text } from '@coop/shared/ui';

export interface DetailCardContentProps {
  title?: string | null;
  subtitle?: string | null;
  bg?: string;
  children?: React.ReactNode;
}

export const DetailCardContent = ({ title, subtitle, bg, children }: DetailCardContentProps) => (
  <Box display="flex" flexDirection="column" gap="s4" bg={bg}>
    <Text fontWeight="500" fontSize="s3">
      {title ?? 'N/A'}
    </Text>
    <Text fontWeight="600" fontSize="r1" textTransform="capitalize">
      {subtitle ?? 'N/A'}
    </Text>
    {children}
  </Box>
);

export default DetailCardContent;
