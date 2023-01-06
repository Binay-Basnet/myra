import { useRouter } from 'next/router';

import { useGetCoaLeafNodeDetailsQuery } from '@coop/cbs/data-access';

export const useCOALeafNodeDetails = () => {
  const router = useRouter();

  const { id } = router.query;

  const { data: leafNodeQueryData } = useGetCoaLeafNodeDetailsQuery(
    {
      id: id as string,
    },
    {
      enabled: !!id,
    }
  );

  return { leafNodeData: leafNodeQueryData?.settings?.chartsOfAccount?.coaLeafNodeDetails?.data };
};
