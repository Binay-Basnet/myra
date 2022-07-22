import { ReactElement } from 'react';

import { EbankingMainLayout } from '@coop/ebanking/ui-layout';

import Temp from '../temp';

const ShareInfoPage = () => {
  return <Temp />;
};

ShareInfoPage.getLayout = function (page: ReactElement) {
  return <EbankingMainLayout>{page}</EbankingMainLayout>;
};

export default ShareInfoPage;
