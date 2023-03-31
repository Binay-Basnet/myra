import { FormProvider, useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';

import { asyncToast, Box, Modal } from '@myra-ui';

import { useSetWareHouseMutation } from '@coop/cbs/data-access';
import { FormInput } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

interface IWAREHOUSEMODALPROPS {
  isAddWareHouseModalOpen?: boolean;
  handleWarehouseClose: () => void;
}
export const WarehouseAddModal = ({
  handleWarehouseClose,
  isAddWareHouseModalOpen,
}: IWAREHOUSEMODALPROPS) => {
  const { t } = useTranslation();
  const methods = useForm({});
  const queryClient = useQueryClient();

  const { mutateAsync: warehouseMutateAsync } = useSetWareHouseMutation();

  const onSubmit = () => {
    const values = methods.getValues();

    asyncToast({
      id: 'account-open-add-minor',
      promise: warehouseMutateAsync({
        data: {
          ...values,
        },
      }),
      msgs: {
        loading: 'Adding Warehouse',
        success: 'Warehouse Added Successfully',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['getWarehouseList']);
        handleUpdateModalClose();
        handleWarehouseClose();

        // router.push('/accounting/investment/investment-transaction/list');
      },
    });
  };
  const handleUpdateModalClose = () => {
    methods.reset({
      name: null,
      phoneNumber: null,
      address: null,
    });
  };
  return isAddWareHouseModalOpen ? (
    <Modal
      open={isAddWareHouseModalOpen}
      onClose={handleWarehouseClose}
      title="Add Warehouse"
      primaryButtonLabel="Add"
      primaryButtonHandler={onSubmit}
      onCloseComplete={handleUpdateModalClose}
    >
      <FormProvider {...methods}>
        <Box display="flex" flexDirection="column" gap="s24">
          <FormInput type="text" name="name" label={t['warehouseFormName']} />

          <FormInput type="number" name="phoneNumber" label={t['warehouseFormPhoneNumber']} />

          <FormInput type="text" name="address" label={t['warehouseFormAddress']} />
        </Box>
      </FormProvider>
    </Modal>
  ) : null;
};
