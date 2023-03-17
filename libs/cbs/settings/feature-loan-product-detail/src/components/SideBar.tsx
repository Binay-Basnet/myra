import { DetailPageTabs } from '@myra-ui';

import { ProductInfo } from './ProductInfo';

export const SideBar = () => (
  <>
    <ProductInfo />
    <DetailPageTabs
      tabs={[
        'OVERVIEW',
        'Active Accounts',
        'Inactive Accounts',
        // 'ACTIVITY', 'DOCUMENTS', 'TASKS'
      ]}
    />
  </>
);
