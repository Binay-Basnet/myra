import React from 'react';

import { Box, Grid, Text } from '@coop/shared/ui';

/* eslint-disable-next-line */
interface DetailsCardProps {
  title?: string;
  subTitle?: string;
  children?: React.ReactNode;
  hasTable?: boolean;
}
export const DetailsCard = ({ title, subTitle, children, hasTable }: DetailsCardProps) => (
  <Box border="1px solid" borderColor="border.layout" borderRadius="br2">
    <Box px="s16" h="60px" display="flex" alignItems="center">
      <Box display="flex" flexDir="column">
        <Text fontSize="r1" fontWeight="600">
          {title}{' '}
        </Text>
        {subTitle && (
          <Text fontSize="s2" fontWeight="400">
            {subTitle}
          </Text>
        )}
      </Box>
    </Box>
    {!hasTable && children && (
      <Grid p="s16" templateColumns="repeat(2,1fr)" gap="s20">
        {children}
      </Grid>
    )}
    {hasTable && children && <Box p="s16">{children}</Box>}
  </Box>
);

export default DetailsCard;
