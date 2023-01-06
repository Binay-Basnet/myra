import { IoClose } from 'react-icons/io5';
import { useRouter } from 'next/router';

import { Box, Icon, IconButton, PathBar } from '@myra-ui';

import { COALeafDetailSidebar } from '@coop/cbs/settings/ui-layout';
import { ROUTES } from '@coop/cbs/utils';

import { LeafNodeOverview, LedgerTab } from '../components/detail-tabs';
import { useCOALeafNodeDetails } from '../hooks';

export const COALeafDetail = () => {
  const router = useRouter();

  const tabQuery = router.query['tab'] as string;

  const { leafNodeData } = useCOALeafNodeDetails();

  return (
    <>
      <Box position="sticky" bg="white" top="110px" zIndex="10" width="100%">
        <PathBar
          paths={[
            { label: 'Charts of Accounts', link: ROUTES.SETTINGS_GENERAL_COA },
            { label: leafNodeData?.accountType ?? '', link: '' },
          ]}
          button={
            <IconButton
              variant="ghost"
              aria-label="close"
              color="gray.500"
              height="40px"
              icon={<Icon as={IoClose} size="lg" />}
              onClick={() => {
                router.push(ROUTES.SETTINGS_GENERAL_COA, {
                  query: {
                    ...router.query,
                  },
                });
              }}
            />
          }
        />
      </Box>
      <Box
        w="320px"
        position="fixed"
        h="calc(100vh - 110px)"
        borderRight="1px"
        borderRightColor="border.layout"
        overflowY="auto"
      >
        <COALeafDetailSidebar />
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
        {(tabQuery === 'overview' || tabQuery === 'undefined' || !tabQuery) && <LeafNodeOverview />}
        {tabQuery === 'ledger' && <LedgerTab />}

        {/* {tabQuery === 'accounts' && <Account />}
        {tabQuery === 'activity' && <Activity />}
        {tabQuery === 'bio' && <Bio />}
        {tabQuery === 'cheque' && <Cheque />}
        {tabQuery === 'documents' && <Documents />}
        {tabQuery === 'reports' && <Reports />}
        {tabQuery === 'share' && <Share />}
        {tabQuery === 'tasks' && <Tasks />}
        {tabQuery === 'transactions' && <Transactions />} */}
      </Box>
    </>
  );
};
