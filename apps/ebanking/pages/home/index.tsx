import { ReactElement } from 'react';

import { EbankingHomePage } from '@coop/ebanking/home';
import { EbankingMainLayout } from '@coop/ebanking/ui-layout';

const HomePage = () => <EbankingHomePage />;

HomePage.getLayout = function (page: ReactElement) {
  return <EbankingMainLayout>{page}</EbankingMainLayout>;
};

export default HomePage;
