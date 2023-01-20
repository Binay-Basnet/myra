import { useRouter } from 'next/router';

import { DetailCardContent, DetailsCard } from '@myra-ui';

import { useGetMemberKymDetailsBioQuery } from '@coop/cbs/data-access';

export const RegisteredDetails = () => {
  const router = useRouter();
  const memberBioData = useGetMemberKymDetailsBioQuery({
    id: router.query['id'] as string,
  });

  const bioDataInstitution =
    memberBioData?.data?.members?.memberOverviewV2?.bio?.data?.__typename === 'InstitutionBio'
      ? memberBioData?.data?.members?.memberOverviewV2?.bio?.data?.registrationDetails
      : null;

  return (
    // const router = useRouter();
    // const memberDetails = useGetMemberDetailsOverviewQuery({
    //   id: router.query['id'] as string,
    // });

    // const memberBasicInfo =
    //   memberDetails?.data?.members?.memberOverview?.data?.overview?.basicInformation;
    <DetailsCard title="Registered Details" bg="white" hasThreeRows>
      <DetailCardContent
        title="Registered Number"
        subtitle={bioDataInstitution?.registeredNumber ?? '-'}
      />
      <DetailCardContent
        title="Issuing Office"
        subtitle={bioDataInstitution?.issuingOffice ?? '-'}
      />
      <DetailCardContent
        title="Province"
        subtitle={bioDataInstitution?.address?.state?.local ?? '-'}
      />
      <DetailCardContent
        title="District"
        subtitle={bioDataInstitution?.address?.district?.local ?? '-'}
      />
      <DetailCardContent
        title="Local Government"
        subtitle={bioDataInstitution?.address?.localGovernment?.local ?? '-'}
      />
      <DetailCardContent title="Ward No" subtitle={bioDataInstitution?.address?.wardNo ?? '-'} />
      <DetailCardContent
        title="Locality"
        subtitle={bioDataInstitution?.address?.locality?.local ?? '-'}
      />
      <DetailCardContent title="House No" subtitle={bioDataInstitution?.address?.houseNo ?? '-'} />
    </DetailsCard>
  );
};
