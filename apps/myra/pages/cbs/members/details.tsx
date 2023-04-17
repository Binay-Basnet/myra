import { ReactElement, useState } from 'react';
import { useRouter } from 'next/router';

import { MainLayout } from '@myra-ui';

import { useGetCertificateQuery } from '@coop/cbs/data-access';
import { MemberDetails } from '@coop/cbs/members/details';
import { MemberPagesLayout } from '@coop/cbs/members/list';

const MemberDEtailsPage = () => {
  const router = useRouter();

  const { data } = useGetCertificateQuery({ id: router?.query?.['id'] as string });

  const [isAddMinorModalOpen, setIsAddMinorAccountModalOpen] = useState(false);
  const handleMinorAccountClose = () => {
    setIsAddMinorAccountModalOpen(false);
  };

  const getCertificate = () => {
    window.open(data?.members?.issueCertificate, '_blank');
  };

  return (
    <MemberDetails
      isAddMinorModalOpen={isAddMinorModalOpen}
      handleMinorAccountClose={handleMinorAccountClose}
      options={[
        { label: 'Add Minor', handler: () => setIsAddMinorAccountModalOpen(true) },
        { label: 'Get Certificate', handler: getCertificate },
      ]}
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
