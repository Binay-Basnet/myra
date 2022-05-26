import { ReactElement } from 'react';

import { ShareLayout, ShareTable } from '@saccos/myra/components';

// TODO ( Update this page when design arrives )
const ShareConsolidatedPage = () => {
  return <ShareTable />;
};

ShareConsolidatedPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <ShareLayout headingText={'Share Consolidate Report'}>{page}</ShareLayout>
  );
};
export default ShareConsolidatedPage;
