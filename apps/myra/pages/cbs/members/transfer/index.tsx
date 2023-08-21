import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { MemberTransfer } from '@coop/cbs/members/details';

export const MemberTransferPage = () => <MemberTransfer />;

MemberTransferPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};

export default MemberTransferPage;
