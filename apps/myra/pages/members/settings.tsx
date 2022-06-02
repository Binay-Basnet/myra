import { ReactElement } from 'react';
import { MemberPagesLayout, MemberTable } from '@saccos/myra/components';
import { Box, MainLayout } from '@saccos/myra/ui';

const Member = () => {
  return (
    <Box width={'100%'}>
      <MemberTable />
    </Box>
  );
};

Member.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <MemberPagesLayout>{page}</MemberPagesLayout>{' '}
    </MainLayout>
  );
};

export default Member;
