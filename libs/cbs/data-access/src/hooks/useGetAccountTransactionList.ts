import {
  DateType,
  useAppSelector,
  useGetAccountTransactionListsQuery,
} from '@coop/cbs/data-access';
import { getRouterQuery } from '@coop/shared/utils';

interface IUseGetAccountTransactionListProps {
  accountId: string | null | undefined;
}

export const useGetAccountTransactionList = ({ accountId }: IUseGetAccountTransactionListProps) => {
  const preferenceDate = useAppSelector((state) => state?.auth?.preference?.date);

  const { data: transactionListQueryData } = useGetAccountTransactionListsQuery(
    {
      filter: { accountIds: [accountId as string] },
      pagination: getRouterQuery({ type: ['PAGINATION'] }),
    },
    {
      enabled: !!accountId,
    }
  );

  return {
    transactionList: transactionListQueryData?.account?.listTransactions?.edges?.map(
      (transaction) => ({
        ...transaction?.node,
        date:
          preferenceDate === DateType.Bs
            ? transaction?.node?.date?.np
            : transaction?.node?.date?.en,
        month:
          preferenceDate === DateType.Bs
            ? transaction?.node?.month?.np
            : transaction?.node?.month?.en,
      })
    ),
  };
};
