import { useEffect, useMemo, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useRouter } from 'next/router';
import { useTransactionDetailHooks } from 'libs/cbs/transactions/feature-detail-page/src/hooks/useTransactionDetailHooks';

import { Box, DetailPageHeader, SuccessPrint, SuccessPrintJornalVoucher, Text } from '@myra-ui';

import {
  PrintType,
  TransferType,
  useGetJournalVoucherDetailQuery,
  useGetPrintCountQuery,
  WithdrawWith,
} from '@coop/cbs/data-access';
import { localizedDate } from '@coop/cbs/utils';
import { amountConverter, amountToWordsConverter } from '@coop/shared/utils';

export interface PathBarProps {
  title: string;
  closeLink?: string;
}

const transferTypeObj = {
  [TransferType.Self]: 'Self Transfer',
  [TransferType.Member]: 'Member to Member',
};

const getTransactionType = (route: string) => {
  if (route.includes('/deposit/')) return 'Deposit';

  if (route.includes('/withdraw/')) return 'Withdraw';

  if (route.includes('/account-transfer/')) return 'Account Transfer';

  if (route.includes('/repayments/') || route.includes('/loan-payment/')) return 'Loan Repayment';

  if (route.includes('/journal-vouchers/')) return 'Journal Voucher';

  return '';
};

