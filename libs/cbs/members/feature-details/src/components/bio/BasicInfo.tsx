import { useRouter } from 'next/router';

import { DetailCardContent, DetailsCard } from '@myra-ui';

import { useGetMemberOverviewBioDetailsQuery } from '@coop/cbs/data-access';

export const MemberBasicInfo = () => {
  const router = useRouter();

  const memberBioData = useGetMemberOverviewBioDetailsQuery({
    id: router.query['id'] as string,
  });

  const bioDataInd =
    memberBioData?.data?.members?.memberOverview?.data?.bio?.__typename === 'IndividualBio'
      ? memberBioData?.data?.members?.memberOverview?.data?.bio
      : null;
  return (
    <DetailsCard title="Basic Information" bg="white">
      <DetailCardContent title="Full Name" subtitle={bioDataInd?.memberName} />
      <DetailCardContent title="Gender" subtitle={bioDataInd?.gender?.local} />
    </DetailsCard>
  );
};
