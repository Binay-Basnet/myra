import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';

import { asyncToast, Box, Modal } from '@myra-ui';

import { useSetAddMinutesMutation } from '@coop/cbs/data-access';
import { FormFileInput, FormInput } from '@coop/shared/form';

interface IUpdateBalanceProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddMinutesModal = ({ isOpen, onClose }: IUpdateBalanceProps) => {
  const methods = useForm({});
  const queryClient = useQueryClient();
  const router = useRouter();
  const id = router?.query['id'];

  const { mutateAsync: warehouseMutateAsync } = useSetAddMinutesMutation();

  const onSubmit = () => {
    const values = methods.getValues();

    asyncToast({
      id: 'account-open-add-minor',
      promise: warehouseMutateAsync({
        meetingID: id as string,

        data: {
          ...values,
        },
      }),
      msgs: {
        loading: 'Adding Minute',
        success: 'Minute Added Successfully',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['getMeetingsEditData']);
        handleUpdateModalClose();
        onClose();
        // router.push('/accounting/investment/investment-transaction/list');
      },
    });
  };
  const handleUpdateModalClose = () => {
    methods.reset({
      files: null,
      note: null,
    });
  };

  return (
    <Modal
      title="Add New Members"
      open={isOpen}
      onClose={onClose}
      primaryButtonLabel="Save"
      primaryButtonHandler={onSubmit}
    >
      <FormProvider {...methods}>
        <Box display="flex" flexDirection="column" gap="s24">
          <FormFileInput name="files" label="Files" />

          <FormInput name="note" label="Notes" />
        </Box>
      </FormProvider>
    </Modal>
  );
};
