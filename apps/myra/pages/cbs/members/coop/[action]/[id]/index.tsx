import React, { ReactElement } from 'react';

import { KYMCooperativePage } from '@coop/cbs/kym-form/cooperative';
import { MainLayout } from '@myra-ui';

const AddMember = () => <KYMCooperativePage />;

AddMember.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default AddMember;
