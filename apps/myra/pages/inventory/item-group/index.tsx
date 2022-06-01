import { ReactElement } from 'react';
import {
  InventoryItemGroupTable,
  InventoryLayout,
} from '@saccos/myra/components';
import Router from 'next/router';

import { useMembersQuery } from '../../../generated/graphql';

const InventoryItemGroupPage = () => {
  const { data, isLoading } = useMembersQuery();

  return <InventoryItemGroupTable data={data} isLoading={isLoading} />;
};

InventoryItemGroupPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <InventoryLayout
      onClick={() => {
        Router.push('/inventory/item-group/add-new-item-group');
      }}
      headingText="Item Group"
    >
      {page}
    </InventoryLayout>
  );
};
export default InventoryItemGroupPage;
