import Image from 'next/legacy/image';
import { useRouter } from 'next/router';

import { Box, Text } from '@myra-ui';

import { checkEbankingModuleAccess } from '@coop/ebanking/utils';

import { EbankingSidebarNavItem } from '../EbankingSidebarNavItem';
import { SIDEBAR_NAV_ITEMS } from '../../constants/SIDEBAR_NAV_ITEMS';

export const EbankingSidebar = () => {
  const router = useRouter();

  return (
    <Box
      w="100%"
      h="calc(100vh - 60px - 64px)"
      display="flex"
      flexDir="column"
      justifyContent="space-between"
    >
      <Box w="100%">
        {SIDEBAR_NAV_ITEMS.filter((f) => checkEbankingModuleAccess(f.key)).map((navItem) => (
          <EbankingSidebarNavItem
            item={navItem}
            isActive={router.asPath.includes(navItem.link ?? '/home')}
          />
        ))}
      </Box>

      <a href="https://www.myraerp.com/" target="_blank" rel="noreferrer">
        <Box display="flex" flexDir="column" gap="s8" cursor="pointer">
          <Box position="relative" h="40px" w="100%">
            <Image
              src="/sidebar-logo.svg"
              layout="fill"
              objectFit="contain"
              objectPosition="left"
            />
          </Box>
          <Text fontSize="s2" fontWeight="500" color="gray.600">
            www.myraerp.com
          </Text>
        </Box>
      </a>
    </Box>
  );
};
