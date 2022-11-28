import React from 'react';
import { Box, Grid, Text } from '@myra/dump';

import { useTranslation } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface FormSectionProps {
  id?: string;
  header?: string;
  subHeader?: string;
  flexLayout?: boolean;
  divider?: boolean;
  templateColumns?: number;
  children?: React.ReactNode;
}

export const FormSection = ({
  id,
  header,
  subHeader,
  flexLayout,
  divider = true,
  templateColumns,
  children,
}: FormSectionProps) => {
  const { t } = useTranslation();
  return (
    <Box
      borderBottom={divider ? '1px solid' : 'none'}
      borderBottomColor={divider ? 'border.layout' : 'none'}
      scrollMarginTop="200px"
      id={id}
    >
      {header && (
        <Box p="s20" pb={0}>
          <Text fontSize="r1" fontWeight="SemiBold" color="neutralColorLight.Gray-80">
            {t[header] ?? header}
          </Text>
        </Box>
      )}

      {subHeader && (
        <Box p="s20" py="s4">
          <Text fontSize="s3" fontWeight="Regular" color="neutralColorLight.Gray-70">
            {t[subHeader] ?? subHeader}
          </Text>
        </Box>
      )}
      <Box p="s20">
        {flexLayout ? (
          <Box>{children}</Box>
        ) : (
          <Grid templateColumns={`repeat(${templateColumns || 3},1fr)`} gap="s20" rowGap="s16">
            {children}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default FormSection;
