import { useRouter } from 'next/router';

import { DetailCardContent, DetailsCard } from '@myra-ui';

import {
  IndividualBasicMinInfo,
  useGetMemberOverviewBasicDetailsQuery,
} from '@coop/cbs/data-access';

export const MemberContactInfo = () => {
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
    <DetailsCard title="Contact Details " bg="white">
      <DetailCardContent title="Mobile Number" subtitle={memberBasicInfo?.contactNumber} />

      <DetailCardContent title="Email Address" subtitle={memberBasicInfo?.email} />
    </DetailsCard>
  );
};
