import { useRouter } from 'next/router';

import { DetailCardContent, DetailsCard } from '@myra-ui';

import {
  IndividualBasicMinInfo,
  useGetMemberOverviewBasicDetailsQuery,
} from '@coop/cbs/data-access';

export const MemberFamilyRelationsInfo = () => {
  const router = useRouter();
  const memberDetails = useGetMemberOverviewBasicDetailsQuery({
    id: router.query['id'] as string,
  });

  const memberBasicInfoData =
    memberDetails?.data?.members?.memberOverview?.data?.overview?.basicInformation?.__typename ===
    'IndividualBasicMinInfo'
      ? (memberDetails?.data?.members?.memberOverview?.data?.overview
          ?.basicInformation as IndividualBasicMinInfo)
      : null;
  const memberBasicInfo = memberBasicInfoData?.familyMembers;
  return (
    <DetailsCard title="Family Details" bg="white" hasThreeRows>
      {memberBasicInfo?.map((item) => (
        <>
          {' '}
          <DetailCardContent title="Relationship" subtitle={item?.relationship} />
          <DetailCardContent title="Full Name" subtitle={item?.fullName} />
          <DetailCardContent title="Date of Birth" subtitle={item?.dob} />
        </>
      ))}
    </DetailsCard>
  );
};
