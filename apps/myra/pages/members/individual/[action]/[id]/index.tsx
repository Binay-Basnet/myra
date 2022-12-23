import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { KYMIndividualPage } from '@coop/cbs/kym-form/feature-individual';

const AddMember = () => <KYMIndividualPage />;

AddMember.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default AddMember;
