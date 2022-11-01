import { ReactElement } from 'react';

import { CbsCloseDay } from '@coop/cbs/close-day';
import { MainLayout } from '@coop/shared/ui';

const DayClosePage = () => <CbsCloseDay />;

DayClosePage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default DayClosePage;
