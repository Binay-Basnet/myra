import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { ShareDividendPostingList } from '@coop/cbs/others/share-dividend-posting';
import { OthersPageLayout } from '@coop/cbs/others/ui-layouts';

const FundManagementListPage = () => <ShareDividendPostingList />;

export default FundManagementListPage;

FundManagementListPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <OthersPageLayout>{page}</OthersPageLayout>
    </MainLayout>
  );
};
