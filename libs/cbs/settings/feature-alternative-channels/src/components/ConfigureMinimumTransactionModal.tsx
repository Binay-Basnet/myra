import { FormProvider, useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';

import { Alert, asyncToast, FormSection, Grid, Modal } from '@myra-ui';

import {
  useAddSmsMinimumTxnAmountMutation,
  useGetSmsMinimumTxnAmountQuery,
} from '@coop/cbs/data-access';
import { FormAmountInput } from '@coop/shared/form';

interface IConfigureMinimumTransactionModal {
  isOpen: boolean;
  onClose: () => void;
}

export const ConfigureMinimumTransactionModal = ({
  isOpen,
  onClose,
}: IConfigureMinimumTransactionModal) => {
  const methods = useForm();

  const queryClient = useQueryClient();

  const { data: minTxnAmountData } = useGetSmsMinimumTxnAmountQuery();

  const minTxnAmount = minTxnAmountData?.settings?.sms?.getMinimunTxnAmount?.amount;

  const { mutateAsync: updateMinTxnAmount } = useAddSmsMinimumTxnAmountMutation();

  const handleSave = () => {
    const values = methods.getValues();

    asyncToast({
      id: 'update-sms-min-txn-amount',
      msgs: {
        loading: 'Updating Minimun Transaction Amount',
        success: 'Minimum Transaction Amount Updated',
      },
      promise: updateMinTxnAmount({
        input: { id: 'TRANSACTION', amount: values['minTxnAmount'] },
      }),
      onSuccess: () => {
        queryClient?.invalidateQueries(['getSMSMinimumTxnAmount']);
        handleClose();
      },
    });
  };

  const handleClose = () => {
    methods.reset({ minTxnAmount: '' });
    onClose();
  };

  return (
    <Modal
      title="Configure Transactions"
      open={isOpen}
      onClose={handleClose}
      primaryButtonLabel="Save Changes"
      width="3xl"
      primaryButtonHandler={handleSave}
      hidePadding
    >
      <FormProvider {...methods}>
        <FormSection templateColumns={1}>
          <Alert
            title={`Current Minimum Transaction Amount: ${minTxnAmount}`}
            status="info"
            hideCloseIcon
          />
          <Grid templateColumns="repeat(2,1fr)">
            <FormAmountInput name="minTxnAmount" label="Minimum Transaction Amount" />
          </Grid>
        </FormSection>
      </FormProvider>
    </Modal>
  );
};
