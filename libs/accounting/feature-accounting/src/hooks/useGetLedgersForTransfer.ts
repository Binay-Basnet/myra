import { useFormContext } from 'react-hook-form';

import { useAppSelector, useGetLedgerAccountsForTransferQuery } from '@coop/cbs/data-access';

export const useGetLedgersForTransfer = () => {
  const user = useAppSelector((state) => state?.auth?.user);

  const { watch } = useFormContext();

  const coaHead = watch('coaHead');

  const transferMode = watch('transferMode');

  // const amountFilter = watch('amountFilter');

  const tagId = watch('tagId');

  const ledgerType = watch('ledgerType');

  // const amount = watch('amount');

  const { data: ledgerAccountsListData } = useGetLedgerAccountsForTransferQuery(
    {
      input: {
        coaHead: coaHead?.map((head: { value: string }) => head?.value),
        transferMode,
        tagId,
        branchId: user?.currentBranch?.id,
        ledgerType,
      },
    },
    {
      enabled: Boolean(
        coaHead?.length && !!transferMode && transferMode !== 'undefined' && ledgerType
      ),
    }
  );

  return ledgerAccountsListData;
};
