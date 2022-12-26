import { useRouter } from 'next/router';

import { Box } from '@myra-ui';

import { SideBar } from '../component/SideBar';
import { CollateralPage, DocumentPage, GuaranteePage } from '../tabs';
import { OverviewPage } from '../tabs/OverviewPage';

/* eslint-disable-next-line */
export interface CbsLoanFeatureLoanAccountDetailProps {}

export const CbsLoanFeatureLoanAccountDetail = () => {
  const router = useRouter();

  const tabQuery = router.query['tab'] as string;
  return (
    <Box bg="gray.100">
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
      <Box ml="320px" p="s16" display="flex" flexDir="column" gap="s16">
        {(tabQuery === 'overview' || tabQuery === 'undefined' || !tabQuery) && <OverviewPage />}
        {tabQuery === 'collateral' && <CollateralPage />}
        {tabQuery === 'guarantee' && <GuaranteePage />}
        {tabQuery === 'document' && <DocumentPage />}
      </Box>
    </Box>
  );
};
