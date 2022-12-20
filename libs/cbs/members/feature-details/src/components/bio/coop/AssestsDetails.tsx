import { useRouter } from 'next/router';

import { DetailCardContent, DetailsCard } from '@myra-ui';

import { useGetMemberOverviewBioDetailsQuery } from '@coop/cbs/data-access';

export const AssestsCOOP = () => {
  const router = useRouter();
  const memberBioData = useGetMemberOverviewBioDetailsQuery({
    id: router.query['id'] as string,
  });

  const bioDataCoop =
    memberBioData?.data?.members?.memberOverview?.data?.bio?.__typename === 'CoopBio'
      ? memberBioData?.data?.members?.memberOverview?.data?.bio?.assetDetails
      : null;
  return (
    <DetailsCard title="Economic Details- Assets " bg="white" hasThreeRows>
      <DetailCardContent title="Cash and equivalents" subtitle={bioDataCoop?.cashAndEquivalents} />
      <DetailCardContent title="Bank" subtitle={bioDataCoop?.bank} />
      <DetailCardContent title="Investments" subtitle={bioDataCoop?.investments} />
      <DetailCardContent title="Loan (Investments)" subtitle={bioDataCoop?.loan} />
      <DetailCardContent title="Non-current assets" subtitle={bioDataCoop?.nonCurrentAssets} />
      <DetailCardContent
        title="Other Non-current assets"
        subtitle={bioDataCoop?.otherNonCurrentAssets}
      />
      <DetailCardContent title="Other" subtitle={bioDataCoop?.other} />
    </DetailsCard>
  );
};
