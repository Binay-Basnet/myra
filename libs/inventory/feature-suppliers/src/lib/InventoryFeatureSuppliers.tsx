import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { asyncToast, Box, Container, FormFooter, FormHeader } from '@myra-ui';

import { InvSupplierInput, useSetSuppliersAddMutation } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';

import { AddSupplierForm } from '../component/form/AddSupplierForm';

/* eslint-disable-next-line */

export const InventoryFeatureSuppliers = () => {
  const router = useRouter();
  const { mutateAsync: AddSuppliers } = useSetSuppliersAddMutation();
  const handleSave = () => {
    const values = methods.getValues();

    asyncToast({
      id: 'account-open-add-minor',
      promise: AddSuppliers({
        data: {
          ...values,
        },
      }),
      msgs: {
        loading: 'Adding Suppliers',
        success: 'New Supplier Added',
      },
      onSuccess: () => {
        router.push(ROUTES.INVENTORY_SUPPLIERS_LIST);
        // router.push('/accounting/investment/investment-transaction/list');
      },
      onError: (error) => {
        if (error.__typename === 'ValidationError') {
          Object.keys(error.validationErrorMsg).map((key) =>
            methods.setError(key as keyof InvSupplierInput, {
              message: error.validationErrorMsg[key][0] as string,
            })
          );
        }
      },
    });
  };

  // const router = useRouter();
  const methods = useForm({});

  return (
    <Container minW="container.lg" height="fit-content" bg="gray.0">
      <Box margin="0px auto" width="100%" zIndex="10">
        <Box position="sticky" top="0" bg="gray.100" width="100%" zIndex="10">
          <FormHeader title="New Supplier" />
        </Box>
        <Box minH="calc(100vh - 230px)">
          <FormProvider {...methods}>
            <form>
              <AddSupplierForm />
            </form>
          </FormProvider>
        </Box>
      </Box>

      <Box position="sticky" bottom={0}>
        <FormFooter mainButtonLabel="Save" mainButtonHandler={handleSave} />
      </Box>
    </Container>
  );
};
