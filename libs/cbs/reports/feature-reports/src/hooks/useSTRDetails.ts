import { useRouter } from 'next/router';

import { useGetStrTransactionDetailQuery } from '@coop/cbs/data-access';

export const useSTRDetails = () => {
  const router = useRouter();

  const { id } = router.query;

  const { data: strDetailsQueryData } = useGetStrTransactionDetailQuery(
    {
      transactionId: id as string,
    },
    {
      enabled: !!id,
    }
  );

  return {
    memberDetails: strDetailsQueryData?.transaction?.strTransactionDetail?.data?.bio,
    strStatus: strDetailsQueryData?.transaction?.strTransactionDetail?.data?.strStatus,
    strAccountDetails:
      strDetailsQueryData?.transaction?.strTransactionDetail?.data?.strAccountDetails,
    savingAccounts: strDetailsQueryData?.transaction?.strTransactionDetail?.data?.savingAccounts,
    transactionDetails:
      strDetailsQueryData?.transaction?.strTransactionDetail?.data?.transactionDetails,
    depositList: strDetailsQueryData?.transaction?.strTransactionDetail?.data?.deposits,
    withdrawList: strDetailsQueryData?.transaction?.strTransactionDetail?.data?.withdraw,
    loanAccounts: strDetailsQueryData?.transaction?.strTransactionDetail?.data?.loanAccount,
    strReason: strDetailsQueryData?.transaction?.strTransactionDetail?.data?.strReason,
    strTopology: strDetailsQueryData?.transaction?.strTransactionDetail?.data?.strTopology,
  };
};
