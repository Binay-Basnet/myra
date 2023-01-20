import { useRouter } from 'next/router';

import { DetailCardContent, DetailsCard } from '@myra-ui';

import { useGetMemberKymDetailsBioQuery } from '@coop/cbs/data-access';

export const MemberCooperativeUnionBasicInfo = () => {
  const router = useRouter();
  const memberBioData = useGetMemberKymDetailsBioQuery({
    id: router.query['id'] as string,
  });

  const bioDataCoopUnion =
    memberBioData?.data?.members?.memberOverviewV2?.bio?.data?.__typename === 'CoopUnionBio'
      ? memberBioData?.data?.members?.memberOverviewV2?.bio?.data?.basicInfo
      : null;
  return (
    <DetailsCard title="Basic Information " bg="white" hasThreeRows>
      <DetailCardContent title="Name of Institution" subtitle={bioDataCoopUnion?.memberName} />
      <DetailCardContent title="Institution Type" subtitle={bioDataCoopUnion?.type} />
      <DetailCardContent title="Nature of Institution" subtitle={bioDataCoopUnion?.nature} />
      <DetailCardContent
        title="Registration Date"
        subtitle={bioDataCoopUnion?.registrationDate?.local}
      />
      <DetailCardContent title="VAT/PAN" subtitle={bioDataCoopUnion?.vatPanNo} />
      <DetailCardContent
        title="Number of Service Center"
        subtitle={bioDataCoopUnion?.noOfServiceCenters}
      />
    </DetailsCard>
  );
};
