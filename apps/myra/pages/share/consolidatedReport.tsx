import { ReactElement } from 'react';

import { ShareLayout } from '@saccos/myra/ui';
import { MemberTable } from '@saccos/myra/components';

// TODO ( Update this page when design arrives )
const ShareConsolidatedPage = () => {
  return <MemberTable />;
};

ShareConsolidatedPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <ShareLayout headingText={'Share Consolidate Report'}>{page}</ShareLayout>
  );
};
export default ShareConsolidatedPage;
