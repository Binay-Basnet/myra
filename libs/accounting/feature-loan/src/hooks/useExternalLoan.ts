import {
  DateType,
  useAppSelector,
  useExternalLoanAccountListQuery,
  useExternalLoanListQuery,
  useExternalLoanPaymentListQuery,
} from '@coop/cbs/data-access';
import { getPaginationQuery } from '@coop/shared/utils';

export const useExternalLoan = () => {
  const preferenceDate = useAppSelector((state) => state?.auth?.preference?.date);

  const {
    data: externalLoanData,
    isLoading: isExternalLoanLoading,
    refetch: refetchExternalLoan,
  } = useExternalLoanListQuery({
    pagination: getPaginationQuery(),
  });

  const {
    data: loanPaymentData,
    isLoading: isLoanPaymentLoading,
    refetch: refetchLoanPayment,
  } = useExternalLoanPaymentListQuery({
    pagination: getPaginationQuery(),
  });

  const {
    data: loanAccountData,
    isLoading: isLoanAccountLoading,
    refetch: refetchLoanAccount,
  } = useExternalLoanAccountListQuery({
    pagination: getPaginationQuery(),
  });

  const externalLoanList = externalLoanData?.accounting?.externalLoan?.loan?.list?.edges?.map(
    (externalLoan) => ({
      ...externalLoan?.node,
      date:
        preferenceDate === DateType.Bs
          ? externalLoan?.node?.appliedDate?.np
          : externalLoan?.node?.appliedDate?.en,
    })
  );

  const loanPaymentList = loanPaymentData?.accounting?.externalLoan?.payment?.list?.edges?.map(
    (loanPayment) => ({
      ...loanPayment?.node,
      date:
        preferenceDate === DateType.Bs
          ? loanPayment?.node?.createdDate?.np
          : loanPayment?.node?.createdDate?.en,
    })
  );

  const loanAccountList = loanAccountData?.accounting?.externalLoan?.account?.list?.edges?.map(
    (loanAccount) => ({
      ...loanAccount?.node,
      date:
        preferenceDate === DateType.Bs
          ? loanAccount?.node?.createdDate?.np
          : loanAccount?.node?.createdDate?.en,
    })
  );

  return {
    externalLoanList,
    isExternalLoanLoading,
    refetchExternalLoan,
    loanPaymentList,
    isLoanPaymentLoading,
    refetchLoanPayment,
    loanAccountList,
    isLoanAccountLoading,
    refetchLoanAccount,
  };
};
