import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';

import { Alert, asyncToast, Box, Modal, Text } from '@myra-ui';

import { AccountTypeFilter, useUpdateSavingLoanProductTenureMutation } from '@coop/cbs/data-access';
import { FormNumberInput } from '@coop/shared/form';

import { useLoanProductDepositHook } from '../hooks/useLoanProductDepositHook';

interface IUpdateLoanTenureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UpdateLoanTenureModal = ({ isOpen, onClose }: IUpdateLoanTenureModalProps) => {
  const { detailData } = useLoanProductDepositHook();

  const queryClient = useQueryClient();

  const router = useRouter();

  const methods = useForm({
    mode: 'onChange',
  });

  const { mutateAsync: updateProductTenure } = useUpdateSavingLoanProductTenureMutation();

  const handleSave = () => {
    const values = methods.getValues();

    asyncToast({
      id: 'update-loan-product-tenure',
      msgs: {
        success: 'Tenure updated',
        loading: 'Updating tenure',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['getLoanProductDetail']);

        handleClose();
      },
      promise: updateProductTenure({
        productId: router?.query?.['id'] as string,
        productType: AccountTypeFilter?.Loan,
        payload: {
          minTenureUnitNumber: values?.['minTenureUnitNumber'],
          maxTenureUnitNumber: values?.['maxTenureUnitNumber'],
        },
      }),
    });
  };

  const handleClose = () => {
    methods.reset({ minTenureUnitNumber: '', maxTenureUnitNumber: '' });

    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      isCentered
      title="Update Tenure"
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
                  <Text fontSize="s3">Unit: {detailData?.tenureUnit}</Text>
                </li>
                <li>
                  <Text fontSize="s3">
                    Minimum Tenure:{' '}
                    {`${detailData?.minTenureUnitNumber} ${detailData?.tenureUnit?.toLowerCase()}`}
                  </Text>
                </li>
                <li>
                  <Text fontSize="s3">
                    Maximum Tenure:{' '}
                    {`${detailData?.maxTenureUnitNumber} ${detailData?.tenureUnit?.toLowerCase()}`}
                  </Text>
                </li>
              </ul>
            </Box>
          </Alert>
          <Box display="flex" gap="s16">
            <FormNumberInput
              label="Minimum Tenure"
              name="minTenureUnitNumber"
              rightElement={
                <Text fontSize="r1" fontWeight={500} color="accent.debit">
                  {detailData?.tenureUnit?.toLowerCase()}
                </Text>
              }
            />
            <FormNumberInput
              label="Maximum Tenure"
              name="maxTenureUnitNumber"
              rightElement={
                <Text fontSize="r1" fontWeight={500} color="accent.debit">
                  {detailData?.tenureUnit?.toLowerCase()}
                </Text>
              }
            />
          </Box>
        </Box>
      </FormProvider>
    </Modal>
  );
};

export default UpdateLoanTenureModal;
