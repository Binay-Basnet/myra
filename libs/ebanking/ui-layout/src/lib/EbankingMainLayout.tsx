import React from 'react';

import { Box } from '@myra-ui';

import { DefaultAnnouncements } from '../components/announcements';
import { EbankingHeader } from '../components/EbankingHeader';
import { EbankingSidebar } from '../components/EbankingSidebar';

interface IEbankingMainLayoutProps {
  children: React.ReactNode;
}

export const EbankingMainLayout = ({ children }: IEbankingMainLayoutProps) => (
  <>
    <EbankingHeader />

    <Box w={{ '2xl': '80%', xl: '80%', lg: '95%' }} h="100%" display="flex" mx="auto">
      <Box w="18.5%" position="sticky" top="60px" h="100%" py="s32" flexShrink={0}>
        <EbankingSidebar />
      </Box>

      <Box borderX="1px" borderColor="gray.200" px="s16" py="s32" width="100%">
        {children}
      </Box>

      <Box w="18.5%" h="100%" position="sticky" top="60px" flexShrink={0} py="s32">
        <DefaultAnnouncements />
      </Box>
    </Box>
  </>
);
