import React, { FocusEventHandler } from 'react';

import { Box, Grid, Text } from '@myra-ui/foundations';

import { useTranslation } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface FormSectionProps {
  id?: string;
  header?: string;
  subHeader?: string;
  flexLayout?: boolean;
  divider?: boolean;
  isRequired?: boolean;
  templateColumns?: number;
  children?: React.ReactNode;
  onFocus?: FocusEventHandler<HTMLDivElement>;
  rightElement?: React.ReactNode;
}

export const FormSection = ({
  id,
  header,
  subHeader,
  flexLayout,
  isRequired,
  divider = true,
  templateColumns,
  children,
  onFocus,
  rightElement,
}: FormSectionProps) => {
  const { t } = useTranslation();
  return (
    <Box
      onFocus={onFocus}
      borderBottom={divider ? '1px solid' : 'none'}
      borderBottomColor={divider ? 'border.layout' : 'none'}
      scrollMarginTop="200px"
      id={id}
    >
      {(header || subHeader || rightElement) && (
        <Box display="flex" alignItems="center" justifyContent="space-between" p="s20">
          <Box>
            {header && (
              <Box pb={0}>
                <Text fontSize="r1" fontWeight="SemiBold" color="neutralColorLight.Gray-80">
                  {isRequired ? `${t[header]} *` ?? `${header} *` : t[header] ?? header}
                </Text>
              </Box>
            )}

            {subHeader && (
              <Box py="s4">
                <Text fontSize="s3" fontWeight="Regular" color="neutralColorLight.Gray-70">
                  {t[subHeader] ?? subHeader}
                </Text>
              </Box>
            )}
          </Box>

          {rightElement}
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
