import { useRouter } from 'next/router';

import { DetailCardContent, DetailsCard } from '@myra-ui';

import { useGetMemberOverviewBioDetailsQuery } from '@coop/cbs/data-access';

export const RegisteredDetails = () => {
  const router = useRouter();
  const memberBioData = useGetMemberOverviewBioDetailsQuery({
    id: router.query['id'] as string,
  });

  const bioDataCoop =
    memberBioData?.data?.members?.memberOverview?.data?.bio?.__typename === 'CoopBio'
      ? memberBioData?.data?.members?.memberOverview?.data?.bio?.registeredAddress
      : null;
  return (
    <DetailsCard title="Registered Address Details" bg="white" hasThreeRows>
      <DetailCardContent title="Province" subtitle={bioDataCoop?.state?.local} />
      <DetailCardContent title="District" subtitle={bioDataCoop?.district?.local} />
      <DetailCardContent title="Local Government" subtitle={bioDataCoop?.localGovernment?.local} />
      <DetailCardContent title="Ward No" subtitle={bioDataCoop?.wardNo} />
      <DetailCardContent title="Locality" subtitle={bioDataCoop?.locality?.local} />
      <DetailCardContent title="House No" subtitle={bioDataCoop?.houseNo} />
    </DetailsCard>
  );
};
