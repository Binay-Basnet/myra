import { useRouter } from 'next/router';

import { DetailCardContent, DetailsCard } from '@myra-ui';

import { useGetMemberKymDetailsBioQuery } from '@coop/cbs/data-access';

export const BankAccountDetails = () => {
  const router = useRouter();
  const memberBioData = useGetMemberKymDetailsBioQuery({
    id: router.query['id'] as string,
  });

  const bioDataCoopUnion =
    memberBioData?.data?.members?.memberOverviewV2?.bio?.data?.__typename === 'CoopUnionBio'
      ? memberBioData?.data?.members?.memberOverviewV2?.bio?.data?.bankAccDetails
      : null;
  return (
    <DetailsCard title="Basic Account Details" bg="white" hasThreeRows>
      <DetailCardContent title="Name of Bank " subtitle={bioDataCoopUnion?.bank} />
      <DetailCardContent title="Account Number" subtitle={bioDataCoopUnion?.accountNumber} />
      <DetailCardContent title="Account Name" subtitle={bioDataCoopUnion?.accountName} />
    </DetailsCard>
  );
};
