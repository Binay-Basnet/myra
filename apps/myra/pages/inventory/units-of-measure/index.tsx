import { ReactElement } from 'react';

import {
  InventoryUnitsLayout,
  InventoryUseOfMeasureTable,
} from '@coop/myra/components';
import { MainLayoutInventory } from '@coop/shared/ui';

const InventoryUnitsOfMeasure = () => {
  return <InventoryUseOfMeasureTable />;
};

InventoryUnitsOfMeasure.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayoutInventory>
      <InventoryUnitsLayout>{page}</InventoryUnitsLayout>{' '}
    </MainLayoutInventory>
  );
};
export default InventoryUnitsOfMeasure;
