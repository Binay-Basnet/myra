import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { YearEndClose } from '@coop/cbs/close-day';

const YearEndClosePage = () => <YearEndClose />;

YearEndClosePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
export default YearEndClosePage;
