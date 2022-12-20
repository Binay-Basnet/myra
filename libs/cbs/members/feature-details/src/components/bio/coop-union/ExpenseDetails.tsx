import { useRouter } from 'next/router';

import { DetailCardContent, DetailsCard } from '@myra-ui';

import { useGetMemberOverviewBioDetailsQuery } from '@coop/cbs/data-access';
import { amountConverter } from '@coop/shared/utils';

export const ExpenseDetails = () => {
  const router = useRouter();
  const memberBioData = useGetMemberOverviewBioDetailsQuery({
    id: router.query['id'] as string,
  });

  const bioDataCoopUnion =
    memberBioData?.data?.members?.memberOverview?.data?.bio?.__typename === 'CoopUnionBio'
      ? memberBioData?.data?.members?.memberOverview?.data?.bio?.expenseDetails
      : null;
  return (
    <DetailsCard title="Expense Details" bg="white" hasThreeRows>
      <DetailCardContent
        title="Purchase"
        subtitle={amountConverter(bioDataCoopUnion?.purchase as number)}
      />
      <DetailCardContent
        title="Direct Expense"
        subtitle={amountConverter(bioDataCoopUnion?.directExpense as number)}
      />
      <DetailCardContent
        title="Adminsitrative Expense"
        subtitle={amountConverter(bioDataCoopUnion?.adminExpense as number)}
      />
      <DetailCardContent
        title="Financial Cost"
        subtitle={amountConverter(bioDataCoopUnion?.financialCost as number)}
      />
      <DetailCardContent
        title="Risk Management Expense"
        subtitle={amountConverter(bioDataCoopUnion?.riskManagement as number)}
      />
      <DetailCardContent
        title="Deffered tax Expense"
        subtitle={amountConverter(bioDataCoopUnion?.deferredTax as number)}
      />

      <DetailCardContent
        title="Total"
        subtitle={amountConverter(bioDataCoopUnion?.total as number)}
      />
    </DetailsCard>
  );
};
