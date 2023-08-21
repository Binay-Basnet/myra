import { MutableRefObject } from 'react';
import { useRouter } from 'next/router';

import { Box, DetailCardContent, DetailsCard, Scrollable, Text } from '@myra-ui';

import { AllTransactionType, useGetAllTransactionsDetailQuery } from '@coop/cbs/data-access';
import { localizedDate, RedirectButton, ROUTES } from '@coop/cbs/utils';
import { amountConverter, useTranslation } from '@coop/shared/utils';

import { AllTransactionDetailPagePrint, GlTransaction, Note } from '../component';

const ROUTESOBJTRANS: Partial<Record<AllTransactionType, string>> = {
  [AllTransactionType.Deposit]: ROUTES.CBS_TRANS_DEPOSIT_DETAILS,
  [AllTransactionType.Withdraw]: ROUTES.CBS_TRANS_WITHDRAW_DETAILS,
  [AllTransactionType.Transfer]: ROUTES.CBS_TRANS_ACCOUNT_TRANSFER_DETAILS,
  [AllTransactionType.LoanRepayment]: ROUTES.CBS_TRANS_LOAN_PAYMENT_DETAILS,
  [AllTransactionType.JournalVoucher]: ROUTES.CBS_TRANS_JOURNAL_VOUCHER_DETAILS,
};

const objKeys = Object.keys(ROUTESOBJTRANS);

export const AllTransactionDetailPage = ({
  printRef,
}: {
  printRef: MutableRefObject<HTMLInputElement>;
}) => {
  const { t } = useTranslation();
  const router = useRouter();

  const { id } = router.query;

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
  const tableData = allTransactionsData?.glTransaction;

  return (
    <>
      <Scrollable detailPage>
        <Box bg="gray.100">
          {/* <TransactionDetails detailPage="deposit" />
        <PaymentDetails detailPage="deposit" />
        <OtherDetails
          branch={depositDetailData?.transactionBranch as string}
          teller={depositDetailData?.teller as string}
        /> */}

          <Box p="s16" display="flex" flexDir="column" minH="100vh" gap="s16">
            <Text color="gray.800" fontWeight="SemiBold" fontSize="r3">
              {t['transDetailOverview']}
            </Text>
            <DetailsCard title={t['transDetailTransactionDetails']} hasThreeRows>
              {!objKeys.includes(allTransactionsData?.txnType as string) && (
                <DetailCardContent
                  title={t['transDetailTransactionID']}
                  subtitle={`#${allTransactionsData?.id}`}
                />
              )}
              {allTransactionsData?.txnType && objKeys.includes(allTransactionsData?.txnType) && (
                <DetailCardContent
                  title={t['transDetailTransactionID']}
                  subtitle={
                    <RedirectButton
                      label={allTransactionsData?.id}
                      link={`${ROUTESOBJTRANS[allTransactionsData?.txnType]}?id=${
                        allTransactionsData?.id
                      }`}
                    />
                  }
                />
              )}

              {allTransactionsData?.oldId && (
                <DetailCardContent
                  title="Old Transaction ID"
                  subtitle={`#${allTransactionsData?.oldId}`}
                />
              )}

              <DetailCardContent
                title="Transaction Date"
                subtitle={localizedDate(allTransactionsData?.transactionDate)}
              />
              <DetailCardContent
                title="Transaction Type"
                subtitle={allTransactionsData?.txnType?.replace(/_/g, ' ')}
              />
              <DetailCardContent
                title="Transaction Mode"
                subtitle={allTransactionsData?.transactionMode}
              />
              <DetailCardContent
                title="Transaction Amount"
                subtitle={amountConverter(allTransactionsData?.amount ?? 0)}
              />
              <DetailCardContent
                title="Transaction Branch"
                subtitle={allTransactionsData?.branch}
              />
              <DetailCardContent title="User" subtitle={allTransactionsData?.user} />
              <DetailCardContent title={t['transDetailStatus']} status />
              <DetailCardContent
                title="Year End Adjustment"
                subtitle={allTransactionsData?.isYearEndAdjustment}
              />
            </DetailsCard>

            {allTransactionsData?.note && <Note note={allTransactionsData?.note} />}

            <GlTransaction
              totalDebit={String(amountConverter(allTransactionsData?.totalDebit ?? 0))}
              totalCredit={String(amountConverter(allTransactionsData?.totalCredit ?? 0))}
              data={tableData ?? []}
            />
          </Box>
        </Box>
      </Scrollable>

      <AllTransactionDetailPagePrint printRef={printRef} />
    </>
  );
};
