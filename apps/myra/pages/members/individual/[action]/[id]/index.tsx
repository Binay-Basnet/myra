import { ReactElement } from 'react';

import { KYMIndividualPage } from '@coop/cbs/kym-form/feature-individual';
import { MainLayout } from '@myra-ui';

const AddMember = () => <KYMIndividualPage />;

AddMember.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default AddMember;
