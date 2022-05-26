import { ReactElement } from 'react';

import { ShareLayout } from '@saccos/myra/ui';
import { ShareTable } from '@saccos/myra/components';

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
