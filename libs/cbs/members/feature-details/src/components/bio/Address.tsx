import { useRouter } from 'next/router';

import { DetailCardContent, DetailsCard } from '@myra-ui';

import {
  IndividualBasicMinInfo,
  useGetMemberOverviewBasicDetailsQuery,
} from '@coop/cbs/data-access';

export const MemberAddressInfo = () => {
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
    <DetailsCard title="Address" bg="white">
      <DetailCardContent title="Currrent Address" subtitle={memberBasicInfo?.address?.local} />

      <DetailCardContent title="Permanent Address" subtitle={memberBasicInfo?.address?.local} />
    </DetailsCard>
  );
};
