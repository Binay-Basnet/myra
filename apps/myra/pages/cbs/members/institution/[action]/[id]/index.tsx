import { ReactElement } from 'react';

import { KYMInstitutionPage } from '@coop/cbs/kym-form/institution';
import { MainLayout } from '@myra-ui';

const AddInstutition = () => <KYMInstitutionPage />;

AddInstutition.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default AddInstutition;
