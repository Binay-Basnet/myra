import { ReactElement } from 'react';
import { MemberPageLayout, MemberTable } from '@saccos/myra/components';

const MemberReportPage = () => {
  return <MemberTable />;
};

MemberReportPage.getLayout = function getLayout(page: ReactElement) {
  return <MemberPageLayout>{page}</MemberPageLayout>;
};

export default MemberReportPage;
