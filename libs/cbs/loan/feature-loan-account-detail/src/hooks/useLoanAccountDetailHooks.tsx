import { useMemo } from 'react';
import { useRouter } from 'next/router';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';

import {
  EbankingTransaction,
  useGetEndOfDayDateDataQuery,
  useGetLoanAccountCollateralDetailsQuery,
  useGetLoanAccountDetailsQuery,
  useGetLoanAccountGuaranteeDetailsQuery,
  useGetLoanAccountLedgersListQuery,
  useGetLoanAccountMemberDetailsQuery,
} from '@coop/cbs/data-access';
import { localizedDate } from '@coop/cbs/utils';
import { amountConverter, getPaginationQuery } from '@coop/shared/utils';

export const useLoanAccountDetailHooks = () => {
  const router = useRouter();

  const { id } = router.query;

  const { data: loanAccountDetailsQueryData } = useGetLoanAccountDetailsQuery({
    loanAccountId: id as string,
    paginate: getPaginationQuery(),
  });

  const { data: loanAccountGuaranteeDetailsData } = useGetLoanAccountGuaranteeDetailsQuery({
    loanAccountId: id as string,
  });

  const { data: loanAccountCollateralDetailsData, refetch } =
    useGetLoanAccountCollateralDetailsQuery({
      loanAccountId: id as string,
    });

  const { data: loanAccountMemberDetailsData } = useGetLoanAccountMemberDetailsQuery({
    loanAccountId: id as string,
  });

  const { data: loanAccountLedgersData, isLoading: ledgerLoading } =
    useGetLoanAccountLedgersListQuery({ id: id as string });

  const gauranteeData = loanAccountGuaranteeDetailsData?.loanAccount?.loanAccountDetails?.guarantee;
  const collatData = loanAccountCollateralDetailsData?.loanAccount?.loanAccountDetails?.collateral;
  const overviewData = loanAccountDetailsQueryData?.loanAccount?.loanAccountDetails?.overView;
  const documentData = loanAccountDetailsQueryData?.loanAccount?.loanAccountDetails?.documents;
  const generalInfo = overviewData?.generalInformation;
  const additionalInfo = overviewData?.additionalFeatures;
  const txnListInfo = overviewData?.transactions?.edges;
  const paymentsListInfo = overviewData?.loanSchedule;
  const gauranteeListInfo = gauranteeData?.guaranteeList;
  const collatListInfo = collatData?.collateralList;
  const ledgerList = loanAccountLedgersData?.account?.listAccountLedgers?.data;
  const isClosed = overviewData?.isClosed;

  const length = paymentsListInfo?.installments?.length ?? 0;
  const isLocAccount = generalInfo?.repaymentScheme === 'LOC';

  const { data: endOfDayData } = useGetEndOfDayDateDataQuery();

  const closingDate = endOfDayData?.transaction?.endOfDayDate?.value;

  const generalInfoCardData = [
    { label: 'Account Name', value: generalInfo?.accountName ?? 'N/A' },
    { label: 'Product Name', value: generalInfo?.productName ?? 'N/A' },
    { label: 'Account Open Date', value: generalInfo?.accountOpenDate?.local ?? 'N/A' },
    { label: 'Loan Account Open Branch', value: generalInfo?.loanAccountOpenBranchName ?? 'N/A' },
    {
      label: 'Sanctioned Amount',
      value: amountConverter(generalInfo?.sanctionedAmount as string) ?? 'N/A',
    },
    { label: 'Payment Scheme', value: generalInfo?.repaymentScheme ?? 'N/A' },
    { label: 'Interest Rate', value: `${generalInfo?.interestRate.toFixed(2)}%` ?? 'N/A' },
    { label: 'Interest Accrued', value: generalInfo?.interestAccrued ?? 'N/A' },
    {
      label: 'Last Payment Date',
      value: generalInfo?.lastPaymentDate?.en
        ? `${localizedDate(generalInfo?.lastPaymentDate)} [${differenceInCalendarDays(
            new Date(closingDate?.en as string),
            new Date(generalInfo?.lastPaymentDate.en)
          )} days ago]`
        : 'N/A',
    },
    { label: 'Interest Grace Period', value: generalInfo?.interestGracePeriod ?? 'N/A' },
    { label: 'Principal Grace Period', value: generalInfo?.principalGracePeriod ?? 'N/A' },
    { label: 'Tenure', value: `${generalInfo?.tenure} ${generalInfo?.tenureUnit}` ?? 'N/A' },
    {
      label: 'Last Installment Date',
      value:
        (paymentsListInfo?.installments &&
          localizedDate(paymentsListInfo?.installments[length - 1]?.installmentDate)) ??
        'N/A',
    },
    { label: 'Linked Account Id', value: generalInfo?.linkedAccountId ?? 'N/A' },
    { label: 'Installment Frequency', value: generalInfo?.installmentFrequency ?? 'N/A' },
    {
      label: 'Disbursed Amount',
      value: amountConverter(generalInfo?.sanctionedAmount as string) ?? 'N/A',
    },
    {
      label: 'MF Group',
      value: generalInfo?.groupName ?? 'N/A',
    },
    {
      label: 'MF Center',
      value: generalInfo?.centerName ?? 'N/A',
    },
  ];
  const productId = generalInfo?.productId;

  const accountSummary = [
    {
      title: 'Total Principal Paid',
      value: amountConverter(overviewData?.totalPrincipalPaid || 0),
    },
    {
      title: 'Total Interest Paid',
      value: amountConverter(overviewData?.totalInterestPaid || 0),
    },
    {
      title: 'Remaining Principal Amount',
      value: amountConverter(overviewData?.totalRemainingPrincipal || 0),
    },
  ];

  const locAccountSummary = [
    {
      title: 'Total Principal Paid',
      value: amountConverter(overviewData?.totalPrincipalPaid || 0),
    },
    {
      title: 'Total Interest Paid',
      value: amountConverter(overviewData?.totalInterestPaid || 0),
    },
    {
      title: 'Remaining Principal Amount',
      value: amountConverter(overviewData?.totalRemainingPrincipal || 0),
    },
    {
      title: 'Withdrawable Amount',
      value: amountConverter(
        Number(generalInfo?.sanctionedAmount) - Number(overviewData?.totalRemainingPrincipal)
      ),
    },
  ];
  const additionalFeatures = [
    {
      label: 'Allow Partial Installment',
      value: additionalInfo?.allowPartialInstallment ? 'Yes' : 'No',
    },
    {
      label: 'Is Monthly Interest Compulsory',
      value: additionalInfo?.isMonthlyInterestCompulsory ? 'Yes' : 'No',
    },
    { label: 'Insurance', value: additionalInfo?.insurance ? 'Yes' : 'No' },
    { label: 'Collateral', value: additionalInfo?.collateral ? 'Yes' : 'No' },
    { label: 'Staff Profuct', value: additionalInfo?.staffProduct ? 'Yes' : 'No' },
    {
      label: 'Support Multiple Account',
      value: additionalInfo?.supportMultipleAccount ? 'Yes' : 'No',
    },
    {
      label: 'Loan Schedule Change Override',
      value: additionalInfo?.loanScheduleChangeOverride ? 'Yes' : 'No',
    },
    { label: 'Override Interest', value: additionalInfo?.overrideInterest ? 'Yes' : 'No' },
  ];

  const guaranteeSummary = [
    {
      title: 'No of Guarantee',
      value: Number(gauranteeData?.noOfGuarantee) ?? 0,
    },
    {
      title: 'Total Guarantee Value',
      value: amountConverter(gauranteeData?.totalGuaranteeValuation ?? 0),
    },
    {
      title: 'Total Guarantee Release',
      value: amountConverter(gauranteeData?.totalGuaranteeRelease ?? 0),
    },
  ];

  const transactionList = useMemo(
    () => txnListInfo?.slice(0, 10)?.map((item) => item?.node as EbankingTransaction) ?? [],
    [txnListInfo]
  );

  const paymentList = useMemo(
    () =>
      paymentsListInfo?.installments?.slice(0, 10)?.map((installment) => ({
        installmentNo: installment?.installmentNo,
        installmentDate: installment?.installmentDate,
        payment: installment?.payment,
        principal: installment?.principal ?? '0',
        interest: installment?.interest ?? '0',
        remainingPrincipal: installment?.remainingPrincipal,
        paid: installment?.status === 'PAID',
        paidDate: installment?.paidDate,
        remainingIntrest: installment?.remainingInterest,
        currentRemainingPrincipal: installment?.currentRemainingPrincipal,
      })) ?? [],
    [paymentsListInfo]
  );

  const paymentAllList = useMemo(
    () =>
      paymentsListInfo?.installments?.map((installment) => ({
        installmentNo: installment?.installmentNo,
        installmentDate: installment?.installmentDate,
        payment: installment?.payment,
        principal: installment?.principal ?? '0',
        interest: installment?.interest ?? '0',
        remainingPrincipal: installment?.remainingPrincipal,
        paid: installment?.status === 'PAID',
        paidDate: installment?.paidDate,
        remainingIntrest: installment?.remainingInterest,
        currentRemainingPrincipal: installment?.currentRemainingPrincipal,
      })) ?? [],
    [paymentsListInfo]
  );

  const collateralSummary = [
    {
      title: 'No of Collateral',
      value: String(collatData?.noOfCollateral) ?? '0',
    },
    {
      title: 'Total Collateral Value',
      value: amountConverter(collatData?.totalCollateralValuation ?? 0),
    },
    {
      title: 'Total Collateral Release',
      value: amountConverter(collatData?.totalCollateralRelease ?? 0),
    },
  ];

  const memberDetails = loanAccountMemberDetailsData?.loanAccount?.loanAccountDetails?.memberInfo;

  return {
    overviewData,
    generalInfo,
    generalInfoCardData,
    transactionList,
    gauranteeData,
    accountSummary,
    additionalFeatures,
    paymentList,
    guaranteeSummary,
    gauranteeListInfo,
    collateralSummary,
    locAccountSummary,
    isLocAccount,
    productId,
    isClosed,
    collatListInfo,
    memberDetails,
    ledgerList,
    paymentAllList,
    refetch,
    ledgerLoading,
    documentData,
  };
};
