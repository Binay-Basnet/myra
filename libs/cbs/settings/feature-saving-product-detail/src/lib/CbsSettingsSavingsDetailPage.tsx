import { useRouter } from 'next/router';

import { AccountListPage } from './AccountListPage';
import { OverviewPage } from './OverviewPage';

export const CbsSettingsSavingsDetailPage = () => {
  const router = useRouter();

  const tabQuery = router.query['tab'] as string;

  return (
    <>
      {(tabQuery === 'overview' || tabQuery === 'undefined' || !tabQuery) && <OverviewPage />}
      {tabQuery === 'account list' && <AccountListPage />}

      {/* {tabQuery && !['tasks', 'documents', 'activity'].includes(tabQuery) && (
        <Box h="calc(100vh - 110px)">
          <WIPState />
        </Box>
      )} */}
    </>
  );
};
