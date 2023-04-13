import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { omit } from 'lodash';

import { asyncToast, Box, Container, FormFooter, FormHeader } from '@myra-ui';

import {
  InputMaybe,
  InventoryAdjustmentInput,
  InventoryAdjustmentItemDetails,
  InventoryAdjustmentMode,
  useSetInventoryAdjustmentMutation,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';

import InventoryAdjustmentForm from '../component/form/InventoryAdjustmentForm';
import { PurchaseAdjustmentTableType } from '../component/form/InventoryAdjustmentTable';

/* eslint-disable-next-line */
export interface InventoryFeatureAdjustmentProps {}
type CustomInventoryAdjustmentInput = {
  valueItems?: InputMaybe<Array<InputMaybe<InventoryAdjustmentItemDetails>>>;
} & InventoryAdjustmentInput;

export const InventoryFeatureAdjustment = () => {
  const router = useRouter();
  const methods = useForm<CustomInventoryAdjustmentInput>({});
  const { mutateAsync: AddAdjustments } = useSetInventoryAdjustmentMutation();

  const handleSave = () => {
    const values = methods.getValues();
    const mode = values?.modeOfAdjustment;
    const tableData = values?.itemDetails as PurchaseAdjustmentTableType[];
    const tableValueData = values?.valueItems as PurchaseAdjustmentTableType[];

    const filteredTableData =
      mode === InventoryAdjustmentMode?.Quantity
        ? tableData?.map((data) => ({
            itemId: data?.itemId,
            warehouseId: data?.warehouseId,

            newQuantity: String(data?.newQuantity),
            quantityAdjusted: String(Math.abs(Number(data?.quantityAdjusted))),
            quantityAdjustedUnit: Number(data?.quantityAdjusted) >= 0 ? 'PLUS' : 'MINUS',
          })) || []
        : tableValueData?.map((data) => ({
            itemId: data?.itemId,

            newValue: String(data?.newValue),
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
    <Container minW="container.lg" height="fit-content" bg="gray.0">
      <Box margin="0px auto" width="100%" zIndex="10">
        <Box position="sticky" top="0" bg="gray.100" width="100%" zIndex="10">
          <FormHeader title="Inventory Adjustment" />
        </Box>
        <Box minH="calc(100vh - 230px)">
          <FormProvider {...methods}>
            <form>
              <InventoryAdjustmentForm />
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
