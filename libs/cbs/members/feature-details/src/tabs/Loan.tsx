import { useRouter } from 'next/router';

import { Box, DetailPageQuickLinks, Text } from '@myra-ui';

import { useGetMemberKymDetailsLoanQuery } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';

import { LoanAccountList, LoanPaymentTable, SkeletonDetails } from '../components';

export const Loan = () => {
  const router = useRouter();
  const id = router.query['id'] as string;
  const memberDetails = useGetMemberKymDetailsLoanQuery({
    id: router.query['id'] as string,
  });
  const isMemberLoanDetailsFetching = memberDetails?.isFetching;

  const links = [
    {
      title: 'New Loan Application',
      link: `${ROUTES.CBS_LOAN_APPLICATIONS_ADD}?memberId=${id}`,
    },
    {
      title: 'Loan Repayment',
      link: `${ROUTES.CBS_LOAN_REPAYMENTS_ADD}?memberId=${id}`,
    },
    // {
    //   title: 'Payment Schedules',
    //   link: `/loan?memberId=${id}`,
    // },
  ];
  return (
    <>
      {isMemberLoanDetailsFetching && <SkeletonDetails />}
      {!isMemberLoanDetailsFetching && (
        <Box display="flex" flexDirection="column" gap="s16">
          <Text fontSize="r3" fontWeight="600">
            Loan{' '}
          </Text>
          <Box display="flex" flexDirection="column" gap="s16">
            <DetailPageQuickLinks links={links} />
          </Box>
          <LoanAccountList />
          <LoanPaymentTable />
          <LoanAccountList isClosedAccount />
        </Box>
      )}
    </>
  );
};
