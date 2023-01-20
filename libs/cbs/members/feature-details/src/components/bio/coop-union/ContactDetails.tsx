import { useRouter } from 'next/router';

import { DetailCardContent, DetailsCard } from '@myra-ui';

import { useGetMemberKymDetailsBioQuery } from '@coop/cbs/data-access';

export const ContactDetailsInstitution = () => {
  const router = useRouter();
  const memberBioData = useGetMemberKymDetailsBioQuery({
    id: router.query['id'] as string,
  });

  const bioDataCoopUnion =
    memberBioData?.data?.members?.memberOverviewV2?.bio?.data?.__typename === 'CoopUnionBio'
      ? memberBioData?.data?.members?.memberOverviewV2?.bio?.data?.contactDetails
      : null;
  return (
    <DetailsCard title="Contact Details" bg="white" hasThreeRows>
      <DetailCardContent title="Phone Number" subtitle={bioDataCoopUnion?.phoneNo} />
      <DetailCardContent title="Fax" subtitle={bioDataCoopUnion?.fax} />
      <DetailCardContent title="Email Address" subtitle={bioDataCoopUnion?.email} />
      <DetailCardContent title="Website" subtitle={bioDataCoopUnion?.website} />
      <DetailCardContent title="Post Box No" subtitle={bioDataCoopUnion?.poBoxNo} />
      <DetailCardContent title="Number of Employees" subtitle={bioDataCoopUnion?.noOfEmployees} />
      <DetailCardContent title="AGM Details" subtitle={bioDataCoopUnion?.agmDetails?.local} />
    </DetailsCard>
  );
};