export const TransactionDetailPathBar = ({ title, closeLink }: PathBarProps) => {
  const router = useRouter();

  const id = router?.query?.['id'];

  const {
    memberDetail,
    depositDetailData,
    withdrawDetailData,
    accountTransferDetailData,
    loanRepaymentDetailData,
  } = useTransactionDetailHooks();

  const { data } = useGetJournalVoucherDetailQuery(
    { entryId: id as string },
    { enabled: !!id && router?.asPath?.includes('journal-vouchers') }
  );

  const voucherData = data?.accounting?.journalVoucher?.viewJournalVoucherDetail?.data;

  const printComponentRef = useRef<HTMLInputElement | null>(null);

  const voucherPrintRef = useRef<HTMLInputElement | null>(null);

  const [printType, setPrintType] = useState<PrintType | null>();

  const [printCount, setPrintCount] = useState<number>();

  const { data: printCountData } = useGetPrintCountQuery(
    {
      objectId: id as string,
      type: printType as PrintType,
    },
    {
      enabled: !!printType,
    }
  );

  const handleCustomerPrint = () => {
    setPrintType('CUSTOMER_COPY');
  };

  const handleOfficeVoucherPrint = () => {
    setPrintType('OFFICE_VOUCHER');
  };

  useEffect(() => {
    if (printCountData) {
      setPrintCount(printCountData?.settings?.getPrintCount);
    }
  }, [printCountData]);

  useEffect(() => {
    if (printCount) {
      if (printType === 'CUSTOMER_COPY') {
        handlePrint();
      }
      if (printType === 'OFFICE_VOUCHER') {
        handlePrintVoucher();
      }
    }
  }, [printCount, printType]);

  const {
    accountId,
    accountName,
    total,
    details,
    extraDetails,
    dublicate,
    voucherDetails,
    showSignatures,
    jvDetails,
    glTransactions,
    glTotal,
  } = useMemo(() => {
    let tempAccountName = '';
    let tempAccountId = '';

    let tempDetails = {};
    let tempExtraDetails = {};

    let tempVoucherDetails = {};

    let tempTotal = '';

    let tempShowSignatures = false;
    let tempDublicate = false;

    let tempJVDetails;

    let tempGLTransactions;

    let tempGlTotal;

    if (router?.asPath?.includes('/deposit/')) {
      tempAccountName = depositDetailData?.accountName as string;

      tempAccountId = depositDetailData?.accountId as string;

      tempDetails = {
        'Transaction Id': (
          <Text fontSize="s3" color="primary.500" fontWeight="600">
            {depositDetailData?.transactionCode}
          </Text>
        ),
        Date: localizedDate(depositDetailData?.transactionDate),
        'Deposit Amount': amountConverter(depositDetailData?.amount || 0),
        Fine: amountConverter(depositDetailData?.fine || 0),
        Rebate: amountConverter(depositDetailData?.rebate ?? '0'),
        'Payment Mode': depositDetailData?.paymentMode,
        'Deposited By':
          depositDetailData?.depositedBy === 'AGENT'
            ? `Market Representative (${depositDetailData?.txnUserName})`
            : depositDetailData?.txnUserName
            ? `${depositDetailData?.depositedBy} (${depositDetailData?.txnUserName})`
            : depositDetailData?.depositedBy,
      };
      tempDublicate = true;
      tempTotal = depositDetailData?.totalDepositedAmount as string;

      tempGLTransactions = depositDetailData?.glTransaction;

      tempGlTotal = depositDetailData?.totalDebit;
      tempShowSignatures = true;

      tempVoucherDetails = {
        'Transaction Id': (
          <Text fontSize="s3" color="primary.500" fontWeight="600">
            {depositDetailData?.transactionCode}
          </Text>
        ),
        Date: localizedDate(depositDetailData?.transactionDate),
        'Transaction Branch': depositDetailData?.transactionBranch,
      };
    }

    if (router?.asPath?.includes('/withdraw/')) {
      tempAccountName = depositDetailData?.accountName as string;

      tempAccountId = depositDetailData?.accountId as string;

      tempDetails = {
        'Transaction Id': (
          <Text fontSize="s3" color="primary.500" fontWeight="600">
            {withdrawDetailData?.transactionCode}
          </Text>
        ),
        Date: localizedDate(withdrawDetailData?.transactionDate),
        'Withdraw Amount': amountConverter(withdrawDetailData?.withdrawAmount || 0),
        Fine: amountConverter(withdrawDetailData?.fine || 0),
        'Payment Mode': withdrawDetailData?.paymentMode,
        'Withdraw By': `${withdrawDetailData?.withdrawWith} (${
          withdrawDetailData?.withdrawWith === WithdrawWith.WithdrawSlip
            ? withdrawDetailData?.chequeNo?.padStart(10, '0') ?? 'N/A'
            : withdrawDetailData?.chequeNo
        })`,
        'Withdrawn By':
          withdrawDetailData?.withdrawnBy === 'AGENT'
            ? `Market Representative (${withdrawDetailData?.txnUserName})`
            : withdrawDetailData?.withdrawnBy === 'OTHER'
            ? `${withdrawDetailData?.txnUserName}`
            : withdrawDetailData?.withdrawnBy?.replace(/_/g, ' '),
      };

      tempDublicate = true;
      tempTotal = withdrawDetailData?.totalWithdrawnAmount as string;

      tempGLTransactions = withdrawDetailData?.glTransaction;

      tempGlTotal = withdrawDetailData?.totalDebit;
      tempShowSignatures = true;

      tempVoucherDetails = {
        'Transaction Id': (
          <Text fontSize="s3" color="primary.500" fontWeight="SemiBold">
            {withdrawDetailData?.transactionCode}
          </Text>
        ),
        'Transaction Date': localizedDate(withdrawDetailData?.transactionDate),
        'Withdraw By': `${withdrawDetailData?.withdrawWith} (${
          withdrawDetailData?.withdrawWith === WithdrawWith.WithdrawSlip
            ? withdrawDetailData?.chequeNo?.padStart(10, '0') ?? 'N/A'
            : withdrawDetailData?.chequeNo
        })`,
        'Transfer Amount': withdrawDetailData?.totalWithdrawnAmount,
        'Withdrawn By':
          withdrawDetailData?.withdrawnBy === 'AGENT'
            ? `Market Representative ${withdrawDetailData?.txnUserName}`
            : withdrawDetailData?.withdrawnBy === 'OTHER'
            ? `Others ${withdrawDetailData?.txnUserName}`
            : withdrawDetailData?.withdrawnBy,
        'Transaction Branch': withdrawDetailData?.transactionBranch,
      };
    }

    if (router?.asPath?.includes('/account-transfer/')) {
      tempAccountName = accountTransferDetailData?.sourceAccount?.accountName as string;

      tempAccountId = accountTransferDetailData?.sourceAccount?.id as string;

      tempDetails = {
        'Transaction Id': (
          <Text fontSize="s3" color="primary.500" fontWeight="600">
            {accountTransferDetailData?.transactionCode}
          </Text>
        ),
        Date: localizedDate(accountTransferDetailData?.transactionDate),
        // 'Withdraw By': `${accountTransferDetailData?.withdrawnBy} (${
        //   accountTransferDetailData?.withdrawnSlipNo?.padStart(10, '0') ?? 'N/A'
        // })`,
        'Withdraw By': `${accountTransferDetailData?.withdrawnBy} (${
          accountTransferDetailData?.withdrawnBy === WithdrawWith.WithdrawSlip
            ? accountTransferDetailData?.withdrawnSlipNo?.padStart(10, '0') ?? 'N/A'
            : accountTransferDetailData?.withdrawnSlipNo
        })`,
        'Transfer Type': accountTransferDetailData?.transferType
          ? transferTypeObj[accountTransferDetailData?.transferType]
          : '',
        'Transfer Amount': amountConverter(accountTransferDetailData?.transferAmount || 0),
        'Receiver Member': accountTransferDetailData?.recipientMember?.name?.local ?? 'N/A',
        'Receivers Account name':
          accountTransferDetailData?.destinationAccount?.accountName ?? 'N/A',
      };

      tempVoucherDetails = {
        'Transaction Id': (
          <Text fontSize="s3" color="primary.500" fontWeight="600">
            {accountTransferDetailData?.transactionCode}
          </Text>
        ),
        Date: localizedDate(accountTransferDetailData?.transactionDate),
        'Withdraw By': `${accountTransferDetailData?.withdrawnBy} (${
          accountTransferDetailData?.withdrawnBy === WithdrawWith.WithdrawSlip
            ? accountTransferDetailData?.withdrawnSlipNo?.padStart(10, '0') ?? 'N/A'
            : accountTransferDetailData?.withdrawnSlipNo
        })`,
        'Transfer Type': accountTransferDetailData?.transferType
          ? transferTypeObj[accountTransferDetailData?.transferType]
          : '',
        'Transfer Amount': amountConverter(accountTransferDetailData?.transferAmount || 0),
        'Transaction Branch': accountTransferDetailData?.transactionBranch,
      };
      tempDublicate = true;
      tempTotal = accountTransferDetailData?.transferAmount as string;

      tempGLTransactions = accountTransferDetailData?.glTransaction;

      tempGlTotal = accountTransferDetailData?.totalDebit;
      tempShowSignatures = true;
    }

    if (router?.asPath?.includes('/repayments/') || router?.asPath?.includes('/loan-payment/')) {
      tempAccountName = loanRepaymentDetailData?.loanAccountName as string;

      tempAccountId = loanRepaymentDetailData?.loanAccountId as string;

      const totalInterestAmount = loanRepaymentDetailData?.installmentDetails?.reduce(
        (sum, installment) => sum + Number(installment?.interestAmount ?? 0),
        0
      );

      const totalPrincipalAmount = loanRepaymentDetailData?.installmentDetails?.reduce(
        (sum, installment) => sum + Number(installment?.principalAmount ?? 0),
        0
      );

      tempDetails = {
        'Loan Repayment Id': (
          <Text fontSize="s3" color="primary.500" fontWeight="600">
            {loanRepaymentDetailData?.transactionCode}
          </Text>
        ),
        Date: localizedDate(loanRepaymentDetailData?.repaymentDate),
        'Installment No': loanRepaymentDetailData?.installmentNo,
        'Principal Amount': amountConverter(totalPrincipalAmount || 0),
        'Interest Amount': amountConverter(totalInterestAmount || 0),
        // 'Actual Fine': amountConverter(
        //   Number(loanRepaymentDetailData?.fine || 0) +
        //     Number(loanRepaymentDetailData?.discount || 0)
        // ),
        'Paid Fine': amountConverter(loanRepaymentDetailData?.fine || 0),
        // 'Discount Amount': amountConverter(loanRepaymentDetailData?.discount || 0),
        'Rebate Amount': amountConverter(loanRepaymentDetailData?.rebate || 0),

        'Payment Mode': loanRepaymentDetailData?.paymentMode,
        'Source Account': loanRepaymentDetailData?.destinationAccount || 'N/A',
      };

      tempVoucherDetails = {
        Date: localizedDate(loanRepaymentDetailData?.repaymentDate),
        'Transaction Branch': loanRepaymentDetailData?.transactionBranch,
      };

      tempExtraDetails = {
        'Remaining Principal': amountConverter(
          loanRepaymentDetailData?.totalRemainingPrincipal || 0
        ),
        'Remaining Interest': amountConverter(loanRepaymentDetailData?.totalRemainingInterest || 0),
      };

      tempTotal = Number(loanRepaymentDetailData?.totalRepaymentAmount).toFixed(2);

      tempGLTransactions = loanRepaymentDetailData?.glTransaction;

      tempGlTotal = loanRepaymentDetailData?.totalDebit;

      tempDublicate = true;
      tempShowSignatures = true;
    }

    if (router?.asPath?.includes('/journal-vouchers/')) {
      tempTotal = voucherData?.amount as string;

      tempShowSignatures = true;

      tempJVDetails = {
        glTransactions: voucherData?.glTransaction,
        date: voucherData?.date?.local,
        note: voucherData?.note,
        refrence: voucherData?.reference,
        totalDebit: voucherData?.amount,
        transactionId: voucherData?.transactionCode,
        transactionBranch: voucherData?.branchName,
        txnUserName: voucherData?.txnUserName,
      };
    }

    return {
      accountId: tempAccountId,
      accountName: tempAccountName,
      total: tempTotal,
      details: tempDetails,
      extraDetails: tempExtraDetails,
      voucherDetails: tempVoucherDetails,
      showSignatures: tempShowSignatures,
      jvDetails: tempJVDetails,
      glTransactions: tempGLTransactions,
      dublicate: tempDublicate,
      glTotal: tempGlTotal,
    };
  }, [
    depositDetailData,
    withdrawDetailData,
    accountTransferDetailData,
    loanRepaymentDetailData,
    voucherData,
    router?.asPath,
  ]);

  const handlePrint = useReactToPrint({
    content: () => printComponentRef.current,
    onAfterPrint: () => setPrintType(null),
    documentTitle: `${getTransactionType(router?.asPath)}-${memberDetail?.code ?? ''}-${id}.pdf`,
  });

  const handlePrintVoucher = useReactToPrint({
    content: () => voucherPrintRef.current,
    onAfterPrint: () => setPrintType(null),
    documentTitle: `${getTransactionType(router?.asPath)}-${memberDetail?.code ?? ''}-${id}.pdf`,
  });

  const pageHeaderOptions =
    router?.asPath?.includes('/deposit') ||
    router?.asPath?.includes('/withdraw/') ||
    router?.asPath?.includes('/account-transfer/') ||
    router?.asPath?.includes('/repayments/') ||
    router?.asPath?.includes('/loan-payment/') ||
    router?.asPath?.includes('/journal-vouchers/')
      ? [
          { label: 'Print', handler: handleCustomerPrint },
          {
            label: 'Print Voucher',
            handler: handleOfficeVoucherPrint,
          },
        ]
      : [];

  return (
    <>
      <Box position="sticky" top="0" zIndex={10}>
        <DetailPageHeader
          title={title}
          member={{
            name: memberDetail?.name ?? '',
          }}
          options={pageHeaderOptions}
          closeLink={closeLink}
        />
      </Box>

      {!router?.asPath?.includes('/journal-vouchers/') ? (
        <Box>
          <SuccessPrint
            meta={{
              memberId: memberDetail?.code,
              accountId,
              accountName,
              member: memberDetail?.name,
              txnUserName:
                depositDetailData?.txnUserName ||
                withdrawDetailData?.txnUserName ||
                accountTransferDetailData?.txnUserName ||
                loanRepaymentDetailData?.txnUserName,
            }}
            total={amountConverter(total)}
            totalWords={amountToWordsConverter(Number(total || '0'))}
            details={details}
            extraDetails={extraDetails}
            dublicate={dublicate}
            showSignatures={showSignatures}
            count={printCount}
            ref={printComponentRef}
          />
        </Box>
      ) : (
        <SuccessPrintJornalVoucher
          jVPrint={jvDetails}
          showSignatures={showSignatures}
          count={printCount}
          totalWords={amountToWordsConverter(Number(total || '0'))}
          ref={printComponentRef}
        />
      )}

      {!router?.asPath?.includes('/journal-vouchers/') ? (
        <SuccessPrint
          meta={{
            memberId: memberDetail?.code,
            accountId,
            accountName,
            member: memberDetail?.name,
            txnUserName:
              depositDetailData?.txnUserName ||
              withdrawDetailData?.txnUserName ||
              accountTransferDetailData?.txnUserName ||
              loanRepaymentDetailData?.txnUserName,
          }}
          total={amountConverter(total)}
          totalWords={amountToWordsConverter(total)}
          details={voucherDetails}
          showSignatures={showSignatures}
          glTransactions={glTransactions}
          glTransactionsTotal={glTotal as string}
          count={printCount}
          ref={voucherPrintRef}
        />
      ) : (
        <SuccessPrintJornalVoucher
          jVPrint={jvDetails}
          showSignatures={showSignatures}
          count={printCount}
          totalWords={amountToWordsConverter(Number(total || '0'))}
          ref={voucherPrintRef}
        />
      )}
    </>
  );
};
