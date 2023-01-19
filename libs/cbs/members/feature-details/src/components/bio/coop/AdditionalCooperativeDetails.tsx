import { useRouter } from 'next/router';

import { DetailCardContent, DetailsCard } from '@myra-ui';

import { useGetMemberKymDetailsBioQuery } from '@coop/cbs/data-access';

export const AdditionalCoopDetails = () => {
  const router = useRouter();
  const memberBioData = useGetMemberKymDetailsBioQuery({
    id: router.query['id'] as string,
  });

  const bioDataCoop =
    memberBioData?.data?.members?.memberOverviewV2?.bio?.data?.__typename === 'CoopBio'
      ? memberBioData?.data?.members?.memberOverviewV2?.bio?.data?.additionalCoopDetails
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
