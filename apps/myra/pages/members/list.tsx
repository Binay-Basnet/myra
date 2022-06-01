import { ReactElement } from 'react';
import { MemberPageLayout, MemberTable } from '@saccos/myra/components';

const MemberListPage = () => {
  return <MemberTable />;
};

MemberListPage.getLayout = function getLayout(page: ReactElement) {
  return <MemberPageLayout mainTitle="Member List">{page}</MemberPageLayout>;
};

export default MemberListPage;
