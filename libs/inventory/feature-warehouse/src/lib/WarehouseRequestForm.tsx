import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { asyncToast } from '@myra-ui';

import { useSetWareHouseTransferMutation, WarehouseTransferType } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { FormLayout } from '@coop/shared/form';

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
    <FormLayout methods={methods}>
      <FormLayout.Header title="Warehouse Transfer Request" />
      <FormLayout.Content>
        <FormLayout.Form>
          <WarehouseTransferForm />
        </FormLayout.Form>
      </FormLayout.Content>

      <FormLayout.Footer mainButtonLabel="Save" mainButtonHandler={handleSave} />
    </FormLayout>
  );
};
