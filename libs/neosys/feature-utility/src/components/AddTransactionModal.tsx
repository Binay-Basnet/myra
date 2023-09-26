import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';

import { asyncToast, Grid, Modal } from '@myra-ui';

import {
  SaccosSetup,
  useAddSaccosAmountMutation,
  useGetClientsListQuery,
  UtilityTxnTypeAtNeosys,
} from '@coop/neosys-admin/data-access';
import { FormAmountInput, FormSelect } from '@coop/shared/form';

interface IAddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddTransactionModal = ({ isOpen, onClose }: IAddTransactionModalProps) => {
  const queryClient = useQueryClient();

  const methods = useForm();

  const { mutateAsync } = useAddSaccosAmountMutation();

  const { data, isFetching } = useGetClientsListQuery();

  const slugOptions = useMemo(() => {
    const temp: { label: string; value: string }[] = [];

    data?.neosys?.client?.list?.forEach((client) => {
      if (client?.slug) {
        temp.push({ label: client?.clientName as string, value: client.slug as string });
      }
    });

    return temp;
  }, [data]);

  const handleSave = () => {
    asyncToast({
      id: 'utility-transaction-add',
      msgs: {
        loading: 'Adding Balance',
        success: 'Added Balance',
      },
      promise: mutateAsync({ input: methods.getValues() as SaccosSetup }),
      onSuccess: () => {
        queryClient.invalidateQueries(['getUtilityTransactionList']);
        handleClose();
      },
    });
  };

  const handleClose = () => {
    methods.reset({ slug: null, amount: '', txnType: null });
    onClose();
  };

  return (
    <Modal
      title="Add Transaction"
      open={isOpen}
      onClose={handleClose}
      primaryButtonLabel="Apply"
      primaryButtonHandler={handleSave}
    >
      <FormProvider {...methods}>
        <Grid templateColumns="repeat(2, 1fr)" rowGap="s16" columnGap="s20">
          <FormSelect
            name="slug"
            label="SACCOS"
            options={slugOptions}
            isLoading={isFetching}
            menuPosition="fixed"
          />

          <FormAmountInput name="amount" label="Amount" />

          <FormSelect
            name="txnType"
            label="Transaction Type"
            options={[
              { label: 'Debit', value: UtilityTxnTypeAtNeosys.Debit },
              { label: 'Credit', value: UtilityTxnTypeAtNeosys.Credit },
            ]}
            menuPosition="fixed"
          />
        </Grid>
      </FormProvider>
    </Modal>
  );
};
