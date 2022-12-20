import { useRouter } from 'next/router';

import { DetailCardContent, DetailsCard } from '@myra-ui';

import { useGetMemberOverviewBioDetailsQuery } from '@coop/cbs/data-access';

export const MemberFamilyInfo = () => {
  const router = useRouter();

  const memberBioData = useGetMemberOverviewBioDetailsQuery({
    id: router.query['id'] as string,
  });

  const bioDataInd =
    memberBioData?.data?.members?.memberOverview?.data?.bio?.__typename === 'IndividualBio'
      ? memberBioData?.data?.members?.memberOverview?.data?.bio?.maritalStatus
      : null;

  return (
    <DetailsCard title="Family Details" bg="white">
      <DetailCardContent title="Marital Status" subtitle={bioDataInd?.local} />
    </DetailsCard>
  );
};
