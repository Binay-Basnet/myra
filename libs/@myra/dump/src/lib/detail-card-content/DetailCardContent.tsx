import React from 'react';

import { Box, Tags, Text } from '@myra/dump';

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
  <Box display="flex" flexDirection="column" gap="s4" bg={bg}>
    <Text fontWeight="500" fontSize="s3" color="gray.700">
      {title ?? 'N/A'}
    </Text>
    {subtitle !== undefined && (
      <Text fontWeight="600" fontSize="r1" color="gray.900" textTransform="capitalize">
        {subtitle ?? 'N/A'}
      </Text>
    )}
    {status && (
      <Box w="100px">
        <Tags type="chip" label="Complete" tagColor="primary.100" labelColor="success.500" />
      </Box>
    )}

    {children}
  </Box>
);

export default DetailCardContent;
