import { ReactElement } from 'react';
import { InventoryItemTable, InventoryLayout } from '@saccos/myra/components';
import Router from 'next/router';

import { useMembersQuery } from '../../../generated/graphql';

const InventoryProduct = () => {
  const { data, isLoading } = useMembersQuery();

  return <InventoryItemTable data={data} isLoading={isLoading} />;
};

InventoryProduct.getLayout = function getLayout(page: ReactElement) {
  return (
    <InventoryLayout
      headingText="Products"
      onClick={() => {
        Router.push('/inventory/items/add-new-item');
      }}
    >
      {page}
    </InventoryLayout>
  );
};
export default InventoryProduct;
