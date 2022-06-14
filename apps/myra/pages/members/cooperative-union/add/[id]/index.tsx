import React, { ReactElement } from 'react';
import { KYMIndividualPage } from '@coop/cbs/kym-form/feature-individual';
import { MainLayout } from '@coop/shared/ui';

const AddMember = () => {
  return <KYMIndividualPage />;
};

AddMember.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default AddMember;
