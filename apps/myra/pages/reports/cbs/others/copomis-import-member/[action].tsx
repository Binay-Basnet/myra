import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { CopomisImportMemberReport } from '@coop/cbs/reports';

export const CopomisImportMember = () => <CopomisImportMemberReport />;

export default CopomisImportMember;

CopomisImportMember.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
