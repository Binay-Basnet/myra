import { ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import { FieldValues, FormProvider, useForm, UseFormReturn } from 'react-hook-form';
import { useReactToPrint } from 'react-to-print';
import { useRouter } from 'next/router';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';

import {
  asyncToast,
  Box,
  Button,
  DetailPageHeader,
  MainLayout,
  Modal,
  SuccessPrint,
  SuccessPrintJornalVoucher,
  Text,
} from '@myra-ui';
import { checkDateInFiscalYear } from '@myra-ui/date-picker';

import {
  AllTransactionType,
  PrintType,
  useGetAllTransactionsDetailQuery,
  useGetJournalVoucherDetailQuery,
  useGetPrintCountQuery,
  useRevertTransactionMutation,
  useSwitchTransactionYearEndFlagMutation,
  WithdrawWith,
} from '@coop/cbs/data-access';
import {
  AllTransactionDetailPage,
  useTransactionDetailHooks,
} from '@coop/cbs/transactions/feature-detail-page';
import { TransactionsSidebarLayout } from '@coop/cbs/transactions/ui-layouts';
import { localizedDate, ROUTES } from '@coop/cbs/utils';
import { FormCheckbox } from '@coop/shared/form';
import { amountConverter, amountToWordsConverter } from '@coop/shared/utils';

const ROUTESOBJTRANS: Partial<Record<AllTransactionType, string>> = {
  [AllTransactionType.Deposit]: 'DEPOSIT',
  [AllTransactionType.Withdraw]: 'WITHDRAW',
  [AllTransactionType.Transfer]: 'ACCOUNT-TRANSFER',
  [AllTransactionType.LoanRepayment]: 'REPAYMENTS',
  [AllTransactionType.JournalVoucher]: 'JOURNAL_VOUCHER',
  [AllTransactionType.LoanDisbursment]: 'LOAN_DISBURSEMENT',
  [AllTransactionType.AccountClose]: 'ACCOUNT_CLOSE',
};

const objKeys = Object.keys(ROUTESOBJTRANS);
const DepositDetailsPage = () => {
  const [isVoucherPrintable, setIsVoucherPrintable] = useState(false);
  const router = useRouter();

  const { id } = router.query;

  const queryClient = useQueryClient();
  const { isOpen, onClose, onToggle } = useDisclosure();
  const yearEndMethods = useForm();
  const { data: allTransactionsDetails } = useGetAllTransactionsDetailQuery(
    { id: id as string },
    {
      staleTime: 0,
      enabled:
        !!id &&
        (router?.asPath?.includes('/all-transactions/') ||
          router?.asPath?.includes('/ledger-balance-transfer/')),
    }
  );

  const allTransactionsData = allTransactionsDetails?.transaction?.viewTransactionDetail?.data;
  const loanDisbursmentPrintData =
    allTransactionsDetails?.transaction?.viewTransactionDetail?.data?.loanDisbursementData;

  const accountcloseprintData =
    allTransactionsDetails?.transaction?.viewTransactionDetail?.data?.accountCloseData;

  const txnTypefromRouter = allTransactionsData?.txnType;

  const isCurrentFiscalYear = checkDateInFiscalYear({
    date: new Date(allTransactionsData?.transactionDate.en),
  });

  const { mutateAsync: switchTransactionYearEnd } = useSwitchTransactionYearEndFlagMutation();

  const [isRevertTransactionModalOpen, setIsRevertTransactionModalOpen] = useState(false);
  const handleRevertTransactionModalClose = () => {
    setIsRevertTransactionModalOpen(false);
  };
  const { mutateAsync } = useRevertTransactionMutation();

  const printRef = useRef<HTMLInputElement | null>(null);

  const handlePrintVoucher = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `${allTransactionsData?.txnType}-${id}.pdf`,
  });

  useEffect(() => {
    if (objKeys?.includes(txnTypefromRouter as string)) {
      setIsVoucherPrintable(true);
    }
  }, [txnTypefromRouter]);

  // setup for print

  const {
    memberDetail,
    depositDetailData,
    withdrawDetailData,
    accountTransferDetailData,
    loanRepaymentDetailData,
  } = useTransactionDetailHooks();

  const { data } = useGetJournalVoucherDetailQuery({ entryId: id as string }, { enabled: !!id });

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
        handlePrintVoucherForDetails();
      }
    }
  }, [printCount, printType]);

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
    glTotal,
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

    let tempGlTotal;

    if (
      router?.asPath?.includes(AllTransactionType?.Deposit) ||
      txnTypefromRouter?.includes(AllTransactionType?.Deposit)
    ) {
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
      };
    }

    if (
      router?.asPath?.includes(AllTransactionType?.Withdraw) ||
      txnTypefromRouter?.includes(AllTransactionType?.Withdraw)
    ) {
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
      };
    }

    if (
      router?.asPath?.includes(AllTransactionType?.Transfer) ||
      txnTypefromRouter?.includes(AllTransactionType?.Transfer)
    ) {
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
        'Transfer Type': accountTransferDetailData?.transferType ? txnTypefromRouter : '',
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
        'Transfer Type': accountTransferDetailData?.transferType ? txnTypefromRouter : '',
        'Transfer Amount': amountConverter(accountTransferDetailData?.transferAmount || 0),
      };
      tempDublicate = true;
      tempTotal = accountTransferDetailData?.transferAmount as string;

      tempGLTransactions = accountTransferDetailData?.glTransaction;
      tempShowSignatures = true;

      tempGlTotal = accountTransferDetailData?.totalDebit;
    }

    if (
      router?.asPath?.includes(AllTransactionType?.LoanRepayment) ||
      router?.asPath?.includes('/loan-payment/') ||
      txnTypefromRouter?.includes(AllTransactionType?.LoanRepayment)
    ) {
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
        'Remaining Principal': loanRepaymentDetailData?.totalRemainingPrincipal,
        'Remaining Interest': loanRepaymentDetailData?.totalRemainingInterest,
      };

      tempTotal = Number(loanRepaymentDetailData?.totalRepaymentAmount).toFixed(2);

      tempGLTransactions = loanRepaymentDetailData?.glTransaction;

      tempGlTotal = loanRepaymentDetailData?.totalDebit;

      tempDublicate = true;
      tempShowSignatures = true;
    }
    if (
      router?.asPath?.includes(AllTransactionType?.LoanDisbursment) ||
      txnTypefromRouter?.includes(AllTransactionType?.LoanDisbursment)
    ) {
      tempAccountName = loanDisbursmentPrintData?.loanAccountName as string;

      tempAccountId = loanDisbursmentPrintData?.loanAccountId as string;
      let tempObj: Record<string, string> = {};
      if (loanDisbursmentPrintData?.destAccName) {
        tempObj['Destination Account Name'] = String(loanDisbursmentPrintData?.destAccName);
      }

      if (loanDisbursmentPrintData?.bankName) {
        tempObj = {
          'Bank Name': String(loanDisbursmentPrintData?.bankName),
          'Cheque No': String(loanDisbursmentPrintData?.bankChequeNo),
        };
      }
      tempDetails = {
        'Transaction Id': (
          <Text fontSize="s3" color="primary.500" fontWeight="600">
            {allTransactionsData?.id}
          </Text>
        ),
        Date: localizedDate(loanDisbursmentPrintData?.disbursedDate),
        'Disbursed Amount': amountConverter(loanDisbursmentPrintData?.disbursedAmount || 0),
        'Loan Processing Charge': amountConverter(loanDisbursmentPrintData?.processingCharge || 0),

        'Payment Mode': loanDisbursmentPrintData?.paymentMode,
        ...tempObj,
      };
      tempDublicate = true;
      tempTotal = loanDisbursmentPrintData?.disbursedAmount as string;

      tempGLTransactions = allTransactionsData?.glTransaction;

      tempGlTotal = allTransactionsData?.totalDebit;
      tempShowSignatures = true;

      tempVoucherDetails = {
        'Transaction Id': (
          <Text fontSize="s3" color="primary.500" fontWeight="SemiBold">
            {allTransactionsData?.id}
          </Text>
        ),
        'Transaction Date': localizedDate(loanDisbursmentPrintData?.disbursedDate),

        'Disbursed Amount': loanDisbursmentPrintData?.disbursedAmount,
      };
    }

    if (
      router?.asPath?.includes(AllTransactionType?.AccountClose) ||
      txnTypefromRouter === AllTransactionType?.AccountClose
    ) {
      tempAccountName = accountcloseprintData?.accName as string;

      tempAccountId = accountcloseprintData?.accId as string;
      let tempObj: Record<string, string> = {};
      if (accountcloseprintData?.destAccName) {
        tempObj['Destination Account Name'] = String(accountcloseprintData?.destAccName);
      }

      if (accountcloseprintData?.bankName) {
        tempObj = {
          'Bank Name': String(accountcloseprintData?.bankName),
          'Cheque No': String(accountcloseprintData?.bankChequeNo),
        };
      }

      const principal =
        Number(accountcloseprintData?.amount || 0) +
        Number(accountcloseprintData?.charges || 0) +
        Number(accountcloseprintData?.tax || 0) -
        Number(accountcloseprintData?.interest);

      tempDetails = {
        'Transaction Id': (
          <Text fontSize="s3" color="primary.500" fontWeight="600">
            {allTransactionsData?.id}
          </Text>
        ),

        'Account Id': (
          <Text fontSize="s3" color="primary.500" fontWeight="600">
            {accountcloseprintData?.accId}
          </Text>
        ),
        'Account Closed Date': localizedDate(accountcloseprintData?.accCloseDate),
        'Reason For Closing': accountcloseprintData?.closeReason,
        'Account Name': accountcloseprintData?.accName,
        Principal: amountConverter(principal),
        'Total Interest': accountcloseprintData?.interest,

        Tax: amountConverter(accountcloseprintData?.tax || '0'),
        Charges: accountcloseprintData?.charges,

        'Payment Mode': accountcloseprintData?.paymentMode,

        ...tempObj,
      };
      tempDublicate = true;
      tempTotal = accountcloseprintData?.amount as string;

      tempGLTransactions = allTransactionsData?.glTransaction;

      tempGlTotal = allTransactionsData?.totalDebit;
      tempShowSignatures = true;

      tempVoucherDetails = {
        'Transaction Id': (
          <Text fontSize="s3" color="primary.500" fontWeight="SemiBold">
            {allTransactionsData?.id}
          </Text>
        ),
        'Transaction Date': localizedDate(accountcloseprintData?.accCloseDate),

        Amount: amountConverter(accountcloseprintData?.amount || '0'),
      };
    }
    if (
      router?.asPath?.includes(AllTransactionType?.JournalVoucher) ||
      txnTypefromRouter?.includes(AllTransactionType?.JournalVoucher)
    ) {
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
      glTotal: tempGlTotal,
    };
  }, [
    depositDetailData,
    withdrawDetailData,
    accountTransferDetailData,
    loanRepaymentDetailData,
    voucherData,
    router?.asPath,
    txnTypefromRouter,
  ]);

  const handlePrint = useReactToPrint({
    content: () => printComponentRef.current,
    onAfterPrint: () => setPrintType(null),
    documentTitle: `${txnTypefromRouter}-${memberDetail?.code ?? ''}-${id}.pdf`,
  });

  const handlePrintVoucherForDetails = useReactToPrint({
    content: () => voucherPrintRef.current,
    onAfterPrint: () => setPrintType(null),
    documentTitle: `${txnTypefromRouter}-${memberDetail?.code ?? ''}-${id}.pdf`,
  });

  const options =
    isCurrentFiscalYear && !allTransactionsData?.isYearEndAdjustment && isVoucherPrintable
      ? [
          {
            label: allTransactionsData?.isYearEndAdjustment
              ? 'Remove Year End Adjustment'
              : 'Year End Adjustment',
            handler: () => onToggle(),
          },
          {
            label: 'Revert Transaction',
            handler: () => setIsRevertTransactionModalOpen(true),
          },

          { label: 'Print ', handler: handleCustomerPrint },
          { label: 'Print Voucher', handler: handleOfficeVoucherPrint },
        ]
      : isVoucherPrintable
      ? [
          {
            label: 'Revert Transaction',
            handler: () => setIsRevertTransactionModalOpen(true),
          },

          { label: 'Print ', handler: handleCustomerPrint },
          { label: 'Print Voucher', handler: handleOfficeVoucherPrint },
        ]
      : isCurrentFiscalYear && !allTransactionsData?.isYearEndAdjustment
      ? [
          {
            label: allTransactionsData?.isYearEndAdjustment
              ? 'Remove Year End Adjustment'
              : 'Year End Adjustment',
            handler: () => onToggle(),
          },
          {
            label: 'Revert Transaction',
            handler: () => setIsRevertTransactionModalOpen(true),
          },

          { label: 'Print', handler: handlePrintVoucher },
        ]
      : [
          {
            label: 'Revert Transaction',
            handler: () => setIsRevertTransactionModalOpen(true),
          },

          { label: 'Print', handler: handlePrintVoucher },
        ];

  return (
    <>
      <DetailPageHeader title="Transaction List" options={options} />
      <AllTransactionDetailPage printRef={printRef} />
      <YearEndAdjustmentConfirmationDialog
        isAdjusted={!!allTransactionsData?.isYearEndAdjustment}
        isOpen={isOpen}
        handleConfirm={async () => {
          await asyncToast({
            id: 'switch-transaction',
            msgs: {
              loading: 'Flagging Year End Adjustment',
              success: 'Year End Adjustment Flagged',
            },
            onSuccess: () => queryClient.invalidateQueries(['getAllTransactionsDetail']),
            promise: switchTransactionYearEnd({
              journalId: String(router.query['id']),
              yearEndSettlement: yearEndMethods?.getValues()?.['yearEndSettlement'],
            }),
          });
        }}
        onClose={onClose}
        onToggle={onToggle}
        methods={yearEndMethods}
      />
      <Modal
        open={isRevertTransactionModalOpen}
        onClose={handleRevertTransactionModalClose}
        isCentered
        title="Revert Transaction"
        width="3xl"
      >
        <Box display="flex" flexDir="column">
          <Text fontSize="r1">Are you sure you want to reverse this transaction?</Text>
          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button onClick={() => handleRevertTransactionModalClose()}>Cancel</Button>
            <Button
              onClick={() =>
                asyncToast({
                  id: 'all-transaction-revert',
                  msgs: {
                    loading: 'Reverting transaction',
                    success: 'Transaction reverted successfully!!!',
                  },
                  promise: mutateAsync({ journalId: router?.query?.['id'] as string }),
                  onSuccess: () => {
                    router.push(ROUTES?.CBS_TRANS_ALL_TRANSACTION_LIST);
                    handleRevertTransactionModalClose();
                  },
                })
              }
            >
              Ok
            </Button>
          </Box>
        </Box>
      </Modal>

      {!router?.asPath?.includes(AllTransactionType?.JournalVoucher) ? (
        <Box>
          <SuccessPrint
            meta={{
              memberId: memberDetail?.code,
              accountId,
              accountName,
              member: memberDetail?.name,
            }}
            total={amountConverter(total)}
            totalWords={amountToWordsConverter(Number(total || '0'))}
            details={details}
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

      {!router?.asPath?.includes(AllTransactionType?.JournalVoucher) ? (
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

type YearEndAdjustmentConfirmationDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;

  handleConfirm: () => void;
  isAdjusted: boolean;
  methods: UseFormReturn<FieldValues, any>;
};

const YearEndAdjustmentConfirmationDialog = ({
  isOpen,
  onClose,
  onToggle,
  isAdjusted,
  handleConfirm,
  methods,
}: YearEndAdjustmentConfirmationDialogProps) => {
  const confirmCancelRef = useRef<HTMLButtonElement | null>(null);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={confirmCancelRef}
      onClose={onClose}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader
            fontSize="lg"
            fontWeight="bold"
            borderBottom="1px"
            borderColor="border.layout"
          >
            <Text fontWeight="SemiBold" fontSize="r2" color="gray.800" lineHeight="150%">
              Year End Adjustment Confirmation
            </Text>
          </AlertDialogHeader>

          <AlertDialogBody borderBottom="1px solid" borderBottomColor="border.layout" p="s16">
            <Box display="flex" flexDirection="column" gap="s16">
              <Text fontSize="s3" fontWeight={400} color="gray.800">
                {!isAdjusted
                  ? 'This will make the transaction as previous fiscal year end adjustment'
                  : 'This will remove the adjustment from previous fiscal year and make it as current fiscal year'}
              </Text>

              {!isAdjusted && (
                <FormProvider {...methods}>
                  <Box display="none">
                    <FormCheckbox
                      name="yearEndSettlement"
                      label="Flag this as year end settlement"
                    />
                  </Box>
                </FormProvider>
              )}
            </Box>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={confirmCancelRef} variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              ml={3}
              onClick={() => {
                onToggle();
                handleConfirm();
              }}
            >
              Confirm
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

DepositDetailsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <TransactionsSidebarLayout>{page}</TransactionsSidebarLayout>
    </MainLayout>
  );
};

export default DepositDetailsPage;
