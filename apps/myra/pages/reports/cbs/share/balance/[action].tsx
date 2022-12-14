import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { ShareBalanceReport } from '@coop/cbs/reports';

const NewShareBalanceReport = () => <ShareBalanceReport />;

export default NewShareBalanceReport;

NewShareBalanceReport.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
