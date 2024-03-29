import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';

import { Alert, asyncToast, Box, Button, Modal, Text } from '@myra-ui';

import { AccountTypeFilter, useEditSavingProductBalanceLimitMutation } from '@coop/cbs/data-access';
import { FormInput } from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

import { useSavingDepositHook } from '../hooks/useSavingDepositHook';

interface IUpdateBalanceProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UpdateBalanceLimitModal = ({ isOpen, onClose }: IUpdateBalanceProps) => {
  const { detailData } = useSavingDepositHook();

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
        success: 'Balance updated successfully',
        loading: 'Updating Balance',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['getSavingsProductDetail']);

        onClose();
      },
      promise: mutateAsync({
        productId: router?.query?.['id'] as string,
        productType: AccountTypeFilter?.Deposit,
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
        <Text fontSize="r2" color="neutralColorLight.Gray-80" fontWeight="SemiBold">
          Update Balance Limit
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
            {detailData?.nature !== 'TERM_SAVING_OR_FD' && (
              <Box display="flex" flexDir="column">
                <Text fontSize="r2" fontWeight="medium">
                  Existing Balance Limit
                </Text>
                <ul>
                  <li>
                    <Text fontSize="s3">
                      Minimum Balance Limit: {amountConverter(detailData?.balanceLimit?.minAmount)}
                    </Text>
                  </li>
                  <li>
                    <Text fontSize="s3">
                      Maximum Balance Limit: {amountConverter(detailData?.balanceLimit?.maxAmount)}
                    </Text>
                  </li>
                </ul>
              </Box>
            )}
            {detailData?.nature === 'TERM_SAVING_OR_FD' && (
              <Box display="flex" flexDir="column">
                <Text fontSize="r2" fontWeight="medium">
                  Fixed Deposit Amount Limit
                </Text>
                <ul>
                  <li>
                    <Text fontSize="s3">
                      Minimum Amount:{' '}
                      {amountConverter(detailData?.fixedDepositAmountLimit?.minAmount)}
                    </Text>
                  </li>
                  <li>
                    <Text fontSize="s3">
                      Maximum Amount:{' '}
                      {amountConverter(detailData?.fixedDepositAmountLimit?.maxAmount)}
                    </Text>
                  </li>
                </ul>
              </Box>
            )}
          </Alert>
          <Box display="flex" gap={2}>
            <FormInput
              label={
                detailData?.nature === 'TERM_SAVING_OR_FD'
                  ? 'New Minimum FD Amount Limit'
                  : 'New Minimum Balance Limit'
              }
              name="minAmount"
            />
            <FormInput
              label={
                detailData?.nature === 'TERM_SAVING_OR_FD'
                  ? 'New Maximum FD Amount Limit'
                  : 'New Maximum Balance Limit'
              }
              name="maxAmount"
            />
          </Box>
        </Box>
      </FormProvider>
    </Modal>
  ) : null;
};

export default UpdateBalanceLimitModal;
