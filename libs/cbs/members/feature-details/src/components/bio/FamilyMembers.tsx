import { useRouter } from 'next/router';

import { useGetMemberDetailsOverviewQuery } from '@coop/cbs/data-access';
import { DetailCardContent, DetailsCard } from '@coop/shared/ui';

export const MemberFamilyRelationsInfo = () => {
  const router = useRouter();
  const memberDetails = useGetMemberDetailsOverviewQuery({
    id: router.query['id'] as string,
  });

  const memberBasicInfo =
    memberDetails?.data?.members?.memberOverview?.data?.overview?.basicInformation?.familyMembers;
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
