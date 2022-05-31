import { ShareLayout, ShareTable } from '@saccos/myra/components';
import { ReactElement } from 'react';

// TODO ( UPDATE THIS PAGE A/C TO DESIGN )
const ShareReportPage = () => {
  return <ShareTable />;
};

ShareReportPage.getLayout = function getLayout(page: ReactElement) {
  return <ShareLayout headingText="Share Report">{page}</ShareLayout>;
};
export default ShareReportPage;
