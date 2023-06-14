import { ReactElement, useState } from 'react';
import { useRouter } from 'next/router';

import { MainLayout } from '@myra-ui';

import { CbsMinorMembersFeatureDetails, MemberDetails } from '@coop/cbs/members/details';
import { MemberPagesLayout } from '@coop/cbs/members/list';

const MemberDEtailsPage = () => {
  const router = useRouter();

  const [isAddMinorModalOpen, setIsAddMinorAccountModalOpen] = useState(false);
  const handleMinorAccountClose = () => {
    setIsAddMinorAccountModalOpen(false);
  };

  if (router?.query?.['type'] === 'minor') {
    return <CbsMinorMembersFeatureDetails />;
  }

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
