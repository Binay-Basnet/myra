import { useRouter } from 'next/router';

import {
  useAgentTransactionDetailQuery,
  useGetAgentDetailQuery,
  useLoanRepaymentDetailQuery,
  useTransactionAccountTransferDetailQuery,
  useTransactionDepositDetailQuery,
  useTransactionWithdrawDetailQuery,
} from '@coop/cbs/data-access';

export const useTransactionDetailHooks = () => {
  const router = useRouter();

  const { id, date } = router.query;

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

  // agent transaction
  const { data: agentTransaction } = useAgentTransactionDetailQuery(
    { agentId: id as string, date: date as string },
    { staleTime: 0, enabled: !!date }
  );

  const agentTransactionDetailData = agentTransaction?.transaction?.viewAgentList?.data;

  // agent detail
  const { data: agentDetail } = useGetAgentDetailQuery(
    { id: id as string },
    { staleTime: 0, enabled: !!id }
  );

  const agentDetailData = agentDetail?.transaction?.agentDetail?.data;

  // loan repayment detail
  const { data: loanRepaymentDetail } = useLoanRepaymentDetailQuery(
    { paymentId: id as string },
    { staleTime: 0, enabled: !!id }
  );

  const loanRepaymentDetailData = loanRepaymentDetail?.transaction?.viewLoanRepayment?.data;

  return {
    depositDetailData,
    withdrawDetailData,
    accountTransferDetailData,
    agentTransactionDetailData,
    agentDetailData,
    loanRepaymentDetailData,
  };
};
