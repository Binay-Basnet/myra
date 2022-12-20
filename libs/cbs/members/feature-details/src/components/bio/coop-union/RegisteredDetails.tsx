import { useRouter } from 'next/router';

import { DetailCardContent, DetailsCard } from '@myra-ui';

import { useGetMemberOverviewBioDetailsQuery } from '@coop/cbs/data-access';

export const RegisteredDetails = () => {
  const router = useRouter();
  const memberBioData = useGetMemberOverviewBioDetailsQuery({
    id: router.query['id'] as string,
  });

  const bioDataCoopUnion =
    memberBioData?.data?.members?.memberOverview?.data?.bio?.__typename === 'CoopUnionBio'
      ? memberBioData?.data?.members?.memberOverview?.data?.bio?.registrationDetails
      : null;

  return (
    <DetailsCard title="Registered Details" bg="white" hasThreeRows>
      <DetailCardContent title="Registered Number" subtitle={bioDataCoopUnion?.registeredNo} />
      <DetailCardContent title="Issuing Office" subtitle={bioDataCoopUnion?.issuingOffice} />
      <DetailCardContent title="Province" subtitle={bioDataCoopUnion?.address?.state?.local} />
      <DetailCardContent title="District" subtitle={bioDataCoopUnion?.address?.district?.local} />
      <DetailCardContent
        title="Local Government"
        subtitle={bioDataCoopUnion?.address?.localGovernment?.local}
      />
      <DetailCardContent title="Ward No" subtitle={bioDataCoopUnion?.address?.wardNo} />
      <DetailCardContent title="Locality" subtitle={bioDataCoopUnion?.address?.locality?.local} />
      <DetailCardContent title="House No" subtitle={bioDataCoopUnion?.address?.houseNo} />
    </DetailsCard>
  );
};
