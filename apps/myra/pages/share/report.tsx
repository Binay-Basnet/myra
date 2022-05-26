import { ReactElement } from 'react';

import { ShareLayout } from '@saccos/myra/ui';
import { ShareTable } from '@saccos/myra/components';

// TODO ( UPDATE THIS PAGE A/C TO DESIGN )
const ShareReport = () => {
  return <ShareTable />;
};

ShareReport.getLayout = function getLayout(page: ReactElement) {
  return <ShareLayout headingText="Share Report">{page}</ShareLayout>;
};
export default ShareReport;
