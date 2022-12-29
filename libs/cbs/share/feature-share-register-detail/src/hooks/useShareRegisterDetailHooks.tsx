import { useRouter } from 'next/router';

import { useGetShareDetailQuery } from '@coop/cbs/data-access';

export const useShareRegisterDetailHooks = () => {
  const router = useRouter();

  const { id } = router.query;

  const { data } = useGetShareDetailQuery({ transactionID: id as string });

  const shareDetails = data?.share?.shareDetail?.data;

  const shareDetailsData = {
    id: shareDetails?.transactionCode,
    memberId: shareDetails?.member?.id,
    date: shareDetails?.date?.local,
    type: shareDetails?.type,
    fromTo: shareDetails?.fromTo,
    noOfShare: shareDetails?.noOfShare,
    amount: shareDetails?.amount,
    total: shareDetails?.total,
    status: shareDetails?.status,
  };

  return { shareDetails, shareDetailsData };
};
