import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { KYMInstitutionPage } from '@coop/cbs/kym-form/institution';

const AddInstutition = () => <KYMInstitutionPage />;

AddInstutition.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};

export default AddInstutition;
