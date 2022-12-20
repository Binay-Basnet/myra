import { useRouter } from 'next/router';

import { DetailCardContent, DetailsCard } from '@myra-ui';

import { useGetMemberOverviewBioDetailsQuery } from '@coop/cbs/data-access';

export const MemberAddressInfo = () => {
  const router = useRouter();

  const memberBioData = useGetMemberOverviewBioDetailsQuery({
    id: router.query['id'] as string,
  });

  const bioDataInd =
    memberBioData?.data?.members?.memberOverview?.data?.bio?.__typename === 'IndividualBio'
      ? memberBioData?.data?.members?.memberOverview?.data?.bio
      : null;
  return (
    <DetailsCard title="Address" bg="white">
      <DetailCardContent title="Currrent Address" subtitle={bioDataInd?.currentAddress?.local} />

      <DetailCardContent title="Permanent Address" subtitle={bioDataInd?.permanentAddress?.local} />
    </DetailsCard>
  );
};
