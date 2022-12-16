import { useRouter } from 'next/router';

import { DetailCardContent, DetailsCard } from '@myra-ui';

import { useGetMemberOverviewBioDetailsQuery } from '@coop/cbs/data-access';

export const AccountHolderDecleration = () => {
  const router = useRouter();
  const memberBioData = useGetMemberOverviewBioDetailsQuery({
    id: router.query['id'] as string,
  });

  const bioDataInstitution =
    memberBioData?.data?.members?.memberOverview?.data?.bio?.__typename === 'InstitutionBio'
      ? memberBioData?.data?.members?.memberOverview?.data?.bio?.declaration
      : null;

  return (
    // const router = useRouter();
    // const memberDetails = useGetMemberDetailsOverviewQuery({
    //   id: router.query['id'] as string,
    // });

    // const memberBasicInfo =
    //   memberDetails?.data?.members?.memberOverview?.data?.overview?.basicInformation;
    <DetailsCard title="Account Holder Declaration" bg="white" hasThreeRows>
      <DetailCardContent title="Name" subtitle={bioDataInstitution?.name} />
      <DetailCardContent title="Phone" subtitle={bioDataInstitution?.phoneNo} />
      <DetailCardContent title="Email" subtitle={bioDataInstitution?.email} />
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
