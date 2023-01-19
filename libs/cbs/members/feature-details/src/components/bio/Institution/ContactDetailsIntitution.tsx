import { useRouter } from 'next/router';

import { DetailCardContent, DetailsCard } from '@myra-ui';

import { useGetMemberKymDetailsBioQuery } from '@coop/cbs/data-access';

export const ContactDetailsInstitution = () => {
  const router = useRouter();
  const memberBioData = useGetMemberKymDetailsBioQuery({
    id: router.query['id'] as string,
  });

  const bioDataInstitution =
    memberBioData?.data?.members?.memberOverviewV2?.bio?.data?.__typename === 'InstitutionBio'
      ? memberBioData?.data?.members?.memberOverviewV2?.bio?.data?.contactDetails
      : null;
  return (
    <DetailsCard title="Contact Details" bg="white" hasThreeRows>
      <DetailCardContent title="Phone Number" subtitle={bioDataInstitution?.phoneNumber ?? '-'} />
      <DetailCardContent title="Fax" subtitle={bioDataInstitution?.fax ?? '-'} />
      <DetailCardContent title="Email Address" subtitle={bioDataInstitution?.email ?? '-'} />
      <DetailCardContent title="Website" subtitle={bioDataInstitution?.website ?? '-'} />
      <DetailCardContent title="Post Box No" subtitle={bioDataInstitution?.poBoxNo ?? '-'} />
      <DetailCardContent
        title="Number of Employees"
        subtitle={bioDataInstitution?.noOfEmployees ?? '-'}
      />
      <DetailCardContent
        title="AGM Details"
        subtitle={bioDataInstitution?.agmDetails?.local ?? '-'}
      />
    </DetailsCard>
  );
};
