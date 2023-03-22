import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { KYMCooperativeUnionPage } from '@coop/cbs/kym-form/cooperative-union';

const AddMember = () => <KYMCooperativeUnionPage />;

AddMember.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};

export default AddMember;
