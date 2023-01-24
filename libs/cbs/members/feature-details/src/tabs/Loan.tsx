import { useRouter } from 'next/router';

import { Box, DetailPageQuickLinks, Text } from '@myra-ui';

import { ROUTES } from '@coop/cbs/utils';

import { LoanAccountList, LoanPaymentTable } from '../components';

export const Loan = () => {
  const router = useRouter();
  const id = router.query['id'] as string;

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
      <Text fontSize="r3" fontWeight="600">
        Loan{' '}
      </Text>
      <Box display="flex" flexDirection="column" gap="s16">
        <DetailPageQuickLinks links={links} />
      </Box>
      <LoanAccountList />
      <LoanPaymentTable />
    </>
  );
};
