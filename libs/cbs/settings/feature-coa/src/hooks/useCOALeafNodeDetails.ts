import { useRouter } from 'next/router';

import { useGetCoaLeafNodeDetailsQuery, useGetLedgerListQuery } from '@coop/cbs/data-access';
import { getFilterQuery, getPaginationQuery } from '@coop/shared/utils';

export const useCOALeafNodeDetails = () => {
  const router = useRouter();

  const { id, branch, date } = router.query;

  const { data: leafNodeQueryData } = useGetCoaLeafNodeDetailsQuery(
    {
      id: id as string,
      branch: branch ? JSON.parse(branch as string) : [],
      snapshot: date as string,
    },
    {
      enabled: !!id,
    }
  );

  const { data: list, isLoading: isLedgerListLoading } = useGetLedgerListQuery({
    id: id as string,
    branchId: branch ? JSON.parse(branch as string) : [],
    pagination: getPaginationQuery(),
    filter: getFilterQuery(),
    snapshot: date as string,
  });

  const ledgerList = list?.settings?.chartsOfAccount?.coaLedgerList;

  return {
    leafNodeData: leafNodeQueryData?.settings?.chartsOfAccount?.coaLeafNodeDetails?.data,
    ledgerList,
    isLedgerListLoading,
  };
};
