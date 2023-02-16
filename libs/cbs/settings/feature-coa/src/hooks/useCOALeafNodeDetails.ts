import { useRouter } from 'next/router';

import { useGetCoaLeafNodeDetailsQuery, useGetLedgerListQuery } from '@coop/cbs/data-access';
import { getRouterQuery } from '@coop/shared/utils';

export const useCOALeafNodeDetails = () => {
  const router = useRouter();

  const { id, branch } = router.query;

  const { data: leafNodeQueryData } = useGetCoaLeafNodeDetailsQuery(
    {
      id: id as string,
      branch: branch ? JSON.parse(branch as string) : [],
    },
    {
      enabled: !!id,
    }
  );

  const { data: list } = useGetLedgerListQuery({
    id: id as string,
    branchId: branch ? JSON.parse(branch as string) : [],
    pagination: getRouterQuery({ type: ['PAGINATION'] }),
  });

  const ledgerList = list?.settings?.chartsOfAccount?.coaLedgerList;

  return {
    leafNodeData: leafNodeQueryData?.settings?.chartsOfAccount?.coaLeafNodeDetails?.data,
    ledgerList,
  };
};
