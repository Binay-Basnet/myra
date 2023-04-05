import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { asyncToast, Box, Container, FormFooter, FormHeader } from '@myra-ui';

import { useSetWareHouseTransferMutation } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { useTranslation } from '@coop/shared/utils';

import { WarehouseTransferForm } from '../component/WarehouseTransferForm';

/* eslint-disable-next-line */

export const WarehouseTransfer = () => {
  const router = useRouter();
  const { mutateAsync: AddItems } = useSetWareHouseTransferMutation();
  const { t } = useTranslation();

  const handleSave = () => {
    const values = methods.getValues();

    asyncToast({
      id: 'account-open-add-minor',
      promise: AddItems({
        data: {
          ...values,
        },
      }),
      msgs: {
        loading: 'Transferring Warehouse',
        success: 'Warehouse Transfer Successful',
      },
      onSuccess: () => {
        router.push(ROUTES.INVENTORY_WAREHOUSE_TRASFER_LIST);
        // router.push('/accounting/investment/investment-transaction/list');
      },
    });
  };

  // const router = useRouter();
  const methods = useForm({});

  return (
    <Container minW="container.lg" height="fit-content" bg="gray.0">
      <Box margin="0px auto" width="100%" zIndex="10">
        <Box position="sticky" top="0" bg="gray.100" width="100%" zIndex="10">
          <FormHeader title={t['warehouseTransferWarehouseTransfer']} />
        </Box>
        <Box minH="calc(100vh - 230px)">
          <FormProvider {...methods}>
            <form>
              <WarehouseTransferForm />
            </form>
          </FormProvider>
        </Box>
      </Box>

      <Box position="sticky" bottom={0}>
        <Box>
          {' '}
          <FormFooter mainButtonLabel="Save" mainButtonHandler={handleSave} />{' '}
        </Box>
      </Box>
    </Container>
  );
};
