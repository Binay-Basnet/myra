import { DetailPageTabs } from '@myra-ui';

import { LoanInfo } from './LoanInfo';

export const SideBar = () => (
  <>
    <LoanInfo />
    <DetailPageTabs tabs={['Overview', 'Collateral', 'Guarantee']} />
  </>
);
