import { DetailPageTabs } from '@myra-ui';

import { Summary } from './Summary';

type SidebarType = {
  sidebarData: {
    id: string | null | undefined;
    date: Record<'local' | 'en' | 'np', string> | null | undefined;
    status: string | null | undefined;
    amount: string | null | undefined;
  };
};

export const SideBar = ({ sidebarData }: SidebarType) => (
  <>
    <Summary sidebarData={sidebarData} />
    <DetailPageTabs tabs={['OVERVIEW']} />
    {/* <DetailPageTabs tabs={['OVERVIEW', 'Account List', 'ACTIVITY', 'DOCUMENTS', 'TASKS']} /> */}
  </>
);
