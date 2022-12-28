import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { CbsCloseDay } from '@coop/cbs/close-day';

const DayClosePage = () => <CbsCloseDay />;

DayClosePage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default DayClosePage;
