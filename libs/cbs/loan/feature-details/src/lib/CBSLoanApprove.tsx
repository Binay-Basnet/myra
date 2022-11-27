import { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';

import { LoanApproveOrCancel, useApproveLoanAccountMutation } from '@coop/cbs/data-access';
import { CBSLoanDetails, LoanDetailsHeader } from '@coop/cbs/loan/details';
import { FormTextArea } from '@coop/shared/form';
import { asyncToast, Box, Button, ChakraModal, FormFooter } from '@myra-ui';
import { useTranslation } from '@coop/shared/utils';

import { useLoanDetails } from '../hooks/useLoanDetails';

export const CBSLoanApprove = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { t } = useTranslation();
  const methods = useForm();
  const { loanPreview } = useLoanDetails();

  const { id } = router.query;

  const { mutateAsync } = useApproveLoanAccountMutation();

  const approveLoan = useCallback(async () => {
    await asyncToast({
      id: 'approve-loan',
      msgs: {
        success: 'Loan Approved !!',
        loading: 'Approving Loan !!',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['getLoanList']);
        router.replace('/loan/applications');
      },
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
      onSuccess: () => {
        router.replace('/loan/declined');
      },
      promise: mutateAsync({
        id: id as string,
        action: LoanApproveOrCancel.Cancel,
        remarks: methods.getValues()['reason'],
      }),
    });
  }, [id, mutateAsync, router]);

  const { isOpen, onToggle, onClose } = useDisclosure();

  return (
    <>
      <LoanDetailsHeader title="Loan Application List" />
      <CBSLoanDetails showStats={false} />
      <Box position="fixed" bottom="0" w="calc(100% - 260px)">
        <FormFooter
          mainButtonLabel="Approve"
          mainButtonHandler={approveLoan}
          draftButton={
            <Button shade="danger" minW="120px" variant="outline" onClick={onToggle}>
              Decline
            </Button>
          }
          status={`Total Disbursed Amount: ${
            Number(loanPreview?.loanDetails?.totalSanctionedAmount ?? 0) -
            Number(loanPreview?.loanDetails?.totalProcessingChargesValuation ?? 0)
          }`}
        />
      </Box>
      <ChakraModal
        open={isOpen}
        onClose={onClose}
        title="declineLoanApplication"
        primaryButtonLabel={t['save']}
        primaryButtonHandler={declineLoan}
      >
        <FormProvider {...methods}>
          <FormTextArea name="reason" label={t['reasonForDecliningLoan']} />
        </FormProvider>
      </ChakraModal>
    </>
  );
};
