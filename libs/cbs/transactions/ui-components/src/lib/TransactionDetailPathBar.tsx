import { useMemo, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useRouter } from 'next/router';
import { useTransactionDetailHooks } from 'libs/cbs/transactions/feature-detail-page/src/hooks/useTransactionDetailHooks';

import { Box, DetailPageHeader, SuccessPrint, SuccessPrintJornalVoucher, Text } from '@myra-ui';

import { TransferType, useGetJournalVoucherDetailQuery, WithdrawWith } from '@coop/cbs/data-access';
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

  const handlePrint = useReactToPrint({
    content: () => printComponentRef.current,
  });

  const handlePrintVoucher = useReactToPrint({
    content: () => voucherPrintRef.current,
  });

  const {
    accountId,
    accountName,
    total,
    details,
    dublicate,
    voucherDetails,
    showSignatures,
    jvDetails,
    glTransactions,
  } = useMemo(() => {
    let tempAccountName = '';
    let tempAccountId = '';

    let tempDetails = {};

    let tempVoucherDetails = {};

    let tempTotal = '';

    let tempShowSignatures = false;
    let tempDublicate = false;

    let tempJVDetails;

    let tempGLTransactions;

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
        Rebate: amountConverter(depositDetailData?.rebate ?? '0'),
        'Payment Mode': depositDetailData?.paymentMode,
        'Deposited By': depositDetailData?.depositedBy,
      };
      tempDublicate = true;
      tempTotal = depositDetailData?.totalDepositedAmount as string;

      tempGLTransactions = depositDetailData?.glTransaction;
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
        'Withdrawn By': withdrawDetailData?.withdrawnBy,
      };
      tempDublicate = true;
      tempTotal = withdrawDetailData?.totalWithdrawnAmount as string;

      tempGLTransactions = withdrawDetailData?.glTransaction;

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
      };
      tempDublicate = true;
      tempTotal = accountTransferDetailData?.transferAmount as string;

      tempGLTransactions = accountTransferDetailData?.glTransaction;
    }

    if (router?.asPath?.includes('/repayments/') || router?.asPath?.includes('/loan-payment/')) {
      tempAccountName = loanRepaymentDetailData?.loanAccountName as string;

      tempAccountId = loanRepaymentDetailData?.loanAccountId as string;

      const totalInterestAmount = loanRepaymentDetailData?.installmentDetails?.reduce(
        (sum, installment) => sum + Number(installment?.interestAmount ?? 0),
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
        'Principal Amount': amountConverter(loanRepaymentDetailData?.totalRepaymentAmount || 0),
        'Interest Amount': amountConverter(totalInterestAmount || 0),
        'Penalty Amount': amountConverter(loanRepaymentDetailData?.fine || 0),
        'Rebate Amount': amountConverter(loanRepaymentDetailData?.rebate || 0),

        'Payment Mode': loanRepaymentDetailData?.paymentMode,
      };

      tempTotal = loanRepaymentDetailData?.totalRepaymentAmount as string;

      tempGLTransactions = loanRepaymentDetailData?.glTransaction;
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
      };
    }

    return {
      accountId: tempAccountId,
      accountName: tempAccountName,
      total: tempTotal,
      details: tempDetails,
      voucherDetails: tempVoucherDetails,
      showSignatures: tempShowSignatures,
      jvDetails: tempJVDetails,
      glTransactions: tempGLTransactions,
      dublicate: tempDublicate,
    };
  }, [
    depositDetailData,
    withdrawDetailData,
    accountTransferDetailData,
    loanRepaymentDetailData,
    voucherData,
    router?.asPath,
  ]);

  const pageHeaderOptions =
    router?.asPath?.includes('/deposit') ||
    router?.asPath?.includes('/withdraw/') ||
    router?.asPath?.includes('/account-transfer/') ||
    router?.asPath?.includes('/repayments/') ||
    router?.asPath?.includes('/loan-payment/') ||
    router?.asPath?.includes('/journal-vouchers/')
      ? [
          { label: 'Print', handler: handlePrint },
          {
            label: 'Print Voucher',
            handler: handlePrintVoucher,
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
            }}
            total={amountConverter(total)}
            totalWords={amountToWordsConverter(total)}
            details={details}
            dublicate={dublicate}
            showSignatures={showSignatures}
            ref={printComponentRef}
          />
        </Box>
      ) : (
        <SuccessPrintJornalVoucher
          jVPrint={jvDetails}
          showSignatures={showSignatures}
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
          }}
          total={amountConverter(total)}
          totalWords={amountToWordsConverter(total)}
          details={voucherDetails}
          showSignatures={showSignatures}
          glTransactions={glTransactions}
          glTransactionsTotal={total}
          ref={voucherPrintRef}
        />
      ) : (
        <SuccessPrintJornalVoucher
          jVPrint={jvDetails}
          showSignatures={showSignatures}
          ref={voucherPrintRef}
        />
      )}
    </>
  );
};
