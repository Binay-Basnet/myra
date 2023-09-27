import { DetailPageTabs } from '@myra-ui';

import { ProductInfo } from './ProductInfo';

export const SideBar = () => (
  <>
    <ProductInfo />
    <DetailPageTabs
      tabs={[
        'OVERVIEW',
        'Account List',
        'Active Accounts',
        'Inactive Accounts',
        'Product Premium',
        'Penalty Update',
        'Rebate Update',
        'Fee and Charges Update',
        'General Updates',
        // 'ACTIVITY', 'DOCUMENTS', 'TASKS'
      ]}
    />
  </>
);
