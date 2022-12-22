import { ReactElement } from 'react';

import { WIPState } from '@myra-ui';

import { ACMainLayout, DownloadLayout } from '@coop/ac/layouts';

const DirectiveListPage = () => <WIPState />;

DirectiveListPage.getLayout = (page: ReactElement) => (
  <ACMainLayout>
    <DownloadLayout>{page}</DownloadLayout>
  </ACMainLayout>
);

export default DirectiveListPage;
