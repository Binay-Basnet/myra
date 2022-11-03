import { useRouter } from 'next/router';

import { useGetMemberDetailsOverviewQuery } from '@coop/cbs/data-access';
import { DetailCardContent, DetailsCard } from '@coop/shared/ui';

export const MemberBasicInfo = () => {
  const router = useRouter();
  const memberDetails = useGetMemberDetailsOverviewQuery({
    id: router.query['id'] as string,
  });

  const memberBasicInfo =
    memberDetails?.data?.members?.memberOverview?.data?.overview?.basicInformation;
  return (
    <DetailsCard title="Basic Information " bg="white">
      {memberBasicInfo?.memberName && (
        <DetailCardContent title="Full Name" subtitle={memberBasicInfo?.memberName} />
      )}
      <DetailCardContent title="Gender" subtitle={memberBasicInfo?.gender?.local} />
    </DetailsCard>
  );
};
