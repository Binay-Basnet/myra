import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { Box, Text } from '@myra-ui';
import { Alert, asyncToast, Modal } from '@myra-ui/components';

import { useLastKymUpdatedDateQuery, useUpdateKymMutation } from '@coop/cbs/data-access';
import { localizedDate } from '@coop/cbs/utils';
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

  const memberId = router.query?.['id'];

  const { data: lastKymUpdatedDateData } = useLastKymUpdatedDateQuery(
    { id: memberId as string },
    { enabled: !!memberId }
  );

  const kymUpdatedDate = lastKymUpdatedDateData?.members?.lastKymUpdatedDate?.kymUpdatedDate;

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
      <Box display="flex" flexDir="column" gap="s16">
        <Alert
          status="info"
          title="All the updates done to the member will be visible only after the effective date "
        />

        <Box display="flex" gap="s4">
          <Text fontSize="r1">Kym Last Updated On:</Text>
          <Text fontSize="r1" fontWeight={500}>
            {kymUpdatedDate ? localizedDate(kymUpdatedDate) : '-'}
          </Text>
        </Box>
        <FormProvider {...methods}>
          <Box w="50%">
            <FormDatePicker label="Effective From" name="date" />
          </Box>
        </FormProvider>
      </Box>
    </Modal>
  );
};
