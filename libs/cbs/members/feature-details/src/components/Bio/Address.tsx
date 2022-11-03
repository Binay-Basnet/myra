import { useRouter } from 'next/router';

import { useGetMemberDetailsOverviewQuery } from '@coop/cbs/data-access';
import { DetailCardContent, DetailsCard } from '@coop/shared/ui';

export const MemberAddressInfo = () => {
  const router = useRouter();
  const memberDetails = useGetMemberDetailsOverviewQuery({
    id: router.query['id'] as string,
  });

  const memberBasicInfo =
    memberDetails?.data?.members?.memberOverview?.data?.overview?.basicInformation;
  return (
    <DetailsCard title="Address" bg="white">
      <DetailCardContent title="Currrent Address" subtitle={memberBasicInfo?.address?.local} />

      <DetailCardContent title="Permanent Address" subtitle={memberBasicInfo?.address?.local} />
    </DetailsCard>
  );
};
