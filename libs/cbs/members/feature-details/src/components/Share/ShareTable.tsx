import { useRouter } from 'next/router';

import { useGetMemberDetailsShareBalanceQuery } from '@coop/cbs/data-access';
import { DetailsCard } from '@coop/shared/ui';

import { ShareTableComponent } from './ShareBalanceTableComp';

export const ShareTable = () => {
  const router = useRouter();

  const memberDetails = useGetMemberDetailsShareBalanceQuery({
    id: router.query['id'] as string,
  });
  const memberReportsDetails = memberDetails?.data?.share?.history?.history;

  const memberListData =
    memberReportsDetails?.map((data) => ({
      date: data?.transactionDate,
      type: data?.transactionDirection,
      toFrom: `${data?.startNumber} - ${data?.endNumber}`,
      shareCr: data?.credit,
      shareDr: data?.debit,
      balance: data?.shareAmount,
    })) || [];
  return (
    <DetailsCard hasTable bg="white" title="Share Balance Table">
      <ShareTableComponent data={memberListData} />
    </DetailsCard>
  );
};
