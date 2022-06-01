import { ReactElement } from 'react';
import { MemberPageLayout, MemberTable } from '@saccos/myra/components';
import { Box } from '@saccos/myra/ui';

const Member = () => {
  return (
    <Box width={'100%'}>
      <MemberTable />
    </Box>
  );
};

Member.getLayout = function getLayout(page: ReactElement) {
  return (
    <MemberPageLayout mainTitle="Member Settings">{page}</MemberPageLayout>
  );
};

export default Member;
