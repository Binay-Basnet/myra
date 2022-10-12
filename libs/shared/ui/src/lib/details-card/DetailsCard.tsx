import React from 'react';

import { Box, Grid, Text } from '@coop/shared/ui';

/* eslint-disable-next-line */
interface DetailsCardProps {
  title?: string;
  subTitle?: string;
  children?: React.ReactNode;
  hasTable?: boolean;
  bg?: string;
  hasThreeRows?: boolean;
  leftBtn?: React.ReactNode;
}
export const DetailsCard = ({
  title,
  subTitle,
  children,
  hasTable,
  bg,
  hasThreeRows,
  leftBtn = null,
}: DetailsCardProps) => (
  <Box border="1px solid" borderColor="border.layout" borderRadius="br2" bg={bg}>
    <Box px="s16" h="60px" display="flex" alignItems="center">
      <Box w="100%" display="flex" alignItems="center" justifyContent="space-between">
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
        {leftBtn}
      </Box>
    </Box>
    {!hasTable && children && !hasThreeRows && (
      <Grid p="s16" templateColumns="repeat(2,1fr)" gap="s20">
        {children}
      </Grid>
    )}
    {!hasTable && children && hasThreeRows && (
      <Grid p="s16" templateColumns="repeat(3,1fr)" gap="s16">
        {children}
      </Grid>
    )}
    {hasTable && children && <Box p="s16">{children}</Box>}
  </Box>
);

export default DetailsCard;
