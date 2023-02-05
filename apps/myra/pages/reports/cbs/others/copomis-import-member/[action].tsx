import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { CopomisImportMemberReport } from '@coop/cbs/reports';

export const CopomisImportMember = () => <CopomisImportMemberReport />;

export default CopomisImportMember;

CopomisImportMember.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
