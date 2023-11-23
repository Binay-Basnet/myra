import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';

import { asyncToast, Grid, Modal } from '@myra-ui';

import {
  SaccosAndSmsCountToBeCredited,
  useAddSaccosSmsCreditMutation,
  useGetClientsListQuery,
} from '@coop/neosys-admin/data-access';
import { FormNumberInput, FormSelect } from '@coop/shared/form';

interface IAddSMSCreditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddSMSCreditModal = ({ isOpen, onClose }: IAddSMSCreditModalProps) => {
  const queryClient = useQueryClient();

  const methods = useForm();

  const { mutateAsync } = useAddSaccosSmsCreditMutation();

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
      promise: mutateAsync({ input: methods.getValues() as SaccosAndSmsCountToBeCredited }),
      onSuccess: () => {
        queryClient.invalidateQueries(['listSaccosAvailableSmsCount']);
        handleClose();
      },
    });
  };

  const handleClose = () => {
    methods.reset({ slug: null, count: '' });
    onClose();
  };

  return (
    <Modal
      title="Add SMS Credit"
      open={isOpen}
      onClose={handleClose}
      primaryButtonLabel="Add"
      primaryButtonHandler={handleSave}
    >
      <FormProvider {...methods}>
        <Grid templateColumns="repeat(1, 1fr)" rowGap="s16" columnGap="s20">
          <FormSelect
            name="slug"
            label="SACCOS"
            options={slugOptions}
            isLoading={isFetching}
            menuPosition="fixed"
          />

          <FormNumberInput name="count" label="Credit" />
        </Grid>
      </FormProvider>
    </Modal>
  );
};
