import { ReactElement } from 'react';

import { NewShareDividendPosting } from '@coop/cbs/others/share-dividend-posting';
import { MainLayout } from '@coop/shared/ui';

const NewShareDividendPostingPage = () => <NewShareDividendPosting />;

export default NewShareDividendPostingPage;

NewShareDividendPostingPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
