import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';

import { asyncToast, Box, Modal } from '@myra-ui';

import {
  AddWarehouseInput,
  useGetBranchListQuery,
  useGetWarehouseFormStateDetailsQuery,
  useSetWareHouseMutation,
} from '@coop/cbs/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';
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
  const router = useRouter();
  const idWarehouse = router?.query['id'];
  const { data: wareHouseData } = useGetWarehouseFormStateDetailsQuery({
    id: idWarehouse as string,
  });

  const { data: branchData } = useGetBranchListQuery({
    paginate: {
      after: '',
      first: -1,
    },
  });

  const serviceCenterOptions = branchData?.settings?.general?.branch?.list?.edges?.map((data) => ({
    label: data?.node?.name as string,
    value: data?.node?.id as string,
  }));

  const { mutateAsync: warehouseMutateAsync } = useSetWareHouseMutation();
  const { reset } = methods;

  const onSubmit = () => {
    const values = methods.getValues();

    asyncToast({
      id: 'account-open-add-minor',
      promise: warehouseMutateAsync({
        id: idWarehouse ? (idWarehouse as string) : undefined,

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
      branchId: null,
    });
  };

  useEffect(() => {
    if (wareHouseData && idWarehouse) {
      const editValueData = wareHouseData?.inventory?.warehouse?.getWarehouse?.data;

      if (editValueData) {
        const newData = {
          name: editValueData?.name,
          phoneNumber: editValueData?.phoneNumber,
          address: editValueData?.address,
          branchId: editValueData?.branchId,
        };
        reset({
          ...(newData as unknown as AddWarehouseInput),
        });
      }
    }
  }, [wareHouseData, idWarehouse, reset]);

  return (
    <Modal
      open={isAddWareHouseModalOpen as boolean}
      onClose={handleWarehouseClose}
      title="Add Warehouse"
      primaryButtonLabel="Add"
      primaryButtonHandler={onSubmit}
      onCloseComplete={handleUpdateModalClose}
    >
      <FormProvider {...methods}>
        <Box display="flex" flexDirection="column" gap="s24">
          <FormSelect
            label="Select Service Center"
            options={serviceCenterOptions}
            name="branchId"
          />
          <FormInput type="text" name="name" label={t['warehouseFormName']} />

          <FormInput type="number" name="phoneNumber" label={t['warehouseFormPhoneNumber']} />

          <FormInput type="text" name="address" label={t['warehouseFormAddress']} />
        </Box>
      </FormProvider>
    </Modal>
  );
};
