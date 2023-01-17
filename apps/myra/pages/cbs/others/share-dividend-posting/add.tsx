import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { NewShareDividendPosting } from '@coop/cbs/others/share-dividend-posting';

const NewShareDividendPostingPage = () => <NewShareDividendPosting />;

export default NewShareDividendPostingPage;

NewShareDividendPostingPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
