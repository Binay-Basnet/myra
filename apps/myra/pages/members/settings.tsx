import { ReactElement } from 'react';
import { MemberPagesLayout, MemberTable } from '@coop/myra/components';
import { Box, MainLayout } from '@coop/myra/ui';

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
