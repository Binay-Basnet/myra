import { useRouter } from 'next/router';

import { DetailCardContent, DetailsCard } from '@myra-ui';

import { InstitutionBio, useGetMemberKymDetailsBioQuery } from '@coop/cbs/data-access';

export const MemberInstitutionBasicInfo = () => {
  const router = useRouter();
  const memberBioData = useGetMemberKymDetailsBioQuery({
    id: router.query['id'] as string,
  });

  const bioDataInstitution =
    memberBioData?.data?.members?.memberOverviewV2?.bio?.data?.__typename === 'InstitutionBio'
      ? (memberBioData?.data?.members?.memberOverviewV2?.bio?.data as InstitutionBio)
      : null;

  return (
    // const router = useRouter();
    // const memberDetails = useGetMemberDetailsOverviewQuery({
    //   id: router.query['id'] as string,
    // });

    // const memberBasicInfo =
    //   memberDetails?.data?.members?.memberOverview?.data?.overview?.basicInformation;
    <DetailsCard title="Basic Information " bg="white" hasThreeRows>
      <DetailCardContent
        title="Name of Institution"
        subtitle={bioDataInstitution?.basicInfo?.memberName}
      />
      <DetailCardContent
        title="Institution Type"
        subtitle={bioDataInstitution?.basicInfo?.type ?? '-'}
      />
      <DetailCardContent
        title="Nature of Institution"
        subtitle={bioDataInstitution?.basicInfo?.nature ?? '-'}
      />
      <DetailCardContent
        title="Registration Details"
        subtitle={bioDataInstitution?.basicInfo?.registrationDate?.local ?? '-'}
      />
      <DetailCardContent
        title="VAT/PAN"
        subtitle={bioDataInstitution?.basicInfo?.vatPanNo ?? '-'}
      />
      <DetailCardContent
        title="Number of Service Center"
        subtitle={bioDataInstitution?.basicInfo?.noOfServiceCenters ?? '-'}
      />
    </DetailsCard>
  );
};
