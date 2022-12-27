import { useRouter } from 'next/router';

import { useGetCoaAccountDetailsQuery } from '@coop/cbs/data-access';

export const useCOAAccountDetails = () => {
  const router = useRouter();

  const { id } = router.query;

  const { data: accountQueryData } = useGetCoaAccountDetailsQuery(
    {
      id: id as string,
    },
    {
      enabled: !!id,
    }
  );

  return { accountDetails: accountQueryData?.settings?.chartsOfAccount?.coaAccountDetails?.data };
};
