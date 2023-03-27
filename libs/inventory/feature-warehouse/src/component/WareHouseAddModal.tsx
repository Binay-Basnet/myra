import { FormProvider, useForm } from 'react-hook-form';
import {
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';

import { asyncToast, Box, Button, Modal, Text } from '@myra-ui';

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
  const { handleSubmit } = methods;

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
        handleWarehouseClose();

        // router.push('/accounting/investment/investment-transaction/list');
      },
    });
  };
  return isAddWareHouseModalOpen ? (
    <Modal open={isAddWareHouseModalOpen} onClose={handleWarehouseClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text fontSize="r2" color="neutralColorLight.Gray-80" fontWeight="SemiBold">
            Add Warehouse
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody p="s16">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box display="flex" flexDirection="column" gap="s24">
                <FormInput type="text" name="name" label={t['warehouseFormName']} />

                <FormInput type="number" name="phoneNumber" label={t['warehouseFormPhoneNumber']} />

                <FormInput type="text" name="address" label={t['warehouseFormAddress']} />
                <Button type="submit" w="-webkit-fit-content" alignSelf="flex-end">
                  {t['warehouseFormAddWarehouse']}
                </Button>
              </Box>
            </form>
          </FormProvider>
        </ModalBody>
      </ModalContent>
    </Modal>
  ) : null;
};
