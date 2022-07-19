import React from 'react';

import { Box } from '@coop/shared/ui';

import { EbankingHeader } from '../components/EbankingHeader';
import { EbankingSidebar } from '../components/EbankingSidebar';

interface IEbankingMainLayoutProps {
  children: React.ReactNode;
}

export const EbankingMainLayout = ({ children }: IEbankingMainLayoutProps) => {
  return (
    <>
      <EbankingHeader />

      <Box w="80%" h="100%" display="flex" mx="auto">
        <Box w="18.5%" flexShrink={0} py="s32">
          <EbankingSidebar />
        </Box>
        <Box
          borderX="1px"
          borderColor="gray.200"
          px="s16"
          py="s32"
          width="100%"
        >
          {children}
        </Box>

        <Box w="18.5%" flexShrink={0} borderRadius="br2"></Box>
      </Box>
    </>
  );
};
