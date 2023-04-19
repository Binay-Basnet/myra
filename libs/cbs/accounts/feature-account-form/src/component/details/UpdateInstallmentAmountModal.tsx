import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';

import { Alert, asyncToast, Box, Button, Modal, Text } from '@myra-ui';

import { useSetupdateInstallmentAmountMutation } from '@coop/cbs/data-access';
import { FormInput } from '@coop/shared/form';

import { useAccountDetails } from '../../hooks/useAccountDetails';

interface IUpdateInstallmentProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UpdateInstallmentAmountModal = ({ isOpen, onClose }: IUpdateInstallmentProps) => {
  const { accountDetails } = useAccountDetails();

  const queryClient = useQueryClient();

  const router = useRouter();

  const methods = useForm({
    mode: 'onChange',
  });

  const { mutateAsync } = useSetupdateInstallmentAmountMutation();

  const handleSave = () => {
    const values = methods.getValues();

    asyncToast({
      id: 'update-installment',
      msgs: {
        success: 'Installment updated successfully',
        loading: 'Updating Installment',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['getAccountDetailsData']);

        onClose();
      },
      promise: mutateAsync({
        accountId: router?.query?.['id'] as string,
        newInstallmentAmount: values?.['newInstallmentAmount'],
      }),
    });
  };

  return isOpen ? (
    <Modal
      open={isOpen}
      onClose={onClose}
      isCentered
      title={
        <Text fontSize="r2" color="neutralColorLight.Gray-80" fontWeight="SemiBold">
          Update Installment Amount
        </Text>
      }
      footer={
        <Box display="flex" px={5} pb={5} justifyContent="flex-end">
          <Button onClick={handleSave}>Save Changes</Button>
        </Box>
      }
      width="xl"
    >
      <FormProvider {...methods}>
        <Box display="flex" flexDir="column" gap={5}>
          <Alert status="info" hideCloseIcon>
            <Box display="flex" justifyContent="space-between">
              <Text>Existing installment no: {accountDetails?.installmentAmount}</Text>
            </Box>
          </Alert>
          <FormInput label="New Installment Amount" name="newInstallmentAmount" w={300} />
        </Box>
      </FormProvider>
    </Modal>
  ) : null;
};
