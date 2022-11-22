import { useRouter } from 'next/router';

import { useGetMemberDetailsOverviewQuery } from '@coop/cbs/data-access';
import { DetailCardContent, DetailsCard } from '@coop/shared/ui';

export const MemberFamilyInfo = () => {
  const router = useRouter();
  const memberDetails = useGetMemberDetailsOverviewQuery({
    id: router.query['id'] as string,
  });

  const memberBasicInfo =
    memberDetails?.data?.members?.memberOverview?.data?.overview?.basicInformation;
  return (
    <DetailsCard title="Family Details" bg="white">
      <DetailCardContent title="Marital Status" subtitle={memberBasicInfo?.maritalStatus?.local} />
    </DetailsCard>
  );
};
