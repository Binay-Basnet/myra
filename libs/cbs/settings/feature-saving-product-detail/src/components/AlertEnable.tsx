import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Alert, asyncToast, Box, Button, Modal, Text } from '@myra-ui';

import {
  AccountTypeFilter,
  ProductActivateResult,
  useActivateSavingsProductMutation,
} from '@coop/cbs/data-access';
import { FormTextArea } from '@coop/shared/form';

type IdType = {
  id: string;
};

export const AlertEnable = ({ id }: IdType) => {
  const methods = useForm();
  const { getValues, resetField } = methods;
  const [openModal, setOpenModal] = useState(false);

  const onOpenModal = () => {
    setOpenModal(true);
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const { mutateAsync } = useActivateSavingsProductMutation({});

  const enableProduct = () => {
    const data = getValues();

    asyncToast({
      id: 'deposit-id',
      msgs: {
        success: 'New Product Added',
        loading: 'Adding New Deposit',
      },
      promise: mutateAsync({
        productId: id,
        productType: AccountTypeFilter.Deposit,
        remarks: data['remarks'],
      }),
      onError: (error) => {
        if (error.__typename === 'ValidationError') {
          Object.keys(error.validationErrorMsg).map((key) =>
            methods.setError(key as keyof ProductActivateResult, {
              message: error.validationErrorMsg[key][0] as string,
            })
          );
        }
      },
    });
  };

  const onCancel = () => {
    resetField('remarks');
  };

  return (
    <FormProvider {...methods}>
      <form>
        <Alert status="warning" hideCloseIcon>
          <Box display="flex" justifyContent="space-between">
            <Text fontWeight="Medium" color="gray.800" fontSize="r1" lineHeight="18px">
              This product is disabled.
            </Text>
            <Button onClick={onOpenModal}>Enable this product</Button>
          </Box>
        </Alert>
        <Modal
          open={openModal}
          onClose={onCloseModal}
          title="Enable Savings Product"
          primaryButtonLabel="submit"
          secondaryButtonLabel="cancel"
          width="600px"
          primaryButtonHandler={enableProduct}
          secondaryButtonHandler={onCancel}
        >
          <FormProvider {...methods}>
            <FormTextArea name="remarks" label="Enable the product" />
          </FormProvider>
        </Modal>
      </form>
    </FormProvider>
  );
};
