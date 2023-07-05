import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';

import { asyncToast, Box, Modal } from '@myra-ui';

import {
  CoaTypeOfTransaction,
  RestrictTransactionInput,
  useAccountDetails,
  useGetEndOfDayDateDataQuery,
  useRestrictAccountingTransactionMutation,
} from '@coop/cbs/data-access';
import { FormDatePicker, FormSelect } from '@coop/shared/form';

interface ILockTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const transactionTypeOptions = [
  { label: 'Deposit', value: CoaTypeOfTransaction.Credit },
  { label: 'Withdraw', value: CoaTypeOfTransaction.Debit },
  { label: 'Both', value: CoaTypeOfTransaction.Both },
];

interface CustomLockTransactionInput {
  txnType?: CoaTypeOfTransaction | null;
  effectiveSince?: Record<'local' | 'en' | 'np', string> | null;
  effectiveTill?: Record<'local' | 'en' | 'np', string> | null;
}

export const LockTransactionModal = ({ isOpen, onClose }: ILockTransactionModalProps) => {
  const queryClient = useQueryClient();

  const router = useRouter();

  const { id } = router.query;

  const { accountDetails } = useAccountDetails();

  const methods = useForm<CustomLockTransactionInput>({
    mode: 'onChange',
  });

  const effectiveSince = methods.watch('effectiveSince');

  // const txnType = methods.watch('txnType');

  const { data: endOfDayData } = useGetEndOfDayDateDataQuery();
  const closingDate = useMemo(() => endOfDayData?.transaction?.endOfDayDate?.value, [endOfDayData]);

  const { mutateAsync } = useRestrictAccountingTransactionMutation();

  const handleLockTransaction = () => {
    const values = methods.getValues();

    asyncToast({
      id: 'lock-account-transaction',
      msgs: {
        success: 'Transactions locked successfully',
        loading: 'Locking transactions',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['getAccountDetailsData']);

        handleClose();
      },
      promise: accountDetails?.transactionConstraints?.blockId
        ? mutateAsync({
            id: accountDetails.transactionConstraints.blockId,
            data: {
              accountId: id as string,
              ...values,
            } as RestrictTransactionInput,
          })
        : mutateAsync({
            data: {
              accountId: id as string,
              ...values,
            } as RestrictTransactionInput,
          }),
    });
  };

  const handleClose = () => {
    methods.reset({ txnType: null, effectiveSince: null, effectiveTill: null });
    onClose();
  };

  useEffect(() => {
    if (accountDetails?.transactionConstraints) {
      methods.reset({
        txnType: accountDetails.transactionConstraints?.transactionType as CoaTypeOfTransaction,
        effectiveSince: accountDetails?.transactionConstraints?.effectiveSince,
        effectiveTill: accountDetails?.transactionConstraints?.effectiveTill,
      });
    }
  }, [accountDetails?.transactionConstraints]);

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      isCentered
      title="Lock Transaction"
      primaryButtonLabel="Save"
      primaryButtonHandler={handleLockTransaction}
      width="xl"
    >
      <FormProvider {...methods}>
        <Box display="flex" flexDir="column" gap="s16">
          <FormSelect name="txnType" label="Transaction Type" options={transactionTypeOptions} />

          <FormDatePicker
            name="effectiveSince"
            label="Effective From"
            minDate={closingDate?.local ? new Date(closingDate?.en ?? '') : new Date()}

            // isDisabled={txnType !== accountDetails?.transactionConstraints?.transactionType}
          />

          <FormDatePicker
            name="effectiveTill"
            label="Effective Till"
            minDate={new Date(effectiveSince?.en ?? '')}
            // isDisabled={txnType !== accountDetails?.transactionConstraints?.transactionType}
          />
        </Box>
      </FormProvider>
    </Modal>
  );
};
