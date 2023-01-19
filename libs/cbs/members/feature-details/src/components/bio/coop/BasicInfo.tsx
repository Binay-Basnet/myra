import { useRouter } from 'next/router';

import { DetailCardContent, DetailsCard } from '@myra-ui';

import { useGetMemberKymDetailsBioQuery } from '@coop/cbs/data-access';

export const MemberCOOPBasicInfo = () => {
  const router = useRouter();
  const memberBioData = useGetMemberKymDetailsBioQuery({
    id: router.query['id'] as string,
  });

  const bioDataCoop =
    memberBioData?.data?.members?.memberOverviewV2?.bio?.data?.__typename === 'CoopBio'
      ? memberBioData?.data?.members?.memberOverviewV2?.bio?.data?.basicInfo
      : null;

  return (
    <DetailsCard title="Basic Information " bg="white" hasThreeRows>
      <DetailCardContent title="Name of Institution" subtitle={bioDataCoop?.memberName} />
      <DetailCardContent title="Registration No" subtitle={bioDataCoop?.registrationNo} />
      <DetailCardContent title="Registration Office" subtitle={bioDataCoop?.registrationOffice} />
      <DetailCardContent
        title="Registration Date"
        subtitle={bioDataCoop?.registrationDate?.local}
      />
    </DetailsCard>
  );
};
