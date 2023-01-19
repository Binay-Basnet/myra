import { useRouter } from 'next/router';

import { DetailCardContent, DetailsCard } from '@myra-ui';

import { useGetMemberKymDetailsBioQuery } from '@coop/cbs/data-access';

export const MemberBasicInfo = () => {
  const router = useRouter();

  const memberBioData = useGetMemberKymDetailsBioQuery({
    id: router.query['id'] as string,
  });

  const bioDataInd =
    memberBioData?.data?.members?.memberOverviewV2?.bio?.data?.__typename === 'IndividualBio'
      ? memberBioData?.data?.members?.memberOverviewV2?.bio?.data
      : null;
  return (
    <DetailsCard title="Basic Information" bg="white">
      <DetailCardContent title="Full Name" subtitle={bioDataInd?.memberName} />
      <DetailCardContent title="Gender" subtitle={bioDataInd?.gender?.local} />
    </DetailsCard>
  );
};
