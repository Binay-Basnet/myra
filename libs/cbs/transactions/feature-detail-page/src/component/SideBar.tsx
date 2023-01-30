import { useRouter } from 'next/router';

import { DetailPageTabs } from '@myra-ui';

import { Member } from '@coop/cbs/data-access';

import { MemberInfo } from './MemberInfo';
import { Summary } from './Summary';

type SidebarProps = {
  summary: {
    memberId?: string | undefined | null;
    code?: string | null;
    name?: string | undefined | null;
    profilePic?: string | undefined | null;
    transactionId?: string | undefined | null;
    transactionDate?: Record<'local' | 'en' | 'np', string> | null | undefined;
    paymentMode?: string | undefined | null;
    amount?: string | undefined | null;
    method?: string | undefined | null;
    sourceAccount?: string | undefined | null;
    sourceAccountId?: string | null | undefined;
    destinationName?: string | undefined | null;
    destinationAccount?: string | undefined | null;
    destinationAccountId?: string | null | undefined;
    recipientMember?: string | undefined | null;
    loanAccountName?: string | undefined | null;
    loanSubtype?: string | undefined | null;
    loanAccId?: string | undefined | null;
    repaymentDate?: Record<'local' | 'en' | 'np', string> | undefined | null;
    interestRate?: string | undefined | null;
    senderMember?: Member | null | undefined;
    reciepentMemberDetails?: Member | null | undefined;
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
            memberCode={summary?.code}
            memberId={summary?.memberId}
            detailPage={detailPage}
            name={summary?.name}
            profilePic={summary?.profilePic ?? ''}
            sourceAccount={summary?.sourceAccount ?? ''}
            sourceAccountId={summary?.sourceAccountId}
            destinationName={summary?.destinationName ?? ' '}
            destinationAccountId={summary?.destinationAccountId}
            destinationAccount={summary?.destinationAccount ?? ''}
            recipientMemberId={summary?.recipientMember ?? ''}
            senderMember={summary?.senderMember}
            reciepentMember={summary?.reciepentMemberDetails}
          />
        </>
      )}

      {(detailPage === 'withdraw' ||
        detailPage === 'deposit' ||
        detailPage === 'agentTransaction') && (
        <>
          <Summary detailPage={detailPage} summary={summary} />
          <MemberInfo
            memberId={
              detailPage === 'agentTransaction' ? (id as string) : (summary?.memberId as string)
            }
            memberCode={summary?.code}
            detailPage={detailPage}
            name={summary?.name}
            profilePic={summary?.profilePic ?? ''}
            sourceAccount={summary?.sourceAccount ?? ''}
            destinationName={summary?.destinationName ?? ' '}
            destinationAccount={summary?.destinationAccount ?? ''}
          />
        </>
      )}

      {detailPage === 'loanRepayment' && (
        <>
          <Summary detailPage={detailPage} summary={summary} />
          <MemberInfo
            memberId={summary?.memberId}
            memberCode={summary?.code}
            detailPage={detailPage}
            name={summary?.name}
            profilePic={summary?.profilePic ?? ''}
            sourceAccount={summary?.sourceAccount ?? ''}
            destinationName={summary?.destinationName ?? ' '}
            destinationAccount={summary?.destinationAccount ?? ''}
          />
        </>
      )}
      <DetailPageTabs
        tabs={[
          'OVERVIEW',
          // , 'REPORTS', 'ACTIVITY', 'DOCUMENTS', 'TASKS'
        ]}
      />
    </>
  );
};
