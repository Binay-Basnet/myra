import { useRouter } from 'next/router';

import { DetailCardContent, DetailsCard } from '@myra-ui';

import { useGetMemberKymDetailsBioQuery } from '@coop/cbs/data-access';

export const BankDetails = () => {
  const router = useRouter();

  const memberBioData = useGetMemberKymDetailsBioQuery({
    id: router.query['id'] as string,
  });

  const bioDataInd =
    memberBioData?.data?.members?.memberOverviewV2?.bio?.data?.__typename === 'IndividualBio'
      ? memberBioData?.data?.members?.memberOverviewV2?.bio?.data
      : null;

  return (
    <DetailsCard title="Bank Details" bg="white">
      <DetailCardContent title="Bank" subtitle={bioDataInd?.bankName} />

      <DetailCardContent title="Account Number" subtitle={bioDataInd?.bankAccountId} />
    </DetailsCard>
  );
};
