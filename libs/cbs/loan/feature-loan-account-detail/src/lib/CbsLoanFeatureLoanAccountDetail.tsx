import { useRouter } from 'next/router';

import { Box, Scrollable } from '@myra-ui';

import { SideBar } from '../component/SideBar';
import {
  CollateralPage,
  DocumentPage,
  GuaranteePage,
  InterestUpdatePage,
  LedgerPage,
} from '../tabs';
import { GeneralUpdatesPage } from '../tabs/GeneralUpdatesPage';
import { OverviewPage } from '../tabs/OverviewPage';

/* eslint-disable-next-line */
export interface CbsLoanFeatureLoanAccountDetailProps {
  isLocModalOpen?: boolean;
  handleLocModalClose?: () => void;
  isLinkedAccountModalOpen?: boolean;
  handleLinkedAccountModalClose?: () => void;
}

export const CbsLoanFeatureLoanAccountDetail = () => {
  const router = useRouter();

  const tabQuery = router.query['tab'] as string;

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
          <SideBar />
        </Box>
        <Scrollable detailPage>
          <Box ml="320px" p="s16" display="flex" flexDir="column" minH="100vh" gap="s16">
            {(tabQuery === 'overview' || tabQuery === 'undefined' || !tabQuery) && <OverviewPage />}
            {tabQuery === 'collateral' && <CollateralPage />}
            {tabQuery === 'guarantee' && <GuaranteePage />}
            {tabQuery === 'documents' && <DocumentPage />}
            {tabQuery === 'ledger' && <LedgerPage />}
            {tabQuery === 'account premium update' && <InterestUpdatePage />}
            {tabQuery === 'general updates' && <GeneralUpdatesPage />}
          </Box>
        </Scrollable>
      </Box>
    </Box>
  );
};
