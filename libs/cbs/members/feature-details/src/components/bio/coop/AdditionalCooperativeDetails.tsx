import { useRouter } from 'next/router';

import { DetailCardContent, DetailsCard } from '@myra-ui';

import { useGetMemberOverviewBioDetailsQuery } from '@coop/cbs/data-access';

export const AdditionalCoopDetails = () => {
  const router = useRouter();
  const memberBioData = useGetMemberOverviewBioDetailsQuery({
    id: router.query['id'] as string,
  });

  const bioDataCoop =
    memberBioData?.data?.members?.memberOverview?.data?.bio?.__typename === 'CoopBio'
      ? memberBioData?.data?.members?.memberOverview?.data?.bio?.additionalCoopDetails
      : null;
  return (
    <DetailsCard title="Additional Cooperative Details " bg="white" hasThreeRows>
      <DetailCardContent title="Cooperative Type" subtitle={bioDataCoop?.coopType} />
      <DetailCardContent
        title="Main Service / Product"
        subtitle={bioDataCoop?.mainServiceProduct}
      />
    </DetailsCard>
  );
};
