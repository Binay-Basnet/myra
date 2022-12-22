import { ReactElement } from 'react';

import { WIPState } from '@myra-ui';

import { ACMainLayout, DownloadLayout } from '@coop/ac/layouts';

const GuidelinesListPage = () => <WIPState />;

GuidelinesListPage.getLayout = (page: ReactElement) => (
  <ACMainLayout>
    <DownloadLayout>{page}</DownloadLayout>
  </ACMainLayout>
);

export default GuidelinesListPage;
