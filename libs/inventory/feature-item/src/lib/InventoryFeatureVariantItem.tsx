import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { asyncToast, Box, Container, FormFooter, FormHeader } from '@myra-ui';

import { useSetItemsMutation } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';

import { InventoryItemVariantForm } from '../component/form/InventoryItemVariantForm';

/* eslint-disable-next-line */

export const InventoryFeatureItemVariant = () => {
  const router = useRouter();
  const methods = useForm({});
  const { mutateAsync: AddItemsVariant } = useSetItemsMutation();
  const handleSave = () => {
    const values = methods.getValues();

    asyncToast({
      id: 'account-open-add-minor',
      promise: AddItemsVariant({
        data: {
          ...values,
          isVariantItem: true,
        },
      }),
      msgs: {
        loading: 'Adding Item',
        success: 'Item Added',
      },
      onSuccess: () => {
        router.push(ROUTES.INVENTORY_ITEMS);
        // router.push('/accounting/investment/investment-transaction/list');
      },
    });
  };

  // const router = useRouter();

  const handleButton = () => {
    router.push(ROUTES.INVENTORY_ITEMS_ADD);
  };
  return (
    <Container minW="container.lg" height="fit-content" bg="gray.0">
      <Box margin="0px auto" width="100%" zIndex="10">
        <Box position="sticky" top="0" bg="gray.100" width="100%" zIndex="10">
          <FormHeader title="Add Item" buttonLabel="Add Simple Item" buttonHandler={handleButton} />
        </Box>
        <Box minH="calc(100vh - 230px)">
          <FormProvider {...methods}>
            <form>
              <InventoryItemVariantForm />
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
