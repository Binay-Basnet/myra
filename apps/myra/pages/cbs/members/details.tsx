import { ReactElement, useState } from 'react';

import { MainLayout } from '@myra-ui';

import { MemberDetails, MemberDetailsPathBar } from '@coop/cbs/members/details';
import { MemberPagesLayout } from '@coop/cbs/members/list';

const MemberDEtailsPage = () => {
  const [isAddMinorModalOpen, setIsAddMinorAccountModalOpen] = useState(false);
  const handleMinorAccountClose = () => {
    setIsAddMinorAccountModalOpen(false);
  };

  return (
    <>
      <MemberDetailsPathBar
        title="Member List"
        options={[{ label: 'Add Minor', handler: () => setIsAddMinorAccountModalOpen(true) }]}
      />
      <MemberDetails
        isAddMinorModalOpen={isAddMinorModalOpen}
        handleMinorAccountClose={handleMinorAccountClose}
      />
    </>
  );
};
MemberDEtailsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <MemberPagesLayout>{page}</MemberPagesLayout>{' '}
    </MainLayout>
  );
};

export default MemberDEtailsPage;
