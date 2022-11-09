import Image from "next/legacy/image";

import { useAppSelector } from '@coop/ebanking/data-access';
import { Box } from '@coop/shared/ui';

import { HeaderRightSection } from '../components/EbankingHeader';

interface IEbankingHeaderLayoutProps {
  children: React.ReactNode;
}

export const EbankingHeaderLayout = ({ children }: IEbankingHeaderLayoutProps) => {
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
        <Box position="relative" h="s32" w="285px" ml="s16">
          <Image src="/img.png" alt="logo" layout="fill" />{' '}
        </Box>

        {user?.token && <HeaderRightSection />}
      </Box>
      <Box
        w="100%"
        h="100%"
        display="flex"
        justifyContent="center"
        bg="white"
        minH="calc(100vh - 60px)"
      >
        <Box w="445px" px="s16" display="flex" flexDir="column" py="s32" gap="s32">
          {children}
        </Box>
      </Box>
    </>
  );
};
