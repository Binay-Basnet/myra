import { useRouter } from 'next/router';

import { DetailCardContent, DetailsCard } from '@myra-ui';

import { useGetMemberKymDetailsBioQuery } from '@coop/cbs/data-access';

export const MemberAddressInfo = () => {
  const router = useRouter();

  const memberBioData = useGetMemberKymDetailsBioQuery({
    id: router.query['id'] as string,
  });

  const bioDataInd =
    memberBioData?.data?.members?.memberOverviewV2?.bio?.data?.__typename === 'IndividualBio'
      ? memberBioData?.data?.members?.memberOverviewV2?.bio?.data
      : null;
  return (
    <DetailsCard title="Address" bg="white">
      <DetailCardContent title="Currrent Address" subtitle={bioDataInd?.currentAddress?.local} />

      <DetailCardContent title="Permanent Address" subtitle={bioDataInd?.permanentAddress?.local} />
    </DetailsCard>
  );
};
