import { DetailsCard } from '@myra-ui';

import { AdjustmentUnit, InventoryAdjustmentMode } from '@coop/cbs/data-access';

import { QuantityAdjustmentTable } from './AdjustmentQuantityTable';
import { ValueAdjustmentTable } from './AdjustmentValueTable';
import { useInventoryAdjustmentHook } from '../hooks/useInventoryAdjustmentHook';

export const AdjustmentDetails = () => {
  const { detailData } = useInventoryAdjustmentHook();
  const quantityData =
    detailData?.itemDetails?.map((data, index) => ({
      sn: Number(index) + 1,

      itemId: data?.itemId,
      warehouseName: data?.warehouseName,
      newQuantity: data?.newQuantity,
      oldQuantity:
        data?.quantityAdjustedUnit === AdjustmentUnit.Minus
          ? Number(data?.newQuantity) + Number(data?.quantityAdjusted)
          : Number(data?.newQuantity) - Number(data?.quantityAdjusted),
      quantityAdjusted: data?.quantityAdjusted,
      date: detailData?.date,
    })) || [];
  const valueData =
    detailData?.itemDetails?.map((data, index) => ({
      sn: Number(index) + 1,

      itemId: data?.itemId,
      newValue: data?.newValue,
      date: detailData?.date,
    })) || [];
  return (
    <DetailsCard hasTable bg="white" title=" Adjustment Table">
      {detailData?.modeOfAdjustment === InventoryAdjustmentMode.Quantity && (
        <QuantityAdjustmentTable data={quantityData} />
      )}
      {detailData?.modeOfAdjustment === InventoryAdjustmentMode.Value && (
        <ValueAdjustmentTable data={valueData} />
      )}
    </DetailsCard>
  );
};
