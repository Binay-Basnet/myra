import { DetailPageTabs } from '@myra-ui';

import { Summary } from './Summary';

export const SideBar = () => (
  <>
    <Summary />
    <DetailPageTabs tabs={['OVERVIEW']} />
  </>
);
