import { useRouter } from 'next/router';

import { useGetInventorySuppliersDetailsQuery } from '@coop/cbs/data-access';

export const useSupplierDetails = () => {
  const router = useRouter();

  const { id } = router.query;
  const { data } = useGetInventorySuppliersDetailsQuery({ id: id as string });

  const detailData = data?.inventory?.suppliers?.supplierDetail?.data;

  return {
    detailData,
  };
};
