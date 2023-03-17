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
        'Dormant Accounts',
        // 'ACTIVITY', 'DOCUMENTS', 'TASKS'
      ]}
    />
  </>
);
