import { ReactElement, useState } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { MemberDetails } from '@coop/cbs/members/details';
import { MemberPagesLayout } from '@coop/cbs/members/list';

const MemberDEtailsPage = () => {
  const [isAddMinorModalOpen, setIsAddMinorAccountModalOpen] = useState(false);
  const handleMinorAccountClose = () => {
    setIsAddMinorAccountModalOpen(false);
  };

  return (
    <MemberDetails
      isAddMinorModalOpen={isAddMinorModalOpen}
      handleMinorAccountClose={handleMinorAccountClose}
      options={[{ label: 'Add Minor', handler: () => setIsAddMinorAccountModalOpen(true) }]}
    />
  );
};
MemberDEtailsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <MemberPagesLayout>{page}</MemberPagesLayout>
    </MainLayout>
  );
};

export default MemberDEtailsPage;
