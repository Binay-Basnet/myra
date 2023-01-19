import { useRouter } from 'next/router';

import { DetailCardContent, DetailsCard } from '@myra-ui';

import { useGetMemberKymDetailsBioQuery } from '@coop/cbs/data-access';

export const OperatingOfficeAddress = () => {
  const router = useRouter();
  const memberBioData = useGetMemberKymDetailsBioQuery({
    id: router.query['id'] as string,
  });

  const bioDataInstitution =
    memberBioData?.data?.members?.memberOverviewV2?.bio?.data?.__typename === 'InstitutionBio'
      ? memberBioData?.data?.members?.memberOverviewV2?.bio?.data?.operatingOfficeAddress
      : null;

  return (
    // const router = useRouter();
    // const memberDetails = useGetMemberDetailsOverviewQuery({
    //   id: router.query['id'] as string,
    // });

    // const memberBasicInfo =
    //   memberDetails?.data?.members?.memberOverview?.data?.overview?.basicInformation;
    <DetailsCard title="Operating Office Address" bg="white" hasThreeRows>
      <DetailCardContent title="Province" subtitle={bioDataInstitution?.state?.local ?? '-'} />
      <DetailCardContent title="District" subtitle={bioDataInstitution?.district?.local ?? '-'} />
      <DetailCardContent
        title="Local Government"
        subtitle={bioDataInstitution?.localGovernment?.local ?? '-'}
      />
      <DetailCardContent title="Ward No" subtitle={bioDataInstitution?.wardNo ?? '-'} />
      <DetailCardContent title="Locality" subtitle={bioDataInstitution?.locality?.local ?? '-'} />
      <DetailCardContent title="House No" subtitle={bioDataInstitution?.houseNo ?? '-'} />
    </DetailsCard>
  );
};
