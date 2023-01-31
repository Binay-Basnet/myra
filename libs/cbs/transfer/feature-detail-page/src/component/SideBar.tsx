import { DetailPageTabs } from '@myra-ui';

import { SidebarInfo } from './SidebarInfo';

type SidebarProps = {
  sidebarData: {
    code: string | null | undefined;
    memberCode: string | null | undefined;
    date: string | null | undefined;
    transferType?: string | null | undefined;
    amount: string | null | undefined;
    srcTellerName: string | null | undefined;
    srcTellerPic: string | null | undefined;
  };
};

export const SideBar = ({ sidebarData }: SidebarProps) => (
  <>
    <SidebarInfo sidebarData={sidebarData} />
    <DetailPageTabs tabs={['Overview']} />
  </>
);
