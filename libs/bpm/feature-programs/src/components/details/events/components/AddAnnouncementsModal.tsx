import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';

import { asyncToast, Box, Modal } from '@myra-ui';

import {
  BpmEventAnnouncementInput,
  useSetBpmEventsAddAnnouncementsMutation,
} from '@coop/cbs/data-access';
import { FormInput, FormTextArea } from '@coop/shared/form';

interface IUpdateBalanceProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddAnnouncemnetModal = ({ isOpen, onClose }: IUpdateBalanceProps) => {
  const methods = useForm({});
  const queryClient = useQueryClient();
  const router = useRouter();
  const id = router?.query['id'];

  const { mutateAsync: warehouseMutateAsync } = useSetBpmEventsAddAnnouncementsMutation();

  const onSubmit = () => {
    const values = methods.getValues();

    asyncToast({
      id: 'account-open-add-minor',
      promise: warehouseMutateAsync({
        eventId: id as string,

        data: {
          ...values,
        } as BpmEventAnnouncementInput,
      }),
      msgs: {
        loading: 'Adding Announcement',
        success: 'Announcement Added Successfully',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['getEventsDetails']);
        handleUpdateModalClose();
        onClose();
        // router.push('/accounting/investment/investment-transaction/list');
      },
    });
  };
  const handleUpdateModalClose = () => {
    methods.reset({
      title: null,
      description: null,
    });
  };

  return (
    <Modal
      title="Add Minutes"
      open={isOpen}
      onClose={onClose}
      primaryButtonLabel="Save"
      primaryButtonHandler={onSubmit}
    >
      <FormProvider {...methods}>
        <Box display="flex" flexDirection="column" gap="s24">
          <Box w="50%">
            <FormInput name="title" label="Title" />
          </Box>
          <FormTextArea name="description" label="Description" />
        </Box>
      </FormProvider>
    </Modal>
  );
};
