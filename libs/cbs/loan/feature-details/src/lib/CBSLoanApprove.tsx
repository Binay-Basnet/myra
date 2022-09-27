import { useCallback } from 'react';
import { useRouter } from 'next/router';

import { LoanApproveOrCancel, useApproveLoanAccountMutation } from '@coop/cbs/data-access';
import { CBSLoanDetails, LoanDetailsHeader } from '@coop/cbs/loan/details';
import { asyncToast, Box, Button, FormFooter } from '@coop/shared/ui';

import { useLoanDetails } from '../hooks/useLoanDetails';

export const CBSLoanApprove = () => {
  const router = useRouter();
  const { loan } = useLoanDetails();

  const { id } = router.query;

  const { mutateAsync } = useApproveLoanAccountMutation();

  const approveLoan = useCallback(async () => {
    await asyncToast({
      id: 'approve-loan',
      msgs: {
        success: 'Loan Approved !!',
        loading: 'Approving Loan !!',
      },
      onSuccess: () => router.replace('/loan/applications'),
      promise: mutateAsync({ id: id as string, action: LoanApproveOrCancel.Approve }),
    });
  }, [id, mutateAsync, router]);

  const declineLoan = useCallback(async () => {
    await asyncToast({
      id: 'approve-loan',
      msgs: {
        success: 'Loan Declined !!',
        loading: 'Declining Loan !!',
      },
      onSuccess: () => router.replace('/loan/declined'),
      promise: mutateAsync({ id: id as string, action: LoanApproveOrCancel.Cancel }),
    });
  }, [id, mutateAsync, router]);

  return (
    <>
      <LoanDetailsHeader title="Loan Application List" />
      <CBSLoanDetails />
      <Box position="fixed" bottom="0" w="calc(100% - 260px)">
        <FormFooter
          mainButtonLabel="Approve"
          mainButtonHandler={approveLoan}
          draftButton={
            <Button shade="danger" minW="120px" variant="outline" onClick={declineLoan}>
              Decline
            </Button>
          }
          status={`Total Sanctioned Amount: ${loan?.totalSanctionedAmount}`}
        />
      </Box>
    </>
  );
};
