import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { asyncToast } from '@myra-ui';

import { useGetItemsFormStateQuery, useSetItemsMutation } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { FormLayout } from '@coop/shared/form';

import { InventorySimpleForm } from '../component/form/InventorySimpleForm';

/* eslint-disable-next-line */

export const InventoryFeatureItem = () => {
  const router = useRouter();
  const { mutateAsync: AddItems } = useSetItemsMutation();
  const isAccounting = router?.pathname?.includes('accounting');

  const itemID = router?.query['id'];
  const handleSave = () => {
    const values = methods.getValues();

    asyncToast({
      id: 'account-open-add-minor',
      promise: AddItems({
        id: itemID ? (itemID as string) : undefined,
        data: {
          ...values,

          isVariantItem: false,
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
  const methods = useForm({});

  const handleButton = () => {
    router.push(
      isAccounting
        ? ROUTES.ACCOUTING_INVENTORY_VARIANT_ITEMS_ADD
        : ROUTES.INVENTORY_ITEMS_VARIANT_ADD
    );
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
        buttonLabel="Add Variant Item"
        buttonHandler={handleButton}
      />
      <FormLayout.Content>
        <FormLayout.Form>
          <InventorySimpleForm />
        </FormLayout.Form>
      </FormLayout.Content>
      <FormLayout.Footer mainButtonLabel="Save" mainButtonHandler={handleSave} />{' '}
    </FormLayout>
  );
};
