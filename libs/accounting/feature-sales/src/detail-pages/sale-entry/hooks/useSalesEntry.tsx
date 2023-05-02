import { useRouter } from 'next/router';

import { useGetSalesEntryDetailsQuery } from '@coop/cbs/data-access';

export const useSalesDetailsHooks = () => {
  const router = useRouter();

  const { id } = router.query;
  const { data } = useGetSalesEntryDetailsQuery({ id: id as string });

  const detailData = data?.accounting?.sales?.detailSaleEntry?.data;

  return {
    detailData,
  };
};
