import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { asyncToast } from '@myra-ui';

import {
  InvItemsInput,
  useGetItemsFormStateQuery,
  useSetItemsMutation,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { FormLayout } from '@coop/shared/form';

import { InventoryItemVariantForm } from '../component/form/InventoryItemVariantForm';

/* eslint-disable-next-line */

export const InventoryFeatureItemVariant = () => {
  const router = useRouter();
  const methods = useForm({});
  const isAccounting = router?.pathname?.includes('accounting');

  const { mutateAsync: AddItemsVariant } = useSetItemsMutation();
  // const valuesTest = methods.getValues();

  // console.log({ valuesTest });

  const itemID = router?.query['id'];
  const handleSave = () => {
    const values = methods.getValues() as InvItemsInput;

    asyncToast({
      id: 'account-open-add-minor',
      promise: AddItemsVariant({
        id: itemID ? (itemID as string) : undefined,
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
        router.push(isAccounting ? ROUTES.ACCOUNTING_INVENTORY_ITEMS_LIST : ROUTES.INVENTORY_ITEMS);
        // router.push('/accounting/investment/investment-transaction/list');
      },
    });
  };

  // const router = useRouter();

  const handleButton = () => {
    router.push(isAccounting ? ROUTES.ACCOUNTING_INVENTORY_ITEMS_ADD : ROUTES.INVENTORY_ITEMS_ADD);
  };

  const itemData = useGetItemsFormStateQuery({
    id: itemID as string,
  });
  const itemFormData = itemData?.data?.inventory?.items?.getItem?.data;

  useEffect(() => {
    if (itemFormData) {
      methods?.reset({
        ...itemFormData,
      });
    }
  }, [itemID, itemFormData, methods]);
  return (
    <FormLayout methods={methods}>
      <FormLayout.Header
        title="Add Item"
        buttonLabel="Add Simple Item"
        buttonHandler={handleButton}
      />

      <FormLayout.Content>
        <FormLayout.Form>
          <InventoryItemVariantForm />
        </FormLayout.Form>
      </FormLayout.Content>

      <FormLayout.Footer mainButtonLabel="Save" mainButtonHandler={handleSave} />
    </FormLayout>
  );
};
