import { useRouter } from 'next/router';

import { DetailCardContent, DetailsCard } from '@myra-ui';

import { useGetMemberOverviewBioDetailsQuery } from '@coop/cbs/data-access';

export const BankAccountDetails = () => {
  const router = useRouter();
  const memberBioData = useGetMemberOverviewBioDetailsQuery({
    id: router.query['id'] as string,
  });

  const bioDataInstitution =
    memberBioData?.data?.members?.memberOverview?.data?.bio?.__typename === 'InstitutionBio'
      ? memberBioData?.data?.members?.memberOverview?.data?.bio?.bankAcDetails
      : null;

  return (
    <DetailsCard title="Basic Account Details" bg="white" hasThreeRows>
      <DetailCardContent title="Name of Bank " subtitle={bioDataInstitution?.bank} />
      <DetailCardContent title="Account Number" subtitle={bioDataInstitution?.accountNumber} />
      <DetailCardContent title="Account Name" subtitle={bioDataInstitution?.accountName} />
    </DetailsCard>
  );
};
