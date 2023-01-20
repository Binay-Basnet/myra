import { useRouter } from 'next/router';

import { DetailCardContent, DetailsCard } from '@myra-ui';

import { IndividualBio, useGetMemberKymDetailsBioQuery } from '@coop/cbs/data-access';

export const MemberContactInfo = () => {
  const router = useRouter();
  const memberBioData = useGetMemberKymDetailsBioQuery({
    id: router.query['id'] as string,
  });

  const memberBio =
    memberBioData?.data?.members?.memberOverviewV2?.bio?.data?.__typename === 'IndividualBio'
      ? (memberBioData?.data?.members?.memberOverviewV2?.bio?.data as IndividualBio)
      : null;

  return (
    <DetailsCard title="Contact Details " bg="white">
      <DetailCardContent title="Mobile Number" subtitle={memberBio?.mobile} />

      <DetailCardContent title="Email Address" subtitle={memberBio?.email} />
    </DetailsCard>
  );
};
