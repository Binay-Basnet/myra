import { useRouter } from 'next/router';

import { DetailCardContent, DetailsCard } from '@myra-ui';

import { useGetMemberOverviewBioDetailsQuery } from '@coop/cbs/data-access';

export const OperatingOfficeAddress = () => {
  const router = useRouter();
  const memberBioData = useGetMemberOverviewBioDetailsQuery({
    id: router.query['id'] as string,
  });

  const bioDataCoopUnion =
    memberBioData?.data?.members?.memberOverview?.data?.bio?.__typename === 'CoopUnionBio'
      ? memberBioData?.data?.members?.memberOverview?.data?.bio?.operatingAddress
      : null;
  return (
    <DetailsCard title="Operating Office Address" bg="white" hasThreeRows>
      <DetailCardContent title="Province" subtitle={bioDataCoopUnion?.state?.local} />
      <DetailCardContent title="District" subtitle={bioDataCoopUnion?.district?.local} />
      <DetailCardContent
        title="Local Government"
        subtitle={bioDataCoopUnion?.localGovernment?.local}
      />
      <DetailCardContent title="Ward No" subtitle={bioDataCoopUnion?.wardNo} />
      <DetailCardContent title="Locality" subtitle={bioDataCoopUnion?.locality?.local} />
      <DetailCardContent title="House No" subtitle={bioDataCoopUnion?.houseNo} />
    </DetailsCard>
  );
};
