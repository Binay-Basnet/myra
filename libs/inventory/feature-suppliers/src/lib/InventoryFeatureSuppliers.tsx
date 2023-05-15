import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { asyncToast } from '@myra-ui';

import { InvSupplierInput, useSetSuppliersAddMutation } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { FormLayout } from '@coop/shared/form';

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
    <FormLayout methods={methods}>
      <FormLayout.Header title="New Supplier" />
      <FormLayout.Content>
        <FormLayout.Form>
          <AddSupplierForm />
        </FormLayout.Form>
      </FormLayout.Content>

      <FormLayout.Footer mainButtonLabel="Save" mainButtonHandler={handleSave} />
    </FormLayout>
  );
};
