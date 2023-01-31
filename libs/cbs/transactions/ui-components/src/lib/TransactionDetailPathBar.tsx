import { useMemo, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useRouter } from 'next/router';
import { useTransactionDetailHooks } from 'libs/cbs/transactions/feature-detail-page/src/hooks/useTransactionDetailHooks';

import { Box, DetailPageHeader, SuccessPrint, SuccessPrintJornalVoucher, Text } from '@myra-ui';

import { TransferType, useGetJournalVoucherDetailQuery } from '@coop/cbs/data-access';
import { localizedDate } from '@coop/cbs/utils';

export interface PathBarProps {
  title: string;
}
const transferTypeObj = {
  [TransferType.Self]: 'Self Transfer',
  [TransferType.Member]: 'Member to Member',
};

export const TransactionDetailPathBar = ({ title }: PathBarProps) => {
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

  const componentRef = useRef<HTMLInputElement | null>(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const { accountId, accountName, total, details, showSignatures, jvDetails } = useMemo(() => {
    let tempAccountName = '';
    let tempAccountId = '';

    let tempDetails = {};

    let tempTotal = '';

    let tempShowSignatures = false;

    let tempJVDetails;

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
        'Deposit Amount': depositDetailData?.amount,
        Rebate: depositDetailData?.rebate ?? '0',
        'Payment Mode': depositDetailData?.paymentMode,
        'Deposited By': depositDetailData?.depositedBy,
      };

      tempTotal = depositDetailData?.totalDepositedAmount as string;
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
        'Withdraw Amount': withdrawDetailData?.withdrawAmount,
        Fine: withdrawDetailData?.fine ?? '0',
        'Payment Mode': withdrawDetailData?.paymentMode,
        'Withdrawn By': withdrawDetailData?.withdrawnBy,
      };

      tempTotal = withdrawDetailData?.totalWithdrawnAmount as string;
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
        'Withdrawn By': accountTransferDetailData?.withdrawnBy,
        'Transfer Type': accountTransferDetailData?.transferType
          ? transferTypeObj[accountTransferDetailData?.transferType]
          : '',
        'Transfer Amount': accountTransferDetailData?.transferAmount,
      };

      tempTotal = accountTransferDetailData?.transferAmount as string;
    }

    if (router?.asPath?.includes('/repayments/')) {
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
        'Principal Amount': loanRepaymentDetailData?.totalRepaymentAmount,
        'Interest Amount': totalInterestAmount,
        'Penalty Amount': loanRepaymentDetailData?.fine,
        'Rebate Amount': loanRepaymentDetailData?.rebate,

        'Payment Mode': loanRepaymentDetailData?.paymentMode,
      };

      tempTotal = loanRepaymentDetailData?.totalRepaymentAmount as string;
    }

    if (router?.asPath?.includes('/journal-vouchers/')) {
      // const temp: Record<string, React.ReactNode> = {};

      // voucherData?.glTransaction?.forEach((fee) => {
      //   if (fee?.account && (fee?.credit || fee?.debit)) {
      //     if (fee?.debit) {
      //       temp[String(fee.account)] = (
      //         <Box display="flex" gap="s8">
      //           <Text fontSize="s3" fontWeight="600">
      //             {fee?.debit}
      //           </Text>
      //           <Text fontSize="s3" color="accent.700" fontWeight="600">
      //             DR
      //           </Text>
      //         </Box>
      //       );
      //     }

      //     if (fee?.credit) {
      //       temp[String(fee.account)] = (
      //         <Box display="flex" gap="s8">
      //           <Text fontSize="s3" fontWeight="600">
      //             {fee?.credit}
      //           </Text>
      //           <Text fontSize="s3" color="accent.100" fontWeight="600">
      //             CR
      //           </Text>
      //         </Box>
      //       );
      //     }
      //   }
      // });

      // tempDetails = {
      //   'Transaction Id': (
      //     <Text fontSize="s3" color="primary.500" fontWeight="600">
      //       {voucherData?.transactionCode}
      //     </Text>
      //   ),
      //   Date: localizedDate(voucherData?.date),
      //   Reference: voucherData?.reference,
      //   ...temp,
      //   'Total Amount': amountConverter(voucherData?.amount ?? 0),
      //   'Total Amount in words': amountToWordsConverter(voucherData?.amount ?? 0),
      //   Note: voucherData?.note,
      // };

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
      showSignatures: tempShowSignatures,
      jvDetails: tempJVDetails,
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
      ? [{ label: 'Print Voucher', handler: handlePrint }]
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
        />
      </Box>

      {!router?.asPath?.includes('/journal-vouchers/') ? (
        <SuccessPrint
          meta={{
            memberId: memberDetail?.code,
            accountId,
            accountName,
            member: memberDetail?.name,
          }}
          total={total}
          details={details}
          showSignatures={showSignatures}
          ref={componentRef}
        />
      ) : (
        <SuccessPrintJornalVoucher
          jVPrint={jvDetails}
          showSignatures={showSignatures}
          ref={componentRef}
        />
      )}
    </>
  );
};
