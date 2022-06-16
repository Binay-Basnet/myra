import React, { ReactElement } from 'react';
import { KYMCooperativeUnionPage } from '@coop/cbs/kym-form/cooperative-union';
import { MainLayout } from '@coop/shared/ui';

const AddMember = () => {
  return <KYMCooperativeUnionPage />;
};

AddMember.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default AddMember;
