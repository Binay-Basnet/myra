import { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';

import { asyncToast, Box, Button, FormFooter, Modal } from '@myra-ui';

import { LoanApproveOrCancel, useApproveLoanAccountMutation } from '@coop/cbs/data-access';
import { CBSLoanDetails, LoanDetailsHeader } from '@coop/cbs/loan/details';
import { ROUTES } from '@coop/cbs/utils';
import { FormTextArea } from '@coop/shared/form';
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
        router.replace(ROUTES.CBS_LOAN_APPLICATIONS_LIST);
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
        router.replace(ROUTES.CBS_LOAN_DECLINED_LIST);
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
      <Modal
        open={isOpen}
        onClose={onClose}
        title="declineLoanApplication"
        primaryButtonLabel={t['save']}
        primaryButtonHandler={declineLoan}
      >
        <FormProvider {...methods}>
          <FormTextArea name="reason" label={t['reasonForDecliningLoan']} />
        </FormProvider>
      </Modal>
    </>
  );
};
