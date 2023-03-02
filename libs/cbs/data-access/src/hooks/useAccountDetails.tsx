import { useMemo } from 'react';
import { useRouter } from 'next/router';

import {
  DateType,
  EbankingTransaction,
  useAppSelector,
  useGetAccountDetailsDataQuery,
  useGetAccountTransactionListsQuery,
} from '@coop/cbs/data-access';
import { getPaginationQuery } from '@coop/shared/utils';

export const useAccountDetails = () => {
  const preferenceDate = useAppSelector((state) => state?.auth?.preference?.date);

  const router = useRouter();

  const { id } = router.query;

  const { data: accountDetailsQueryData } = useGetAccountDetailsDataQuery(
    { id: String(id) },
    { enabled: !!id }
  );

  const accountData = accountDetailsQueryData?.account?.accountDetails?.data;

  const { data: transactionListQueryData, isFetching } = useGetAccountTransactionListsQuery(
    {
      filter: { accountIds: [id as string] },
      pagination: getPaginationQuery(),
    },
    {
      enabled: !!id,
    }
  );

  const transactionList = useMemo(
    () =>
      transactionListQueryData?.account?.listTransactions?.edges?.map(
        (item) => item?.node as EbankingTransaction
      ) ?? [],
    [transactionListQueryData]
  );

  return {
    accountDetails: {
      ...accountData,
      accountOpenDate:
        preferenceDate === DateType.Bs
          ? accountData?.accountOpenDate?.np
          : accountData?.accountOpenDate?.en,
    },
    transactionLoading: isFetching,
    transactionList,
  };
};
