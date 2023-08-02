import { useRouter } from 'next/router';

import { Box, Scrollable } from '@myra-ui';

import { ProductDetailPathBar } from '@coop/cbs/settings/ui-layout';

import { MeetingDetailsSideBar } from './components/MeetingsDetailsSidebar';
import { Minutes } from './tabs/Minutes';
import { Overview } from './tabs/OVerview';

export const BPMMeetingsDetails = () => {
  const router = useRouter();

  const tabQuery = router.query['tab'] as string;

  return (
    <>
      <ProductDetailPathBar name="Product Update" title="Meetings" />
      <Box display="flex">
        <Box
          w="320px"
          position="fixed"
          h="calc(100vh - 110px)"
          borderRight="1px"
          borderRightColor="border.layout"
          overflowY="auto"
        >
          <MeetingDetailsSideBar />
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
            {tabQuery === 'minutes' && <Minutes />}
          </Box>
        </Scrollable>
      </Box>
    </>
  );
};
