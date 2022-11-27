import { useRouter } from 'next/router';

import { useGetMemberDetailsOverviewQuery } from '@coop/cbs/data-access';
import { DetailCardContent, DetailsCard } from '@myra-ui';

export const MemberContactInfo = () => {
  const router = useRouter();
  const memberDetails = useGetMemberDetailsOverviewQuery({
    id: router.query['id'] as string,
  });

  const memberBasicInfo =
    memberDetails?.data?.members?.memberOverview?.data?.overview?.basicInformation;
  return (
    <DetailsCard title="Contact Details " bg="white">
      <DetailCardContent title="Mobile Number" subtitle={memberBasicInfo?.contactNumber} />

      <DetailCardContent title="Email Address" subtitle={memberBasicInfo?.email} />
    </DetailsCard>
  );
};
