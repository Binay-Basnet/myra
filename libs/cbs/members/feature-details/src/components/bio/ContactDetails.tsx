import { useRouter } from 'next/router';

import { DetailCardContent, DetailsCard } from '@myra-ui';

import { IndividualBio, useGetMemberOverviewBioDetailsQuery } from '@coop/cbs/data-access';

export const MemberContactInfo = () => {
  const router = useRouter();
  const memberBioData = useGetMemberOverviewBioDetailsQuery({
    id: router.query['id'] as string,
  });

  const memberBio =
    memberBioData?.data?.members?.memberOverview?.data?.bio?.__typename === 'IndividualBio'
      ? (memberBioData?.data?.members?.memberOverview?.data?.bio as IndividualBio)
      : null;

  return (
    <DetailsCard title="Contact Details " bg="white">
      <DetailCardContent title="Mobile Number" subtitle={memberBio?.mobile} />

      <DetailCardContent title="Email Address" subtitle={memberBio?.email} />
    </DetailsCard>
  );
};
