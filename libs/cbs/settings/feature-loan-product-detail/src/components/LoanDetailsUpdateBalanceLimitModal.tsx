import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';

import { Alert, asyncToast, Box, Button, Modal, Text } from '@myra-ui';

import { AccountTypeFilter, useEditSavingProductBalanceLimitMutation } from '@coop/cbs/data-access';
import { FormInput } from '@coop/shared/form';

import { useLoanProductDepositHook } from '../hooks/useLoanProductDepositHook';

interface IUpdateBalanceProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UpdateBalanceLimitModal = ({ isOpen, onClose }: IUpdateBalanceProps) => {
  const { detailData } = useLoanProductDepositHook();

  const queryClient = useQueryClient();

  const router = useRouter();

  const methods = useForm({
    mode: 'onChange',
  });

  const { mutateAsync } = useEditSavingProductBalanceLimitMutation();

  const handleSave = () => {
    const values = methods.getValues();

    asyncToast({
      id: 'update-balance',
      msgs: {
        success: 'Loan limit updated successfully',
        loading: 'Updating Loan Limit',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['getLoanProductDetail']);

        onClose();
      },
      promise: mutateAsync({
        productId: router?.query?.['id'] as string,
        productType: AccountTypeFilter?.Loan,
        data: {
          minAmount: values?.['minAmount'],
          maxAmount: values?.['maxAmount'],
        },
      }),
    });
  };

  return isOpen ? (
    <Modal
      open={isOpen}
      onClose={onClose}
      isCentered
      title={
        <Text fontSize="r2" fontWeight="SemiBold">
          Update Loan Limit
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
            <Box display="flex" flexDir="column">
              <Text fontSize="r2" fontWeight="medium">
                Existing Loan Limit
              </Text>
              <ul>
                <li>
                  <Text fontSize="s3">Minimum Balance Limit: {detailData?.minimumLoanAmount}</Text>
                </li>
                <li>
                  <Text fontSize="s3">Maximum Balance Limit: {detailData?.maxLoanAmount}</Text>
                </li>
              </ul>
            </Box>
          </Alert>
          <Box display="flex" gap={2}>
            <FormInput label="New Minimum Loan Limit" name="minAmount" />
            <FormInput label="New Maximum Loan Limit" name="maxAmount" />
          </Box>
        </Box>
      </FormProvider>
    </Modal>
  ) : null;
};

export default UpdateBalanceLimitModal;
