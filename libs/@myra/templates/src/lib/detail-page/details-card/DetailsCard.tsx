import React from 'react';

import { Box, Grid, Text } from '@myra-ui/foundations';

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
  <Box borderRadius="br2" boxShadow="E0" bg={bg ?? 'white'}>
    {title && (
      <Box
        px="s16"
        h="3.125rem"
        display="flex"
        alignItems="center"
        sx={{
          '@media print': {
            height: '2rem',
            py: 's8',
            px: '0',
          },
        }}
      >
        <Box w="100%" display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" flexDir="column">
            <Text fontSize="r1" fontWeight="SemiBold">
              {title}
            </Text>
            {subTitle && (
              <Text fontSize="s2" fontWeight="Regular">
                {subTitle}
              </Text>
            )}
          </Box>
          {leftBtn}
        </Box>
      </Box>
    )}
    {!hasTable && children && !hasThreeRows && (
      <Grid
        p="s16"
        templateColumns="repeat(2,1fr)"
        gap="s20"
        sx={{
          '@media print': {
            py: 's8',
            px: '0',
            gap: 's8',
          },
        }}
      >
        {children}
      </Grid>
    )}
    {!hasTable && children && hasThreeRows && (
      <Grid
        p="s16"
        templateColumns="repeat(3,1fr)"
        gap="s16"
        sx={{
          '@media print': {
            py: 's8',
            px: '0',
            gap: 's8',
          },
        }}
      >
        {children}
      </Grid>
    )}
    {hasTable && children && (
      <Box
        p="s16"
        sx={{
          '@media print': {
            py: 's8',
            px: '0',
          },
        }}
      >
        {children}
      </Box>
    )}
  </Box>
);

export default DetailsCard;
