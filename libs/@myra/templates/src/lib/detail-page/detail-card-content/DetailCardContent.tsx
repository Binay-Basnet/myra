import React from 'react';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Chips } from '@myra-ui/components';
import { Box, Text } from '@myra-ui/foundations';

export interface DetailCardContentProps {
  title?: string | null;
  subtitle?: React.ReactNode | null;
  bg?: string;
  children?: React.ReactNode;
  status?: boolean;
}

export const DetailCardContent = ({
  title,
  subtitle,
  bg,
  status,
  children,
}: DetailCardContentProps) => (
  <Box display="flex" flexDirection="column" alignItems="start" gap="s4" bg={bg}>
    {title && (
      <Text fontWeight="500" fontSize="s3" color="gray.700">
        {title ?? 'N/A'}
      </Text>
    )}
    {subtitle !== undefined && (
      <Text fontWeight="600" fontSize="r1" color="gray.900">
        {subtitle ?? 'N/A'}
      </Text>
    )}
    {status && (
      <Box w="100px">
        <Chips variant="solid" theme="success" size="md" type="label" label="Complete" />
      </Box>
    )}

    {children}
  </Box>
);

export default DetailCardContent;
