import { DetailPageTabs } from '@coop/shared/ui';

import { MemberInfo } from './MemberInfo';
import { Summary } from './Summary';

type SidebarProps = {
  summary: {
    name: string | undefined | null;
    profilePic: string | undefined | null;
    transactionId: string | undefined | null;
    transactionDate: string | undefined | null;
    paymentMode: string | undefined | null;
    amount: string | undefined | null;
    method: string | undefined | null;
  };
};

export const SideBar = ({ summary }: SidebarProps) => (
  <>
    <Summary summary={summary} />
    <MemberInfo
      name={summary?.name}
      id={summary?.transactionId}
      profilePic={summary?.profilePic ?? ''}
    />
    <DetailPageTabs tabs={['OVERVIEW', 'REPORTS', 'ACTIVITY', 'DOCUMENTS', 'TASKS']} />
  </>
);
