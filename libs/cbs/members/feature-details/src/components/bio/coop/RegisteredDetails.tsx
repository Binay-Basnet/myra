import { useRouter } from 'next/router';

import { DetailCardContent, DetailsCard } from '@myra-ui';

import { useGetMemberKymDetailsBioQuery } from '@coop/cbs/data-access';

export const RegisteredDetails = () => {
  const router = useRouter();
  const memberBioData = useGetMemberKymDetailsBioQuery({
    id: router.query['id'] as string,
  });

  const bioDataCoop =
    memberBioData?.data?.members?.memberOverviewV2?.bio?.data?.__typename === 'CoopBio'
      ? memberBioData?.data?.members?.memberOverviewV2?.bio?.data?.registeredAddress
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
