import { FormProvider, useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';

import { asyncToast, Box, Button, Grid, GridItem, Modal } from '@myra-ui';

import { LedgerTagInput, useUpsertLedgerTagMutation } from '@coop/cbs/data-access';
import { FormInput, FormTextArea } from '@coop/shared/form';

interface INewTagModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewTagModal = ({ isOpen, onClose }: INewTagModalProps) => {
  const queryClient = useQueryClient();

  const methods = useForm<LedgerTagInput>();

  const { mutateAsync: addLedgerTag } = useUpsertLedgerTagMutation();

  const handleSave = () => {
    asyncToast({
      id: 'add-ledger-tag',
      msgs: {
        success: 'Adding Tag',
        loading: 'Tag Added',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['ledgerTagsList']);

        handleClose();
      },
      promise: addLedgerTag({
        data: methods.getValues(),
      }),
    });
  };

  const handleClose = () => {
    methods.reset({ name: '', description: '' });

    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      isCentered
      title="New Tag"
      footer={
        <Box display="flex" px={5} pb={5} justifyContent="flex-end">
          <Button onClick={handleSave}>Save Changes</Button>
        </Box>
      }
      width="xl"
    >
      <FormProvider {...methods}>
        <Grid templateColumns="repeat(2,1fr)" gap="s16">
          <FormInput name="name" label="Tag Name" isRequired />
          <GridItem colSpan={2}>
            <FormTextArea name="description" label="Description" rows={3} />
          </GridItem>
        </Grid>
      </FormProvider>
    </Modal>
  );
};
