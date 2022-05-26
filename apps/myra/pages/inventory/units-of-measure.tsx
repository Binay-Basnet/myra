import { ReactElement } from 'react';

import { InventoryLayout } from '@saccos/myra/ui';
import { InventoryUseOfMeasureTable } from '@saccos/myra/components';

const InventoryUnitsOfMeasure = () => {
  return <InventoryUseOfMeasureTable />;
};

InventoryUnitsOfMeasure.getLayout = function getLayout(page: ReactElement) {
  return <InventoryLayout headingText="Item Group">{page}</InventoryLayout>;
};
export default InventoryUnitsOfMeasure;
