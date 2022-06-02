import { ReactElement } from 'react';
import {
  InventoryPageLayout,
  InventoryUseOfMeasureTable,
} from '@saccos/myra/components';
import { MainLayout } from '@saccos/myra/ui';

const InventoryUnitsOfMeasure = () => {
  return <InventoryUseOfMeasureTable />;
};

InventoryUnitsOfMeasure.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <InventoryPageLayout>{page}</InventoryPageLayout>{' '}
    </MainLayout>
  );
};
export default InventoryUnitsOfMeasure;
