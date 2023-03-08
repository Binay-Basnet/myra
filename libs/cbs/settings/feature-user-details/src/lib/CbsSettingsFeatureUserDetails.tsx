import { useRouter } from 'next/router';

import { Box } from '@myra-ui';

import { ProductDetailPathBar } from '@coop/cbs/settings/ui-layout';
import { localizedText } from '@coop/cbs/utils';

import { UsersDetailsSideBar } from '../components';
import { useUserDetailsHooks } from '../hooks/useUserDetailsHooks';
import { RolesTab, ServiceCenterTab } from '../tabs';
import { Bio } from '../tabs/Bio';
import { Overview } from '../tabs/Overview';

export const CbsSettingsUserDetailsPage = () => {
  const router = useRouter();
  const { sidebarData } = useUserDetailsHooks();

  const tabQuery = router.query['tab'] as string;

  return (
    <>
      <ProductDetailPathBar
        name={localizedText(sidebarData?.userName) ?? ''}
        title={`User List `}
      />
      <Box
        w="320px"
        position="fixed"
        h="calc(100vh - 110px)"
        borderRight="1px"
        borderRightColor="border.layout"
        overflowY="auto"
      >
        <UsersDetailsSideBar />
      </Box>
      <Box
        display="flex"
        p="s16"
        flexDir="column"
        gap="s16"
        ml="320px"
        bg="background.500"
        minH="calc(100vh - 170px)"
      >
        {(tabQuery === 'overview' || tabQuery === 'undefined' || !tabQuery) && <Overview />}

        {tabQuery === 'bio' && <Bio />}
        {tabQuery === 'service center' && <ServiceCenterTab />}

        {tabQuery === 'roles' && <RolesTab />}
      </Box>
    </>
  );
};
