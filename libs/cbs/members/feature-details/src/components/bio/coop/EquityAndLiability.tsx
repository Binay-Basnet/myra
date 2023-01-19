import { useRouter } from 'next/router';

import { DetailCardContent, DetailsCard } from '@myra-ui';

import { useGetMemberKymDetailsBioQuery } from '@coop/cbs/data-access';

export const EquityAndLiabilityCOOP = () => {
  const router = useRouter();
  const memberBioData = useGetMemberKymDetailsBioQuery({
    id: router.query['id'] as string,
  });

  const bioDataCoop =
    memberBioData?.data?.members?.memberOverviewV2?.bio?.data?.__typename === 'CoopBio'
      ? memberBioData?.data?.members?.memberOverviewV2?.bio?.data?.equityLiabilities
      : null;
  return (
    <DetailsCard title="Economic Details- Equity and Liabilities" bg="white" hasThreeRows>
      <DetailCardContent title="Share Capital" subtitle={bioDataCoop?.shareCapital} />
      <DetailCardContent title="Reserve and Surplus" subtitle={bioDataCoop?.reserveAndSurplus} />
      <DetailCardContent title="Saving/Deposit" subtitle={bioDataCoop?.savingDeposit} />
      <DetailCardContent title="Loan Account (External Loan)" subtitle={bioDataCoop?.loanAccount} />
      <DetailCardContent title="Capital Grant" subtitle={bioDataCoop?.capitalGrant} />
    </DetailsCard>
  );
};
