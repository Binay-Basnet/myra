import React from 'react';

import { Box, Grid, Text } from '@coop/shared/ui';
/* eslint-disable-next-line */
export interface FormSectionProps {
  header?: string;
  children?: React.ReactNode;
}

export function FormSection({ header, children }: FormSectionProps) {
  return (
    <Box>
      {header && (
        <Box p="s16" pb={0}>
          <Text fontWeight="medium" size="r1" color="gray.600">
            {header}
          </Text>
        </Box>
      )}
      <Box borderBottom={'1px solid'} borderBottomColor="border.layout" p="s16">
        <Grid templateColumns={'repeat(3,1fr)'} gap="s20" rowGap={'s16'}>
          {children}
        </Grid>
      </Box>
    </Box>
  );
}

export default FormSection;
