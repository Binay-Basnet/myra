import { useRouter } from 'next/router';

import { useGetAccountDetailsDataQuery } from '@coop/cbs/data-access';

export const useAccountDetails = () => {
  const router = useRouter();

  const { id } = router.query;

  const { data: accountDetailQueryData } = useGetAccountDetailsDataQuery(
    { id: String(id) },
    { enabled: !!id }
  );

  return { accountDetails: accountDetailQueryData?.account?.accountDetails?.data };
};
