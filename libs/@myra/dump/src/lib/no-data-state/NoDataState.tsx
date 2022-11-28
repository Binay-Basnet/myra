import React from 'react';
import Image from 'next/legacy/image';

import { useTranslation } from '@coop/shared/utils';

import Box from '../box/Box';
import Text from '../text/Text';
import TextFields from '../text-fields/TextFields';

export interface NoDataStateProps {
  title?: string;
  custom?: {
    title: React.ReactNode;
    subtitle: React.ReactNode;
  };
}

export function NoDataState({ title, custom }: NoDataStateProps) {
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
          <TextFields onClick={() => window.location.reload()} as="span" variant="link">
            {t['here']}.
          </TextFields>
        </Text>
      )}
    </Box>
  );
}

export default NoDataState;
