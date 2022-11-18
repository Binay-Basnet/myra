import { useRouter } from 'next/router';

import { useGetMemberDetailsOverviewQuery } from '@coop/cbs/data-access';
import { DetailsCard } from '@coop/shared/ui';

import { UpcomingLoanPaymentTable } from './LoanPaymentUpcomingTable';

export const LoanPaymentTable = () => {
  const router = useRouter();

  const memberDetails = useGetMemberDetailsOverviewQuery({
    id: router.query['id'] as string,
  });
  const memberReportsDetails = memberDetails?.data?.members?.memberOverview?.data?.loan?.payments;

  const memberListData =
    memberReportsDetails?.map((data, index) => ({
      sn: Number(index) + 1,
      date: data?.date,
      accountName: data?.accountName,
      installmentNo: data?.installmentNo,
      interestRate: data?.interestRate,
      amount: data?.amount,
      paymentType: data?.paymentType,
    })) || [];
  return (
    <DetailsCard hasTable bg="white" title="Upcoming Payments">
      <UpcomingLoanPaymentTable data={memberListData} />
    </DetailsCard>
  );
};
