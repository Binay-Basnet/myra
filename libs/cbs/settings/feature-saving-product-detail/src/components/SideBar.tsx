import { DetailPageTabs } from '@myra-ui';

import { ProductInfo } from './ProductInfo';

export const SideBar = () => (
  <>
    <ProductInfo />
    <DetailPageTabs
      tabs={[
        'OVERVIEW',
        // 'Account List',
        'Active Accounts',
        'Inactive Accounts',
        'Dormant Accounts',
        'Product Premium',
        'Interest Breakdown',
        'Penalty Update',
        'Fee and Charges Update',
        'Cheque Settings Update',
        'General Updates',

        // 'ACTIVITY', 'DOCUMENTS', 'TASKS'
      ]}
    />
  </>
);
