import { useFormContext } from 'react-hook-form';

import {
  LedgerBalanceTransferRequestInput,
  useAppSelector,
  useGetLedgerAccountsForTransferQuery,
} from '@coop/cbs/data-access';

export const useGetLedgersForTransfer = () => {
  const user = useAppSelector((state) => state?.auth?.user);

  const { watch } = useFormContext<LedgerBalanceTransferRequestInput>();

  const coaHead = watch('coaHead');

  const transferMode = watch('transferMode');

  const closingDate = watch('closingDate');

  const tagId = watch('tagId');

  const ledgerType = watch('ledgerType');

  // const amount = watch('amount');

  const { data: ledgerAccountsListData } = useGetLedgerAccountsForTransferQuery(
    {
      input: {
        coaHead: coaHead?.map((head) => (head as unknown as { value: string })?.value),
        transferMode,
        tagId,
        branchId: user?.currentBranch?.id,
        ledgerType,
        closingDate,
      },
    },
    {
      enabled: Boolean(coaHead?.length && !!transferMode && ledgerType && closingDate?.en),
    }
  );

  return ledgerAccountsListData;
};
