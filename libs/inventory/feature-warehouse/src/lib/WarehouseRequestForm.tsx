import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { omit } from 'lodash';

import { asyncToast } from '@myra-ui';

import {
  useSetWareHouseTransferMutation,
  WarehouseTransferInput,
  WarehouseTransferType,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { FormLayout } from '@coop/shared/form';

import { WarehouseTransferForm } from '../component/WarehouseTransferForm';

/* eslint-disable-next-line */
export type CustomWareHouseTransferType = {
  itemDetails?: {
    itemId: { label: string; value: string };
    quantity: string;
    description: string;
  }[];
} & WarehouseTransferInput;

export const WarehouseRequestForm = () => {
  const router = useRouter();
  const { mutateAsync: AddItems } = useSetWareHouseTransferMutation();

  const handleSave = () => {
    const values = methods.getValues();
    const transferType = { transferType: WarehouseTransferType?.Request };
    const fullValues = { ...values, ...transferType };
    const filteredValues = {
      ...omit({ ...fullValues }, ['branchId']),
    };
    const tableData = values?.itemDetails;

    const filteredTableData =
      tableData?.map((data) => ({
        itemId: data?.itemId?.value,
        quantity: data?.quantity,
        description: data?.description,
      })) || [];

    asyncToast({
      id: 'account-open-add-minor',
      promise: AddItems({
        data: {
          ...filteredValues,
          itemDetails: filteredTableData,
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
  const methods = useForm<CustomWareHouseTransferType>({});

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
