import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { CharKhataReport } from '@coop/cbs/reports';

const CharkhataReportPage = () => <CharKhataReport />;

export default CharkhataReportPage;

CharkhataReportPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
