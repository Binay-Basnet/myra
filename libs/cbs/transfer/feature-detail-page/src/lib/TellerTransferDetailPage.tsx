import { useRouter } from 'next/router';

import { Box, Scrollable } from '@myra-ui';

import { SideBar } from '../component';
import { useTransferDetailHooks } from '../hooks/useTransferDetailHooks';
import { OverviewPage } from '../tabs/OverviewPage';

/* eslint-disable-next-line */
export interface TellerTransferDetailPageProps {}

export const TellerTransferDetailPage = () => {
  const router = useRouter();
  const tabQuery = router.query['tab'] as string;

  const { transferDetailData, sidebarData, tellerTxnSummary } = useTransferDetailHooks();

  return (
    <Box bg="gray.100">
      <Box display="flex">
        <Box
          bg="gray.0"
          w="320px"
          position="fixed"
          h="calc(100vh - 110px)"
          borderRight="1px"
          borderRightColor="border.layout"
        >
          <SideBar sidebarData={sidebarData} />
        </Box>
        <Scrollable detailPage>
          <Box ml="320px" p="s16" display="flex" flexDir="column" minH="100vh" gap="s16">
            {(tabQuery === 'overview' || tabQuery === 'undefined' || !tabQuery) && (
              <OverviewPage data={transferDetailData} summary={tellerTxnSummary} />
            )}
          </Box>
        </Scrollable>
      </Box>
    </Box>
  );
};
export default TellerTransferDetailPage;
