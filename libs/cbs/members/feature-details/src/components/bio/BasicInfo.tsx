import { useRouter } from 'next/router';

import { DetailCardContent, DetailsCard } from '@myra-ui';

import {
  IndividualBasicMinInfo,
  useGetMemberOverviewBasicDetailsQuery,
} from '@coop/cbs/data-access';

export const MemberBasicInfo = () => {
  const router = useRouter();
  const memberDetails = useGetMemberOverviewBasicDetailsQuery({
    id: router.query['id'] as string,
  });

  const memberBasicInfo =
    memberDetails?.data?.members?.memberOverview?.data?.overview?.basicInformation?.__typename ===
    'IndividualBasicMinInfo'
      ? (memberDetails?.data?.members?.memberOverview?.data?.overview
          ?.basicInformation as IndividualBasicMinInfo)
      : null;
  return (
    <DetailsCard title="Basic Information" bg="white">
      {memberBasicInfo && (
        <DetailCardContent title="Full Name" subtitle={memberBasicInfo?.memberName} />
      )}
      <DetailCardContent title="Gender" subtitle={memberBasicInfo?.gender?.local} />
    </DetailsCard>
  );
};
