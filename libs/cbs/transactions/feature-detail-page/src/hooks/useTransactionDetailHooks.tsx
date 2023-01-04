import { useRouter } from 'next/router';

import {
  AllTransactionType,
  useAgentTransactionDetailQuery,
  useGetAgentDetailQuery,
  useGetAllTransactionsDetailQuery,
  useLoanRepaymentDetailQuery,
  useTransactionAccountTransferDetailQuery,
  useTransactionDepositDetailQuery,
  useTransactionWithdrawDetailQuery,
} from '@coop/cbs/data-access';

export const useTransactionDetailHooks = () => {
  const router = useRouter();

  const { id, date, txnType } = router.query;

  // deposit
  const { data: deposit } = useTransactionDepositDetailQuery(
    { transactionId: id as string },
    { staleTime: 0, enabled: !!id && router?.asPath?.includes('/deposit/') }
  );

  const depositDetailData = deposit?.transaction?.viewDeposit?.data;
  // withdraw
  const { data: withdraw } = useTransactionWithdrawDetailQuery(
    { transactionId: id as string },
    { staleTime: 0, enabled: !!id && router?.asPath?.includes('/withdraw/') }
  );

  const withdrawDetailData = withdraw?.transaction?.viewWithdraw?.data;

  // account transfer
  const { data: accountTransfer } = useTransactionAccountTransferDetailQuery(
    { transactionId: id as string },
    { staleTime: 0, enabled: !!id && router?.asPath?.includes('/account-transfer/') }
  );

  const accountTransferDetailData = accountTransfer?.transaction?.viewAccountTransfer?.data;

  // agent transaction
  const { data: agentTransaction } = useAgentTransactionDetailQuery(
    { agentId: id as string, date: date as string },
    {
      staleTime: 0,
      enabled: !!date && router?.asPath?.includes('/market-representative-transaction/'),
    }
  );

  const agentTransactionDetailData = agentTransaction?.transaction?.viewAgentList?.data;

  // agent detail
  const { data: agentDetail } = useGetAgentDetailQuery(
    { id: id as string },
    {
      staleTime: 0,
      enabled:
        !!id &&
        (router?.asPath?.includes('/agent/') || router?.asPath?.includes('/agent-transaction/')),
    }
  );

  const agentDetailData = agentDetail?.transaction?.agentDetail?.data;

  // loan repayment detail
  const { data: loanRepaymentDetail } = useLoanRepaymentDetailQuery(
    { paymentId: id as string },
    { staleTime: 0, enabled: !!id && router?.asPath?.includes('/repayments/') }
  );

  const { data: allTransactionsDetails } = useGetAllTransactionsDetailQuery(
    { id: id as string, txnType: txnType as AllTransactionType },
    { staleTime: 0, enabled: !!id && router?.asPath?.includes('/all-transactions/') }
  );
  const allTransactionsData = allTransactionsDetails?.transaction?.viewTransactionDetail?.data;

  const loanRepaymentDetailData = loanRepaymentDetail?.transaction?.viewLoanRepayment?.data;

  return {
    depositDetailData,
    withdrawDetailData,
    accountTransferDetailData,
    agentTransactionDetailData,
    agentDetailData,
    loanRepaymentDetailData,
    allTransactionsData,
    memberDetail: {
      name:
        depositDetailData?.member?.name?.local ??
        withdrawDetailData?.member?.name?.local ??
        accountTransferDetailData?.member?.name?.local ??
        agentDetailData?.name ??
        loanRepaymentDetailData?.member?.name?.local,
      profilePicUrl:
        depositDetailData?.member?.profilePicUrl ??
        withdrawDetailData?.member?.profilePicUrl ??
        accountTransferDetailData?.member?.profilePicUrl ??
        agentDetailData?.profilePicUrl ??
        loanRepaymentDetailData?.member?.profilePicUrl,
    },
  };
};
