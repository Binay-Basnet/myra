import { useMemo } from 'react';
import { useRouter } from 'next/router';

import {
  EbankingTransaction,
  useGetLoanAccountCollateralDetailsQuery,
  useGetLoanAccountDetailsQuery,
  useGetLoanAccountGuaranteeDetailsQuery,
  useGetLoanAccountLedgersListQuery,
  useGetLoanAccountMemberDetailsQuery,
} from '@coop/cbs/data-access';
import { localizedDate } from '@coop/cbs/utils';
import { amountConverter, getRouterQuery } from '@coop/shared/utils';

export const useLoanAccountDetailHooks = () => {
  const router = useRouter();

  const { id } = router.query;

  const { data: loanAccountDetailsQueryData } = useGetLoanAccountDetailsQuery({
    loanAccountId: id as string,
    paginate: getRouterQuery({ type: ['PAGINATION'] }),
  });

  const { data: loanAccountGuaranteeDetailsData } = useGetLoanAccountGuaranteeDetailsQuery({
    loanAccountId: id as string,
  });

  const { data: loanAccountCollateralDetailsData } = useGetLoanAccountCollateralDetailsQuery({
    loanAccountId: id as string,
  });

  const { data: loanAccountMemberDetailsData } = useGetLoanAccountMemberDetailsQuery({
    loanAccountId: id as string,
  });

  const { data: loanAccountLedgersData } = useGetLoanAccountLedgersListQuery({ id: id as string });

  const gauranteeData = loanAccountGuaranteeDetailsData?.loanAccount?.loanAccountDetails?.guarantee;
  const collatData = loanAccountCollateralDetailsData?.loanAccount?.loanAccountDetails?.collateral;
  const overviewData = loanAccountDetailsQueryData?.loanAccount?.loanAccountDetails?.overView;
  const generalInfo = overviewData?.generalInformation;
  const additionalInfo = overviewData?.additionalFeatures;
  const txnListInfo = overviewData?.transactions?.edges;
  const paymentsListInfo = overviewData?.loanSchedule;
  const gauranteeListInfo = gauranteeData?.guaranteeList;
  const collatListInfo = collatData?.collateralList;
  const ledgerList = loanAccountLedgersData?.account?.listAccountLedgers?.data;
  const isClosed = overviewData?.isClosed;

  const length = paymentsListInfo?.installments?.length ?? 0;

  const generalInfoCardData = [
    { label: 'Account Name', value: generalInfo?.accountName ?? 'N/A' },
    { label: 'Product Name', value: generalInfo?.productName ?? 'N/A' },
    { label: 'Account Open Date', value: generalInfo?.accountOpenDate?.local ?? 'N/A' },
    { label: 'Loan Account Open Branch', value: generalInfo?.loanAccountOpenBranchName ?? 'N/A' },
    { label: 'Payment Scheme', value: generalInfo?.repaymentScheme ?? 'N/A' },
    { label: 'Interest Rate', value: `${generalInfo?.interestRate}%` ?? 'N/A' },
    { label: 'Interest Accrued', value: generalInfo?.interestAccrued ?? 'N/A' },
    { label: 'Sanctioned Amount', value: generalInfo?.sanctionedAmount ?? 'N/A' },
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
    { label: 'Linked Account', value: generalInfo?.linkedAccountName ?? 'N/A' },
    { label: 'Installment Frequency', value: generalInfo?.installmentFrequency ?? 'N/A' },
    { label: 'Disbursed Amount', value: generalInfo?.disbursedAmount ?? 'N/A' },
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
      value: amountConverter(gauranteeData?.noOfGuarantee ?? 0),
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
        paid: installment?.paid,
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
        paid: installment?.paid,
      })) ?? [],
    [paymentsListInfo]
  );

  const collateralSummary = [
    {
      title: 'No of Collateral',
      value: amountConverter(collatData?.noOfCollateral ?? 0),
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
    productId,
    isClosed,
    collatListInfo,
    memberDetails,
    ledgerList,
    paymentAllList,
  };
};
