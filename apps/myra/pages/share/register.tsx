import { ReactElement } from 'react';
import { SharePageLayout, ShareRegisterTable } from '@saccos/myra/components';

// TODO ( Update this page when design arrives )
const ShareRegister = () => {
  return <ShareRegisterTable />;
};

ShareRegister.getLayout = function getLayout(page: ReactElement) {
  return <SharePageLayout mainTitle="Share Register">{page}</SharePageLayout>;
};
export default ShareRegister;
