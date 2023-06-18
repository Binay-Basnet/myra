import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';

import { Alert, asyncToast, Box, Button, Modal, Text } from '@myra-ui';

import { useUpdateSavingsLoanAccountNameMutation } from '@coop/cbs/data-access';
import { FormInput } from '@coop/shared/form';

import { useAccountDetails } from '../../hooks/useAccountDetails';

interface IUpdateAccountNameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UpdateAccountNameModal = ({ isOpen, onClose }: IUpdateAccountNameModalProps) => {
  const { accountDetails } = useAccountDetails();

  const queryClient = useQueryClient();

  const router = useRouter();

  const methods = useForm({
    mode: 'onChange',
  });

  const { mutateAsync: updateAccountName } = useUpdateSavingsLoanAccountNameMutation();

  const handleSave = () => {
    const values = methods.getValues();

    asyncToast({
      id: 'update-account-name',
      msgs: {
        success: 'Account name updated successfully',
        loading: 'Updating account name',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['getAccountDetailsData']);

        handleClose();
      },
      promise: updateAccountName({
        accountId: router?.query?.['id'] as string,
        name: values?.['name'],
        accountType: 'DEPOSIT',
      }),
    });
  };

  const handleClose = () => {
    methods.reset({ name: '' });

    onClose();
  };

  return isOpen ? (
    <Modal
      open={isOpen}
      onClose={handleClose}
      isCentered
      title={
        <Text fontSize="r2" color="neutralColorLight.Gray-80" fontWeight="SemiBold">
          Update Account Name
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
          <Alert title="Existing Details" status="info" hideCloseIcon>
            <Box display="flex" justifyContent="space-between">
              <Text>Account Name: {accountDetails?.accountName}</Text>
            </Box>
          </Alert>
          <FormInput label="New Account Name" name="name" w={300} />
        </Box>
      </FormProvider>
    </Modal>
  ) : null;
};
