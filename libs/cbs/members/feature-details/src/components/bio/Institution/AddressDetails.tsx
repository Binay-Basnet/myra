import { useRouter } from 'next/router';

import { DetailCardContent, DetailsCard } from '@myra-ui';

import { useGetMemberOverviewBioDetailsQuery } from '@coop/cbs/data-access';

export const AddressDetails = () => {
  const router = useRouter();
  const memberBioData = useGetMemberOverviewBioDetailsQuery({
    id: router.query['id'] as string,
  });

  const bioDataInstitution =
    memberBioData?.data?.members?.memberOverview?.data?.bio?.__typename === 'InstitutionBio'
      ? memberBioData?.data?.members?.memberOverview?.data?.bio?.addressDetails
      : null;

  return (
    // const router = useRouter();
    // const memberDetails = useGetMemberDetailsOverviewQuery({
    //   id: router.query['id'] as string,
    // });

    // const memberBasicInfo =
    //   memberDetails?.data?.members?.memberOverview?.data?.overview?.basicInformation;
    <DetailsCard title="Address Details" bg="white" hasThreeRows>
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
