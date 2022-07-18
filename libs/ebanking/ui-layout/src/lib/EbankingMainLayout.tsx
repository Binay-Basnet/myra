import React from 'react';

import { Box } from '@coop/shared/ui';

interface IEbankingMainLayoutProps {
  children: React.ReactNode;
}

export const EbankingMainLayout = ({ children }: IEbankingMainLayoutProps) => {
  return (
    <>
      <Box
        as="header"
        position="sticky"
        bg="primary.600"
        h="60px"
        px="s16"
        w="100%"
        top="0"
      ></Box>
      {children}
    </>
  );
};
