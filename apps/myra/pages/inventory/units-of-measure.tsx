import {
  InventoryLayout,
  InventoryUseOfMeasureTable,
} from '@saccos/myra/components';
import { ReactElement } from 'react';

const InventoryUnitsOfMeasure = () => {
  return <InventoryUseOfMeasureTable />;
};

InventoryUnitsOfMeasure.getLayout = function getLayout(page: ReactElement) {
  return <InventoryLayout headingText="Item Group">{page}</InventoryLayout>;
};
export default InventoryUnitsOfMeasure;
