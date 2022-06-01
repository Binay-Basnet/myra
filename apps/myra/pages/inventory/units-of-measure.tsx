import { ReactElement } from 'react';
import {
  InventoryPageLayout,
  InventoryUseOfMeasureTable,
} from '@saccos/myra/components';

const InventoryUnitsOfMeasure = () => {
  return <InventoryUseOfMeasureTable />;
};

InventoryUnitsOfMeasure.getLayout = function getLayout(page: ReactElement) {
  return (
    <InventoryPageLayout mainTitle="Item Group">{page}</InventoryPageLayout>
  );
};
export default InventoryUnitsOfMeasure;
