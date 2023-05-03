import { useRouter } from 'next/router';

import { useGetCustomerDetailsQuery } from '@coop/cbs/data-access';

export const useCustomerDetailsHook = () => {
  const router = useRouter();

  const { id } = router.query;
  const { data } = useGetCustomerDetailsQuery({ id: id as string });

  const detailData = data?.accounting?.sales?.detailCustomer?.data;

  return {
    detailData,
  };
};
