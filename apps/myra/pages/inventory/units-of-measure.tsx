import { ReactElement } from 'react';
import {
  InventoryLayout,
  InventoryUseOfMeasureTable,
} from '@saccos/myra/components';

import { useMembersQuery } from '../../generated/graphql';

const InventoryUnitsOfMeasure = () => {
  const { data, isLoading } = useMembersQuery();

  return <InventoryUseOfMeasureTable data={data} isLoading={isLoading} />;
};

InventoryUnitsOfMeasure.getLayout = function getLayout(page: ReactElement) {
  return <InventoryLayout headingText="Item Group">{page}</InventoryLayout>;
};
export default InventoryUnitsOfMeasure;
