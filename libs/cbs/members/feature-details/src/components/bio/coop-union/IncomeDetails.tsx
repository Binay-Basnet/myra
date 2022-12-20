import { useRouter } from 'next/router';

import { DetailCardContent, DetailsCard } from '@myra-ui';

import { useGetMemberOverviewBioDetailsQuery } from '@coop/cbs/data-access';
import { amountConverter } from '@coop/shared/utils';

export const IncomeDetails = () => {
  const router = useRouter();
  const memberBioData = useGetMemberOverviewBioDetailsQuery({
    id: router.query['id'] as string,
  });

  const bioDataCoopUnion =
    memberBioData?.data?.members?.memberOverview?.data?.bio?.__typename === 'CoopUnionBio'
      ? memberBioData?.data?.members?.memberOverview?.data?.bio?.incomeDetails
      : null;
  return (
    <DetailsCard title="Income Details" bg="white" hasThreeRows>
      <DetailCardContent
        title="Income from financial investment"
        subtitle={amountConverter(bioDataCoopUnion?.financialInvestment as number)}
      />
      <DetailCardContent
        title="Income from non financial investment
"
        subtitle={amountConverter(bioDataCoopUnion?.nonFinancialInvestment as number)}
      />
      <DetailCardContent
        title="Income from investment"
        subtitle={amountConverter(bioDataCoopUnion?.investment as number)}
      />
      <DetailCardContent
        title="Income from service operations"
        subtitle={amountConverter(bioDataCoopUnion?.serviceOperations as number)}
      />
      <DetailCardContent
        title="Income from sales"
        subtitle={amountConverter(bioDataCoopUnion?.sales as number)}
      />
      <DetailCardContent
        title="Other income"
        subtitle={amountConverter(bioDataCoopUnion?.otherIncome as number)}
      />
      <DetailCardContent
        title="Miscellanous income"
        subtitle={amountConverter(bioDataCoopUnion?.miscIncome as number)}
      />

      <DetailCardContent
        title="Total"
        subtitle={amountConverter(bioDataCoopUnion?.total as number)}
      />
    </DetailsCard>
  );
};
