import { ShareLayout, ShareRegisterTable } from '@saccos/myra/components';
import { ReactElement } from 'react';

// TODO ( Update this page when design arrives )
const ShareRegister = () => {
  return <ShareRegisterTable />;
};

ShareRegister.getLayout = function getLayout(page: ReactElement) {
  return (
    <ShareLayout rows={true} headingText={'Share Register'}>
      {page}
    </ShareLayout>
  );
};
export default ShareRegister;
