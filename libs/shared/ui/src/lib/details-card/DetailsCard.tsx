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
  <Box p="s16" border="1px solid" borderColor="border.layout" borderRadius="br2">
    <Box h="50px" display="flex" alignItems="start" justifyContent="center">
      <Text fontSize="r1" fontWeight="600">
        {title}{' '}
      </Text>
      {subTitle && (
        <Text fontSize="s2" fontWeight="400">
          {subTitle}
        </Text>
      )}
    </Box>
    {!hasTable && <Grid templateColumns="repeat(2,1fr)">{children}</Grid>}
    {hasTable && <Box>{children}</Box>}
  </Box>
);

export default DetailsCard;
