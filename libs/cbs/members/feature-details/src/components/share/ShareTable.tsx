import { useRouter } from 'next/router';

import { DetailsCard } from '@myra-ui';

import { useGetMemberDetailsShareBalanceQuery } from '@coop/cbs/data-access';

import { ShareTableComponent } from './ShareBalanceTableComp';

export const ShareTable = () => {
  const router = useRouter();

  const memberDetails = useGetMemberDetailsShareBalanceQuery({
    id: router.query['id'] as string,
  });
  const memberReportsDetails = memberDetails?.data?.share?.history?.history;

  const memberListData =
    memberReportsDetails?.map((data) => ({
      id: data?.id,
      date: data?.transactionDate,
      type: data?.transactionDirection,
      toFrom: `${data?.startNumber} - ${data?.endNumber}`,
      count: data?.noOfShare,
      shareCr: data?.credit ? Number(data?.credit) * 100 : null,
      shareDr: data?.debit ? Number(data?.debit) * 100 : null,
      balance: data?.balance,
    })) || [];
  return (
    <DetailsCard hasTable bg="white" title="Share Balance Table">
      <ShareTableComponent data={memberListData} />
    </DetailsCard>
  );
};
