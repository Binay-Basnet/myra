/* eslint-disable-next-line */
import { Box, Container, FormHeader } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';
import React from 'react';

export function CbsAccountClose() {
  const { t } = useTranslation();

  return (
    <Container minW="container.xl" p="0" bg="white" h="calc(100vh - 110px)">
      <Box position="sticky" top="110px" bg="gray.100" width="100%" zIndex="10">
        <FormHeader title={t['accountClose']} />
      </Box>
    </Container>
  );
}
