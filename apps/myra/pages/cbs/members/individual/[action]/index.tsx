import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { KYMIndividualPage } from '@coop/cbs/kym-form/feature-individual';

const AddMember = () => <KYMIndividualPage />;

AddMember.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};

export default AddMember;
