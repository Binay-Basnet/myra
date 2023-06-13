import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';

import { asyncToast, Box, Button, Grid, Modal } from '@myra-ui';

import { TagConciseEntry, useAddTagToLedgerMutation } from '@coop/cbs/data-access';
import { FormLedgerTagSelect } from '@coop/shared/form';

interface IEditTagsModal {
  isOpen: boolean;
  onClose: () => void;
  ledgerId: string;
  tags: (TagConciseEntry | null)[];
}

export const EditTagsModal = ({ isOpen, onClose, ledgerId, tags }: IEditTagsModal) => {
  const queryClient = useQueryClient();

  const methods = useForm();

  const { mutateAsync: editTag } = useAddTagToLedgerMutation();

  const handleEditTags = () => {
    asyncToast({
      id: 'coa-assign-tag-to-ledger',
      msgs: {
        loading: 'Assigning tag',
        success: 'Tag assigned',
      },
      promise: editTag({
        ledgerId,
        tagId: methods.getValues()?.['tagId']?.map((tag: { value: string }) => tag?.value),
      }),
      onSuccess: () => {
        methods.reset({});
        queryClient.invalidateQueries(['getLedgerList']);
        onClose();
      },
    });
  };

  useEffect(() => {
    methods?.setValue(
      'tagId',
      tags?.map((tag) => ({ label: tag?.name, value: tag?.id }))
    );
  }, [tags]);

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      isCentered
      title="Edit Tags"
      footer={
        <Box display="flex" px={5} pb={5} justifyContent="flex-end">
          <Button onClick={handleEditTags}>Save</Button>
        </Box>
      }
      width="xl"
    >
      <FormProvider {...methods}>
        <Grid templateColumns="repeat(2,1fr)" gap="s16">
          <FormLedgerTagSelect name="tagId" label="Tags" menuPosition="fixed" isMulti />
        </Grid>
      </FormProvider>
    </Modal>
  );
};
