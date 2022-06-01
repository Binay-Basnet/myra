import { ShareLayout, ShareRegisterTable } from '@saccos/myra/components';
import { ReactElement } from 'react';

// TODO ( UPDATE THIS PAGE A/C TO DESIGN )
const ShareReport = () => {
  return <ShareRegisterTable />;
};

ShareReport.getLayout = function getLayout(page: ReactElement) {
  return (
    <ShareLayout rows={true} headingText="Share Report">
      {page}
    </ShareLayout>
  );
};
export default ShareReport;
