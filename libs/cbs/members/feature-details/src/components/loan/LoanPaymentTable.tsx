import { useRouter } from 'next/router';

import { DetailsCard } from '@myra-ui';

import { useGetMemberKymDetailsLoanQuery } from '@coop/cbs/data-access';
import { amountConverter } from '@coop/shared/utils';

import { UpcomingLoanPaymentTable } from './LoanPaymentUpcomingTable';

export const LoanPaymentTable = () => {
  const router = useRouter();

  const memberDetails = useGetMemberKymDetailsLoanQuery({
    id: router.query['id'] as string,
  });
  const memberReportsDetails = memberDetails?.data?.members?.memberOverviewV2?.loan?.data?.payments;

  const memberListData =
    memberReportsDetails?.map((data, index) => ({
      sn: Number(index) + 1,
      id: data?.accountId,
      date: data?.date,
      accountName: data?.accountName,
      installmentNo: data?.installmentNo,
      interestRate: data?.interestRate,
      amount: amountConverter(data?.amount as string) as string,
      paymentType: data?.paymentType,
    })) || [];
  return (
    <DetailsCard hasTable bg="white" title="Upcoming Payments">
      <UpcomingLoanPaymentTable data={memberListData} />
    </DetailsCard>
  );
};
