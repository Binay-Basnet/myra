import { useRouter } from 'next/router';
import { DetailPageTabs } from '@myra-ui';

import { MemberInfo } from './MemberInfo';
import { Summary } from './Summary';

type SidebarProps = {
  summary: {
    memberId?: string | undefined | null;
    code?: string | null;
    name?: string | undefined | null;
    profilePic?: string | undefined | null;
    transactionId?: string | undefined | null;
    transactionDate?: string | undefined | null;
    paymentMode?: string | undefined | null;
    amount?: string | undefined | null;
    method?: string | undefined | null;
    sourceAccount?: string | undefined | null;
    destinationName?: string | undefined | null;
    destinationAccount?: string | undefined | null;
    loanAccountName?: string | undefined | null;
    loanSubtype?: string | undefined | null;
    loanAccId?: string | undefined | null;
    repaymentDate?: string | undefined | null;
    interestRate?: string | undefined | null;
  };
  detailPage: 'deposit' | 'withdraw' | 'accountTransfer' | 'agentTransaction' | 'loanRepayment';
};

export const SideBar = ({ summary, detailPage }: SidebarProps) => {
  const router = useRouter();

  const { id } = router.query;

  return (
    <>
      {detailPage === 'accountTransfer' && (
        <>
          <Summary detailPage={detailPage} summary={summary} />
          <MemberInfo
            memberId={summary?.memberId}
            detailPage={detailPage}
            name={summary?.name}
            profilePic={summary?.profilePic ?? ''}
            sourceAccount={summary?.sourceAccount ?? ''}
            destinationName={summary?.destinationName ?? ' '}
            destinationAccount={summary?.destinationAccount ?? ''}
          />
        </>
      )}

      {(detailPage === 'withdraw' ||
        detailPage === 'deposit' ||
        detailPage === 'agentTransaction') && (
        <>
          <MemberInfo
            memberId={
              detailPage === 'agentTransaction' ? (id as string) : (summary?.code as string)
            }
            detailPage={detailPage}
            name={summary?.name}
            profilePic={summary?.profilePic ?? ''}
            sourceAccount={summary?.sourceAccount ?? ''}
            destinationName={summary?.destinationName ?? ' '}
            destinationAccount={summary?.destinationAccount ?? ''}
          />
          <Summary detailPage={detailPage} summary={summary} />
        </>
      )}

      {detailPage === 'loanRepayment' && (
        <>
          <MemberInfo
            memberId={summary?.code}
            detailPage={detailPage}
            name={summary?.name}
            profilePic={summary?.profilePic ?? ''}
            sourceAccount={summary?.sourceAccount ?? ''}
            destinationName={summary?.destinationName ?? ' '}
            destinationAccount={summary?.destinationAccount ?? ''}
          />
          <Summary detailPage={detailPage} summary={summary} />
        </>
      )}
      <DetailPageTabs tabs={['OVERVIEW', 'REPORTS', 'ACTIVITY', 'DOCUMENTS', 'TASKS']} />
    </>
  );
};
