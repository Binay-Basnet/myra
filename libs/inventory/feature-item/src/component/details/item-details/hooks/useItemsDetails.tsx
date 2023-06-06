import { useRouter } from 'next/router';

import { useGetInventoryItemsDetailsQuery } from '@coop/cbs/data-access';

export const useItemDetailsHook = () => {
  const router = useRouter();

  const { id } = router.query;
  const { data } = useGetInventoryItemsDetailsQuery({ id: id as string });

  const detailData = data?.inventory?.items?.getItemDetails?.data;

  return {
    detailData,
  };
};
