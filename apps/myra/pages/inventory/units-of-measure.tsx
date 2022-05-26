import { ReactElement } from 'react';

import {
  InventoryLayout,
  InventoryUseOfMeasureTable,
} from '@saccos/myra/components';

const InventoryUnitsOfMeasure = () => {
  return <InventoryUseOfMeasureTable />;
};

InventoryUnitsOfMeasure.getLayout = function getLayout(page: ReactElement) {
  return <InventoryLayout headingText="Item Group">{page}</InventoryLayout>;
};
export default InventoryUnitsOfMeasure;
