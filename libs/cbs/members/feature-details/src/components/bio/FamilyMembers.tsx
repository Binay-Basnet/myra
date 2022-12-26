import { useRouter } from 'next/router';

import { DetailCardContent, DetailsCard } from '@myra-ui';

import { useGetMemberOverviewBioDetailsQuery } from '@coop/cbs/data-access';

export const MemberFamilyRelationsInfo = () => {
  const router = useRouter();

  const memberBioData = useGetMemberOverviewBioDetailsQuery({
    id: router.query['id'] as string,
  });

  const bioDataInd =
    memberBioData?.data?.members?.memberOverview?.data?.bio?.__typename === 'IndividualBio'
      ? memberBioData?.data?.members?.memberOverview?.data?.bio?.familyMembers
      : null;
  return (
    <DetailsCard title="Family Details" bg="white" hasThreeRows>
      {bioDataInd?.map((item) => (
        <>
          {' '}
          <DetailCardContent title="Relationship" subtitle={item?.relationship} />
          <DetailCardContent title="Full Name" subtitle={item?.fullName} />
          <DetailCardContent title="Date of Birth" subtitle={item?.dob?.local} />
        </>
      ))}
    </DetailsCard>
  );
};
