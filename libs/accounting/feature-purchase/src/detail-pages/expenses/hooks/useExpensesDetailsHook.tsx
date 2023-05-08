import { useRouter } from 'next/router';

import { useGetPurchaseExpenseDetailsQuery } from '@coop/cbs/data-access';

export const useExpensesDetailsHook = () => {
  const router = useRouter();

  const { id } = router.query;
  const { data } = useGetPurchaseExpenseDetailsQuery({ id: id as string });

  const detailData = data?.accounting?.purchase?.detailExpenses?.data;

  return {
    detailData,
  };
};
