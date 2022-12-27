import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { KYMCooperativeUnionPage } from '@coop/cbs/kym-form/cooperative-union';

const AddMember = () => <KYMCooperativeUnionPage />;

AddMember.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default AddMember;
