import { ReactElement } from 'react';
import { SharePageLayout, ShareRegisterTable } from '@saccos/myra/components';

// TODO ( UPDATE THIS PAGE A/C TO DESIGN )
const ShareReport = () => {
  return <ShareRegisterTable />;
};

ShareReport.getLayout = function getLayout(page: ReactElement) {
  return <SharePageLayout mainTitle="Share Report">{page}</SharePageLayout>;
};
export default ShareReport;
