import { ReactElement } from 'react';

import { ShareLayout } from '@saccos/myra/ui';
import { MemberTable } from '@saccos/myra/components';

// TODO ( UPDATE THIS PAGE A/C TO DESIGN )
const ShareReport = () => {
  return <MemberTable />;
};

ShareReport.getLayout = function getLayout(page: ReactElement) {
  return <ShareLayout headingText="Share Report">{page}</ShareLayout>;
};
export default ShareReport;
