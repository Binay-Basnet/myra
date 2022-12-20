import { useRouter } from 'next/router';

import { Box, Text } from '@myra-ui';

import { ProductDetailPathBar } from '@coop/cbs/settings/ui-layout';

import { Overview } from './Overview';
import { SideBar } from './SideBar';
import { useShareRegisterDetailHooks } from '../hooks/useShareRegisterDetailHooks';

/* eslint-disable-next-line */
export interface CbsShareFeatureShareRegisterDetailProps {}

export const CbsShareFeatureShareRegisterDetail = () => {
  const router = useRouter();
  const tabQuery = router.query['tab'] as string;
  const { shareDetails } = useShareRegisterDetailHooks();
  return (
    <>
      <ProductDetailPathBar
        name={shareDetails?.member?.name?.local ?? ''}
        title="Share Register List"
      />
      <Box
        w="320px"
        position="fixed"
        h="calc(100vh - 110px)"
        borderRight="1px"
        borderRightColor="border.layout"
        bg="gray.0"
      >
        <SideBar />
      </Box>

      <Box ml="320px" p="s16" display="flex" flexDir="column" gap="s16">
        <Text fontWeight="SemiBold" fontSize="r3" color="gray.800" lineHeight="150%">
          Overview
        </Text>
        {(tabQuery === 'overview' || tabQuery === 'undefined' || !tabQuery) && <Overview />}
      </Box>
    </>
  );
};

export default CbsShareFeatureShareRegisterDetail;
