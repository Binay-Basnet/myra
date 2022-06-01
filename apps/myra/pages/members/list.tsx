import { ReactElement } from 'react';
import { MemberPageLayout, MemberTable } from '@saccos/myra/components';

const MemberListPage = () => {
  return <MemberTable />;
};

MemberListPage.getLayout = function getLayout(page: ReactElement) {
  return <MemberPageLayout>{page}</MemberPageLayout>;
};

export default MemberListPage;
