import { ReactElement } from 'react';
import { InventoryLayout, InventoryVendorTable } from '@saccos/myra/components';

import { useMembersQuery } from '../../generated/graphql';

const InventoryVendor = () => {
  const { data, isLoading } = useMembersQuery();

  return <InventoryVendorTable data={data} isLoading={isLoading} />;
};

InventoryVendor.getLayout = function getLayout(page: ReactElement) {
  return <InventoryLayout headingText="Item Group">{page}</InventoryLayout>;
};
export default InventoryVendor;
