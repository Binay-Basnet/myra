import { useRouter } from 'next/router';

import { DetailCardContent, DetailsCard } from '@myra-ui';

import { useGetMemberKymDetailsBioQuery } from '@coop/cbs/data-access';

export const MemberFamilyRelationsInfo = () => {
  const router = useRouter();

  const memberBioData = useGetMemberKymDetailsBioQuery({
    id: router.query['id'] as string,
  });

  const bioDataInd =
    memberBioData?.data?.members?.memberOverviewV2?.bio?.data?.__typename === 'IndividualBio'
      ? memberBioData?.data?.members?.memberOverviewV2?.bio?.data?.familyMembers
      : null;

  return (
    <DetailsCard title="Family Members" bg="white" hasThreeRows>
      {bioDataInd?.map((item) => (
        <>
          <DetailCardContent title="Relationship" subtitle={item?.relationship} />
          <DetailCardContent title="Full Name" subtitle={item?.fullName} />
          <DetailCardContent title="Date of Birth" subtitle={item?.dob?.local} />
        </>
      ))}
    </DetailsCard>
  );
};
