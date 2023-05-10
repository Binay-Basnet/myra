import { useRouter } from 'next/router';

import { useGetInventoryAdjustmentDetailsQuery } from '@coop/cbs/data-access';

export const useInventoryAdjustmentHook = () => {
  const router = useRouter();

  const { id } = router.query;
  const { data } = useGetInventoryAdjustmentDetailsQuery({ id: id as string });

  const detailData = data?.inventory?.adjustment?.detailAdjustment?.data;

  return {
    detailData,
  };
};
