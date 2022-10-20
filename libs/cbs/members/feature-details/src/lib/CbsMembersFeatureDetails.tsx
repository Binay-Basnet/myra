import { useRouter } from 'next/router';

import { Box } from '@coop/shared/ui';

import { MemberDetailsSidebar } from '../components';
import { Account, Overview } from '../tabs';

export const MemberDetails = () => {
  const router = useRouter();

  const tabQuery = router.query['tab'] as string;

  return (
    <>
      {' '}
      <Box
        w="320px"
        position="fixed"
        h="calc(100vh - 110px)"
        borderRight="1px"
        borderRightColor="border.layout"
        overflowY="auto"
      >
        <MemberDetailsSidebar />
      </Box>
      <Box display="flex" p="s16" flexDir="column" gap="s32" ml="320px" bg="border.layout">
        {(tabQuery === 'overview' || tabQuery === 'undefined' || !tabQuery) && <Overview />}

        {tabQuery === 'accounts' && <Account />}
      </Box>
    </>
  );
};
