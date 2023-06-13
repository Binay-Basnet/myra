import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { TagKhataReport } from '@coop/cbs/reports';

const Report = () => <TagKhataReport />;

export default Report;

Report.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
