import { ReactElement } from 'react';

import { ShareLayout } from '@saccos/myra/ui';
import { MemberTable } from '@saccos/myra/components';

// TODO ( Update this page when design arrives )
const ShareCertificatePrint = () => {
  return <MemberTable />;
};

ShareCertificatePrint.getLayout = function getLayout(page: ReactElement) {
  return (
    <ShareLayout headingText={'Share Certificate Print'}>{page}</ShareLayout>
  );
};
export default ShareCertificatePrint;
