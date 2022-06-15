import React, { ReactElement } from 'react';
import { KYMCooperativePage } from '@coop/cbs/kym-form/cooperative';
import { MainLayout } from '@coop/shared/ui';

const AddMember = () => {
  return <KYMCooperativePage />;
};

AddMember.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default AddMember;
