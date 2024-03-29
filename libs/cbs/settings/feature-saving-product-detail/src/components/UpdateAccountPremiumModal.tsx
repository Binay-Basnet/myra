import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';

import { Alert, asyncToast, Box, Modal, Text } from '@myra-ui';

import {
  AccountTypeFilter,
  useUpdateSavingLoanProductAccountPremiumMutation,
} from '@coop/cbs/data-access';
import { FormNumberInput } from '@coop/shared/form';

import { useSavingDepositHook } from '../hooks/useSavingDepositHook';

interface IUpdateAccountPremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UpdateAccountPremiumModal = ({ isOpen, onClose }: IUpdateAccountPremiumModalProps) => {
  const { detailData } = useSavingDepositHook();

  const queryClient = useQueryClient();

  const router = useRouter();

  const methods = useForm({
    mode: 'onChange',
  });

  const { mutateAsync: updateAccountPremium } = useUpdateSavingLoanProductAccountPremiumMutation();

  const handleSave = () => {
    const values = methods.getValues();

    asyncToast({
      id: 'update-saving-product-account-premium',
      msgs: {
        success: 'Account premium updated',
        loading: 'Updating account premium',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['getSavingsProductDetail']);

        handleClose();
      },
      promise: updateAccountPremium({
        productId: router?.query?.['id'] as string,
        productType: AccountTypeFilter?.Deposit,
        payload: {
          minRate: values?.['minRate'],
          maxRate: values?.['maxRate'],
          defaultRate: values?.['defaultRate'],
        },
      }),
    });
  };

  const handleClose = () => {
    methods.reset({ minRate: '', maxRate: '', defaultRate: '' });

    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      isCentered
      title="Update Account Premium"
      primaryButtonLabel="Save Changes"
      primaryButtonHandler={handleSave}
      width="xl"
    >
      <FormProvider {...methods}>
        <Box display="flex" flexDir="column" gap={5}>
          <Alert title="Existing Details" status="info" hideCloseIcon>
            <Box display="flex" flexDir="column">
              <ul>
                <li>
                  <Text fontSize="s3">
                    Minimum Interest Rate: {detailData?.interest?.minRate ?? 'N/A'}
                  </Text>
                </li>
                <li>
                  <Text fontSize="s3">
                    Maximum Interest Rate: {detailData?.interest?.maxRate ?? 'N/A'}
                  </Text>
                </li>
                <li>
                  <Text fontSize="s3">
                    Default Interest Rate: {detailData?.interest?.defaultRate ?? 'N/A'}
                  </Text>
                </li>
              </ul>
            </Box>
          </Alert>
          <Box display="flex" gap="s16">
            <FormNumberInput label="Minimum Interest Rate" name="minRate" />
            <FormNumberInput label="Maximum Interest Rate" name="maxRate" />
            <FormNumberInput label="Default Interest Rate" name="defaultRate" />
          </Box>
        </Box>
      </FormProvider>
    </Modal>
  );
};

export default UpdateAccountPremiumModal;
