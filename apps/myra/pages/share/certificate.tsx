import { ShareLayout, ShareTable } from '@saccos/myra/components';
import { ReactElement } from 'react';

// TODO ( Update this page when design arrives )
const ShareCertificatePrint = () => {
  return <ShareTable />;
};

ShareCertificatePrint.getLayout = function getLayout(page: ReactElement) {
  return (
    <ShareLayout headingText={'Share Certificate Print'}>{page}</ShareLayout>
  );
};
export default ShareCertificatePrint;
