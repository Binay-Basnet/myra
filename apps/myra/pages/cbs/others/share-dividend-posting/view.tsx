import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { NewShareDividendPosting } from '@coop/cbs/others/share-dividend-posting';

const ShareDividendPostingViewPage = () => <NewShareDividendPosting />;

export default ShareDividendPostingViewPage;

ShareDividendPostingViewPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
