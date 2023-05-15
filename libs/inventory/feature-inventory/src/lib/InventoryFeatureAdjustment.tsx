import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { omit } from 'lodash';

import { asyncToast } from '@myra-ui';

import {
  InputMaybe,
  InventoryAdjustmentInput,
  InventoryAdjustmentItemDetails,
  InventoryAdjustmentMode,
  useGetInventoryItemsListQuery,
  useGetWarehouseListQuery,
  useSetInventoryAdjustmentMutation,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { FormLayout } from '@coop/shared/form';

import InventoryAdjustmentForm from '../component/form/InventoryAdjustmentForm';
import { PurchaseAdjustmentTableType } from '../component/form/InventoryAdjustmentTable';

/* eslint-disable-next-line */
export interface InventoryFeatureAdjustmentProps {}
type CustomInventoryAdjustmentInput = {
  valueItems?: InputMaybe<Array<InputMaybe<InventoryAdjustmentItemDetails>>>;
} & InventoryAdjustmentInput;

export const InventoryFeatureAdjustment = () => {
  const router = useRouter();
  const methods = useForm<CustomInventoryAdjustmentInput>({
    defaultValues: {
      modeOfAdjustment: InventoryAdjustmentMode?.Quantity,
    },
  });
  const { mutateAsync: AddAdjustments } = useSetInventoryAdjustmentMutation();
  const { data: inventoryItems } = useGetInventoryItemsListQuery({
    pagination: {
      after: '',
      first: -1,
    },
  });
  const inventoryItemsData = inventoryItems?.inventory?.items?.list?.edges;

  const itemsSearchOptions = useMemo(
    () =>
      inventoryItemsData?.map((account) => ({
        label: account?.node?.name as string,
        value: account?.node?.id as string,
      })),
    [inventoryItemsData]
  );
  const { data: wareHouse } = useGetWarehouseListQuery({
    paginate: {
      after: '',
      first: -1,
    },
  });
  const warehouseData = wareHouse?.inventory?.warehouse?.listWarehouses?.edges;
  const wareHouseSearchOptions = useMemo(
    () =>
      warehouseData?.map((account) => ({
        label: account?.node?.name as string,
        value: account?.node?.id as string,
      })),
    [warehouseData]
  );

  const handleSave = () => {
    const values = methods.getValues();
    const mode = values?.modeOfAdjustment;
    const tableData = values?.itemDetails as PurchaseAdjustmentTableType[];
    const tableValueData = values?.valueItems as PurchaseAdjustmentTableType[];

    const filteredTableData =
      mode === InventoryAdjustmentMode?.Quantity
        ? tableData?.map((data) => ({
            itemId: data?.itemId,
            itemName: itemsSearchOptions?.find((d) => d?.value === data?.itemId)?.label,
            warehouseName: wareHouseSearchOptions?.find((d) => d?.value === data?.warehouseId)
              ?.label,
            warehouseId: data?.warehouseId,

            newQuantity: String(data?.newQuantity),
            quantityAdjusted: String(Math.abs(Number(data?.quantityAdjusted))),
            quantityAdjustedUnit: Number(data?.quantityAdjusted) >= 0 ? 'PLUS' : 'MINUS',
          })) || []
        : tableValueData?.map((data) => ({
            itemId: data?.itemId,
            itemName: itemsSearchOptions?.find((d) => d?.value === data?.itemId)?.label,
            newValue: String(data?.newValue),
            valueAdjusted: String(data?.quantityAdjusted),
          })) || [];
    const filteredValues = omit({ ...values }, ['valueItems']);

    asyncToast({
      id: 'account-open-add-minor',
      promise: AddAdjustments({
        data: {
          ...filteredValues,
          itemDetails: filteredTableData as InventoryAdjustmentItemDetails[],
        },
      }),
      msgs: {
        loading: 'Making Adjustment',
        success: 'Adjustment Made',
      },
      onSuccess: () => {
        router.push(ROUTES.INVENTORY_INVENTORY_ADJUSTMENT);
        // router.push('/accounting/investment/investment-transaction/list');
      },
    });
  };

  return (
    <FormLayout methods={methods}>
      <FormLayout.Header title="Inventory Adjsutment" />
      <FormLayout.Content>
        <FormLayout.Form>
          <InventoryAdjustmentForm />
        </FormLayout.Form>
      </FormLayout.Content>
      <FormLayout.Footer mainButtonLabel="Save" mainButtonHandler={handleSave} />{' '}
    </FormLayout>
  );
};
