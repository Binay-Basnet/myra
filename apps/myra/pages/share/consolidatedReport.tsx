import { ShareLayout, ShareTable } from '@saccos/myra/components';
import { ReactElement } from 'react';

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
