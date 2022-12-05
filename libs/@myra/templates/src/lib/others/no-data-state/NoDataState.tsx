import React from 'react';
import Image from 'next/legacy/image';

import { Box, Text } from '@myra-ui/foundations';

import { useTranslation } from '@coop/shared/utils';

export interface NoDataStateProps {
  title?: string;
  custom?: {
    title: React.ReactNode;
    subtitle: React.ReactNode;
  };
}

export const NoDataState = ({ title, custom }: NoDataStateProps) => {
  const { t } = useTranslation();

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap="s16"
      mt="s60"
    >
      <Image height={100} width={100} src="/clipboard.svg" alt="cetral chakra" />
      {custom?.title ? (
        <Text color="neutralColorLight.Gray-70" fontWeight="500" fontSize="m1">
          {custom.title}
        </Text>
      ) : (
        <Text color="neutralColorLight.Gray-70" fontWeight="500" fontSize="m1">
          {t['no']} {title} {t['data']}
        </Text>
      )}

      {custom?.subtitle ? (
        <Text color="neutralColorLight.Gray-50" fontSize="r2">
          {custom.subtitle}
        </Text>
      ) : (
        <Text color="neutralColorLight.Gray-50" fontSize="r2">
          {t['tryCreatinganew']} data {t['orReloadthepage']}{' '}
          <Text onClick={() => window.location.reload()} as="span" variant="link">
            {t['here']}.
          </Text>
        </Text>
      )}
    </Box>
  );
};

export default NoDataState;
