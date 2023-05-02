import { useRouter } from 'next/router';

import { Box, Scrollable } from '@myra-ui';

import { ProductDetailPathBar } from '@coop/cbs/settings/ui-layout';

import { SaalesEntrySideBar } from './components/SalesEntrySidebar';
import { Overview } from './tabs/OVerview';

export const AccountingSalesEntryDetails = () => {
  const router = useRouter();

  const tabQuery = router.query['tab'] as string;

  return (
    <>
      <ProductDetailPathBar name="Sales Entry" title={`Sales `} />
      <Box display="flex">
        <Box
          w="320px"
          position="fixed"
          h="calc(100vh - 110px)"
          borderRight="1px"
          borderRightColor="border.layout"
          overflowY="auto"
        >
          <SaalesEntrySideBar />
        </Box>
        <Scrollable detailPage>
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
          </Box>
        </Scrollable>
      </Box>
    </>
  );
};
