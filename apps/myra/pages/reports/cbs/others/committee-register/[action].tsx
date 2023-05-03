import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { BODDetailsRegisterReport } from '@coop/cbs/reports';

export const BODDETAILSRegisterPage = () => <BODDetailsRegisterReport />;

export default BODDETAILSRegisterPage;

BODDETAILSRegisterPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
