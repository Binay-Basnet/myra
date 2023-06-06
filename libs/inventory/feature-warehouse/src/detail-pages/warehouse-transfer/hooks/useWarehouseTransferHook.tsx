import { useRouter } from 'next/router';

import { useGetInventoryWarehouseRequestTransferDetailsQuery } from '@coop/cbs/data-access';

export const useWarehouseTransferDetailsHook = () => {
  const router = useRouter();

  const { id } = router.query;
  const { data } = useGetInventoryWarehouseRequestTransferDetailsQuery({
    id: id as string,
  });
  const detailData = data?.inventory?.warehouse?.getWarehouseTransferDetail?.data;

  return {
    detailData,
  };
};
