import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';

import { Alert, asyncToast, Box, Modal, Text } from '@myra-ui';

import { useUpdateWithdrawPenaltyMutation } from '@coop/cbs/data-access';
import { FormNumberInput } from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

import { useSavingDepositHook } from '../hooks/useSavingDepositHook';

interface IUpdateWithdrawPenaltyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UpdateWithdrawPenaltyModal = ({
  isOpen,
  onClose,
}: IUpdateWithdrawPenaltyModalProps) => {
  const { detailData } = useSavingDepositHook();

  const queryClient = useQueryClient();

  const router = useRouter();

  const methods = useForm();

  const { mutateAsync: updateWithdrawPenalty } = useUpdateWithdrawPenaltyMutation();

  const handleSave = () => {
    const values = methods.getValues();

    asyncToast({
      id: 'update-saving-product-withdraw-penalty',
      msgs: {
        success: 'Withdraw penalty updated',
        loading: 'Updating withdraw penalty',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['getSavingsProductDetail']);

        handleClose();
      },
      promise: updateWithdrawPenalty({
        productId: router?.query?.['id'] as string,
        payload: values,
      }),
    });
  };

  const handleClose = () => {
    methods.reset({
      penaltyAmount: '',
      penaltyRate: '',
    });

    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      isCentered
      title="Update Withdraw Penalty"
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
                    Penalty Amount:{' '}
                    {`${amountConverter(detailData?.withdrawPenalty?.penaltyAmount)}`}
                  </Text>
                </li>
                <li>
                  <Text fontSize="s3">
                    Penalty Rate:{' '}
                    {detailData?.withdrawPenalty?.penaltyRate
                      ? `${detailData?.withdrawPenalty?.penaltyRate}%`
                      : 'N/A'}
                  </Text>
                </li>
              </ul>
            </Box>
          </Alert>
          <Box display="flex" gap="s16">
            <FormNumberInput label="Penalty Amount" name="penaltyAmount" />
            <FormNumberInput
              label="Penalty Rate"
              name="penaltyRate"
              rightElement={
                <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                  %
                </Text>
              }
            />
          </Box>
        </Box>
      </FormProvider>
    </Modal>
  );
};

export default UpdateWithdrawPenaltyModal;
