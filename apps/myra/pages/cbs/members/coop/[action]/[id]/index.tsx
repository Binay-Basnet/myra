import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { KYMCooperativePage } from '@coop/cbs/kym-form/cooperative';

const AddMember = () => <KYMCooperativePage />;

AddMember.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};

export default AddMember;
