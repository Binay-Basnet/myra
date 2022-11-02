import { useRouter } from 'next/router';

import {
  useTransactionAccountTransferDetailQuery,
  useTransactionDepositDetailQuery,
  useTransactionWithdrawDetailQuery,
} from '@coop/cbs/data-access';

export const useTransactionDetailHooks = () => {
  const router = useRouter();

  const { id } = router.query;

  // deposit
  const { data: deposit } = useTransactionDepositDetailQuery(
    { transactionId: id as string },
    { staleTime: 0, enabled: !!id }
  );

  const depositDetailData = deposit?.transaction?.viewDeposit?.data;
  // withdraw
  const { data: withdraw } = useTransactionWithdrawDetailQuery(
    { transactionId: id as string },
    { staleTime: 0, enabled: !!id }
  );

  const withdrawDetailData = withdraw?.transaction?.viewWithdraw?.data;

  // account transfer
  const { data: accountTransfer } = useTransactionAccountTransferDetailQuery(
    { transactionId: id as string },
    { staleTime: 0, enabled: !!id }
  );

  const accountTransferDetailData = accountTransfer?.transaction?.viewAccountTransfer?.data;

  return {
    depositDetailData,
    withdrawDetailData,
    accountTransferDetailData,
  };
};
