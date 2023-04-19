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
        'Interest Update',
        'Penalty Update',
        'Fee and Charges Update',
        'General Updates',
        // 'ACTIVITY', 'DOCUMENTS', 'TASKS'
      ]}
    />
  </>
);
