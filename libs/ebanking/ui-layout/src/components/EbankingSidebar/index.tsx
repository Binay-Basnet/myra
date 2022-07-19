import React from 'react';
import { useRouter } from 'next/router';

import { Box } from '@coop/shared/ui';

import { EbankingSidebarNavItem } from '../../components/EbankingSidebarNavItem';
import { SIDEBAR_NAV_ITEMS } from '../../constants/SIDEBAR_NAV_ITEMS';

export const EbankingSidebar = () => {
  const router = useRouter();

  return (
    <Box>
      {SIDEBAR_NAV_ITEMS.map((navItem) => (
        <EbankingSidebarNavItem
          item={navItem}
          isActive={router.asPath.includes(navItem.link ?? '/home')}
        />
      ))}
    </Box>
  );
};
