import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { ShareBalanceReport } from '@coop/cbs/reports';

const NewShareBalanceReport = () => <ShareBalanceReport />;

export default NewShareBalanceReport;

NewShareBalanceReport.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
