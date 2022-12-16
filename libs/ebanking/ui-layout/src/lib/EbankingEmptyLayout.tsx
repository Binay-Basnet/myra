import React from 'react';
import Image from 'next/legacy/image';

import { Box } from '@myra-ui';

import { useAppSelector } from '@coop/ebanking/data-access';

import { HeaderRightSection } from '../components/EbankingHeader';

interface IEbankingMainLayoutProps {
  children: React.ReactNode;
}

export const EbankingEmptyLayout = ({ children }: IEbankingMainLayoutProps) => {
  const user = useAppSelector((state) => state?.auth);

  return (
    <>
      <Box
        as="header"
        position="sticky"
        bg="primary.600"
        h="60px"
        w="100%"
        top="0"
        zIndex="20"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box position="relative" h="s32" w="100px" ml="s16">
          <Image src="/logo-light.svg" alt="logo" layout="fill" objectPosition="center" />{' '}
        </Box>

        {user?.token && <HeaderRightSection />}
      </Box>

      <Box w={{ '2xl': '80%', xl: '80%', lg: '95%' }} h="100%" display="flex" mx="auto">
        <Box w="18.5%" position="sticky" top="60px" h="100%" py="s32" flexShrink={0} />

        <Box
          borderX="1px"
          borderColor="gray.200"
          px="s16"
          py="s32"
          width="100%"
          minH="calc(100vh - 60px)"
        >
          {children}
        </Box>

        <Box w="18.5%" h="100%" position="sticky" top="60px" flexShrink={0} py="s32" />
      </Box>
    </>
  );
};
