import { useRouter } from 'next/router';

import { useGetPurchaseEntryDetailsQuery } from '@coop/cbs/data-access';

export const usePurchaseDetailsHook = () => {
  const router = useRouter();

  const { id } = router.query;
  const { data } = useGetPurchaseEntryDetailsQuery({ id: id as string });

  const detailData = data?.accounting?.purchase?.detailPurchaseEntry?.data;

  return {
    detailData,
  };
};
