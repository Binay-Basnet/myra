import { useRouter } from 'next/router';

import {
  DateType,
  NatureOfDepositProduct,
  useAppSelector,
  useGetAccountDetailsDataQuery,
} from '@coop/cbs/data-access';

const accountTypes = {
  [NatureOfDepositProduct.Saving]: 'Saving Account',
  [NatureOfDepositProduct.RecurringSaving]: 'Recurring Saving Account',
  [NatureOfDepositProduct.TermSavingOrFd]: 'Term Saving Account',
  [NatureOfDepositProduct.Current]: 'Current Account',
};

export const useAccountDetails = () => {
  const preferenceDate = useAppSelector((state) => state?.auth?.preference?.date);

  const router = useRouter();

  const { id } = router.query;

  const { data: accountDetailsQueryData } = useGetAccountDetailsDataQuery(
    { id: String(id) },
    { enabled: !!id }
  );

  const accountData = accountDetailsQueryData?.account?.accountDetails?.data;

  return {
    accountDetails: {
      ...accountData,
      accountOpenDate:
        preferenceDate === DateType.Bs
          ? accountData?.accountOpenDate?.np
          : accountData?.accountOpenDate?.en,
      accountType: accountData?.accountType ? accountTypes[accountData?.accountType] : '',
    },
  };
};
