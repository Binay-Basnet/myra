import { ReactElement } from 'react';

import { ShareLayout } from '@saccos/myra/ui';
import { MemberTable } from '@saccos/myra/components';

// TODO ( Update this page when design arrives )

const ShareList = () => {
  return <MemberTable />;
};

ShareList.getLayout = function getLayout(page: ReactElement) {
  return <ShareLayout headingText="Share Register">{page}</ShareLayout>;
};
export default ShareList;
