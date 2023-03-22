import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { CbsCloseDay } from '@coop/cbs/close-day';

const DayClosePage = () => <CbsCloseDay />;

DayClosePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
export default DayClosePage;
