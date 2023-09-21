import { useRouter } from 'next/router';

import {
  useAgentTransactionDetailQuery,
  useGetAgentDetailQuery,
  useGetAllTransactionsDetailQuery,
  useLoanRepaymentDetailQuery,
  useTransactionAccountTransferDetailQuery,
  useTransactionDepositDetailQuery,
  useTransactionWithdrawDetailQuery,
} from '@coop/cbs/data-access';
import { localizedText } from '@coop/cbs/utils';

export const useTransactionDetailHooks = () => {
  const router = useRouter();

  const { id, date } = router.query;

  // deposit
  const { data: deposit } = useTransactionDepositDetailQuery(
    { transactionId: id as string },
    {
      staleTime: 0,
      enabled:
        !!id &&
        (router?.asPath?.includes('/deposit/') || router?.asPath?.includes('/all-transactions/')),
    }
  );

  const depositDetailData = deposit?.transaction?.viewDeposit?.data;
  // withdraw
  const { data: withdraw } = useTransactionWithdrawDetailQuery(
    { transactionId: id as string },
    {
      staleTime: 0,
      enabled:
        !!id &&
        (router?.asPath?.includes('/withdraw/') || router?.asPath?.includes('/all-transactions/')),
    }
  );

  const withdrawDetailData = withdraw?.transaction?.viewWithdraw?.data;

  // account transfer
  const { data: accountTransfer } = useTransactionAccountTransferDetailQuery(
    { transactionId: id as string },
    {
      staleTime: 0,
      enabled:
        !!id &&
        (router?.asPath?.includes('/account-transfer/') ||
          router?.asPath?.includes('/all-transactions/')),
    }
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

  const agentTransactionDetailData = agentTransaction?.agent?.viewAgentList?.data;

  // agent detail
  const { data: agentDetail } = useGetAgentDetailQuery(
    { id: id as string },
    {
      staleTime: 0,
      enabled:
        !!id &&
        (router?.asPath?.includes('/market-representative/') ||
          router?.asPath?.includes('/market-representative-transaction/')),
    }
  );

  const agentDetailData = agentDetail?.agent?.agentDetail?.data;

  // loan repayment detail
  const { data: loanRepaymentDetail } = useLoanRepaymentDetailQuery(
    { paymentId: id as string },
    {
      staleTime: 0,
      enabled:
        !!id &&
        (router?.asPath?.includes('/loan-payment/') ||
          router?.asPath?.includes('/repayments/') ||
          router?.asPath?.includes('/all-transactions/')),
    }
  );

  const { data: allTransactionsDetails } = useGetAllTransactionsDetailQuery(
    { id: id as string },
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
      ...depositDetailData?.member,
      ...withdrawDetailData?.member,
      ...accountTransferDetailData?.member,
      ...agentDetailData,
      ...loanRepaymentDetailData?.member,
      name:
        localizedText(depositDetailData?.member?.name) ??
        localizedText(withdrawDetailData?.member?.name) ??
        localizedText(accountTransferDetailData?.member?.name) ??
        agentDetailData?.name ??
        localizedText(loanRepaymentDetailData?.member?.name),
    },
  };
};
