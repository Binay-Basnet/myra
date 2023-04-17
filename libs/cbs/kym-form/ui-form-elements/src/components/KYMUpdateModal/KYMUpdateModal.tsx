import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { Alert, asyncToast, Modal } from '@myra-ui/components';
import { Box } from '@myra-ui/foundations';

import { useUpdateKymMutation } from '@coop/cbs/data-access';
import { FormDatePicker } from '@coop/shared/form';

interface IKymUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KYMUpdateModal = ({ isOpen, onClose }: IKymUpdateModalProps) => {
  const router = useRouter();
  const methods = useForm<{ date: { en: string; np: string; local: string } }>();
  const { mutateAsync } = useUpdateKymMutation();

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
          onSuccess: () => router.push(`/member/details?id=${router.query['id']}`),
          promise: mutateAsync({
            id: router.query['id'] as string,
            date: methods.getValues().date,
          }),
        });
      }}
    >
      <Box display="flex" flexDir="column" gap="s32">
        <Alert
          status="info"
          title="All the updates dont to the member will be visible only after the effective date "
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
