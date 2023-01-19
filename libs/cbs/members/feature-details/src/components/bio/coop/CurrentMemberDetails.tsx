import { useRouter } from 'next/router';

import { DetailCardContent, DetailsCard } from '@myra-ui';

import { useGetMemberKymDetailsBioQuery } from '@coop/cbs/data-access';

export const CurrentMemberDetailsCOOP = () => {
  const router = useRouter();
  const memberBioData = useGetMemberKymDetailsBioQuery({
    id: router.query['id'] as string,
  });

  const bioDataCoop =
    memberBioData?.data?.members?.memberOverviewV2?.bio?.data?.__typename === 'CoopBio'
      ? memberBioData?.data?.members?.memberOverviewV2?.bio?.data?.currentMemberDetails
      : null;
  return (
    <DetailsCard title="Current Member Details" bg="white" hasThreeRows>
      <DetailCardContent title="No. of Male Members" subtitle={bioDataCoop?.noOfMaleMembers} />
      <DetailCardContent title="No. of Female Members" subtitle={bioDataCoop?.noOfFemaleMembers} />
      <DetailCardContent title="No. of Other Members" subtitle={bioDataCoop?.noOfOtherMembers} />
      <DetailCardContent title="Last Audit  Date" subtitle={bioDataCoop?.lastAuditDate?.local} />
    </DetailsCard>
  );
};
