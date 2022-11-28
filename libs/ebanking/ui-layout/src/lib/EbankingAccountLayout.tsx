import React from 'react';

import { Box } from '@myra-ui';

import { AccountAnnouncements } from '../components/announcements';
import { EbankingHeader } from '../components/EbankingHeader';
import { EbankingSidebar } from '../components/EbankingSidebar';

interface IEbankingMainLayoutProps {
  children: React.ReactNode;
}

export const EbankingAccountLayout = ({ children }: IEbankingMainLayoutProps) => (
  <>
    <EbankingHeader />

    <Box w="80%" h="100%" display="flex" mx="auto">
      <Box w="18.5%" position="sticky" overflow="auto" top="60px" h="100%" py="s32" flexShrink={0}>
        <EbankingSidebar />
      </Box>
      <Box borderX="1px" borderColor="gray.200" px="s16" py="s32" width="100%">
        {children}
      </Box>

      <Box w="18.5%" h="100%" position="sticky" top="60px" flexShrink={0} py="s32">
        <AccountAnnouncements />
      </Box>
    </Box>
  </>
);
