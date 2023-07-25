import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { Alert, asyncToast, Modal } from '@myra-ui/components';
import { Box } from '@myra-ui/foundations';

import { useUpdateKymMutation } from '@coop/cbs/data-access';
import { FormDatePicker } from '@coop/shared/form';

interface IKymUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateClick: () => Promise<Record<string, unknown>>;
}

export const KYMUpdateModal = ({ isOpen, onClose, onUpdateClick }: IKymUpdateModalProps) => {
  const router = useRouter();
  const methods = useForm<{ date: { en: string; np: string; local: string } }>();
  const { mutateAsync } = useUpdateKymMutation();

  const onUpdate = () =>
    new Promise<Record<string, unknown>>((resolve) => {
      onUpdateClick().then(() => {
        const response = mutateAsync({
          id: router.query['id'] as string,
          date: methods.getValues().date,
        });
        resolve(response);
      });
    });

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title="Update Member"
      primaryButtonLabel="Save"
      primaryButtonHandler={async () => {
        await asyncToast({
          id: 'update-kym',
          msgs: {
            success: 'Kym Update Successfull',
            loading: 'Update KYM',
          },
          onSuccess: () => router.push(`/cbs/members/details?id=${router.query['id']}`),
          promise: onUpdate(),
        });
      }}
    >
      <Box display="flex" flexDir="column" gap="s32">
        <Alert
          status="info"
          title="All the updates done to the member will be visible only after the effective date "
        />
        <FormProvider {...methods}>
          <Box w="50%">
            <FormDatePicker label="Effective From" name="date" />
          </Box>
        </FormProvider>
      </Box>
    </Modal>
  );
};
