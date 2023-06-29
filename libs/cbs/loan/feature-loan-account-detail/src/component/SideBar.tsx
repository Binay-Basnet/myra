import { DetailPageTabs } from '@myra-ui';

import { LoanInfo } from './LoanInfo';

export const SideBar = () => (
  <>
    <LoanInfo />
    <DetailPageTabs
      tabs={[
        'Overview',
        'Collateral',
        'Guarantee',
        'Ledger',
        'Account Premium Update',
        'General Updates',
      ]}
    />
  </>
);
