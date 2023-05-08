import { useRouter } from 'next/router';

import { useGetPurchaseDebitNoteDetailsQuery } from '@coop/cbs/data-access';

export const usePurchaseDebitNoteHook = () => {
  const router = useRouter();

  const { id } = router.query;
  const { data } = useGetPurchaseDebitNoteDetailsQuery({ id: id as string });

  const detailData = data?.accounting?.purchase?.detailDebitNote?.data;

  return {
    detailData,
  };
};
