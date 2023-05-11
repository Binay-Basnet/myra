import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { asyncToast, Box, Container, FormFooter, FormHeader } from '@myra-ui';

import { useSetWareHouseTransferMutation, WarehouseTransferType } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';

import { WarehouseTransferForm } from '../component/WarehouseTransferForm';

/* eslint-disable-next-line */

export const WarehouseRequestForm = () => {
  const router = useRouter();
  const { mutateAsync: AddItems } = useSetWareHouseTransferMutation();

  const handleSave = () => {
    const values = methods.getValues();
    const transferType = { transferType: WarehouseTransferType?.Request };
    const fullValues = { ...values, ...transferType };
    asyncToast({
      id: 'account-open-add-minor',
      promise: AddItems({
        data: {
          ...fullValues,
        },
      }),
      msgs: {
        loading: 'Requesting Warehouse',
        success: 'Warehouse Request Successful',
      },
      onSuccess: () => {
        router.push(ROUTES.INVENTORY_WAREHOUSE_REQUEST_LIST);
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
          <FormHeader title="Request Warehouse" />
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
