import { ReactElement } from 'react';

import { ShareLayout } from '@saccos/myra/ui';
import { ShareTable } from '@saccos/myra/components';

// TODO ( Update this page when design arrives )

const ShareList = () => {
  return <ShareTable />;
};

ShareList.getLayout = function getLayout(page: ReactElement) {
  return <ShareLayout headingText="Share Register">{page}</ShareLayout>;
};
export default ShareList;
