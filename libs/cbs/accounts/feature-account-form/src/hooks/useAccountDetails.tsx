import { useRouter } from 'next/router';

import { useGetAccountTableListQuery } from '@coop/cbs/data-access';

export const useAccountDetails = () => {
  const router = useRouter();

  const { id } = router.query;

  const { data: accountListData } = useGetAccountTableListQuery(
    {
      paginate: {
        first: -1,
        after: '',
      },
      filter: { id: String(id) },
    },
    {
      staleTime: 0,
      enabled: !!id,
    }
  );

  return { accountDetails: accountListData?.account?.list?.edges?.[0]?.node };
};
