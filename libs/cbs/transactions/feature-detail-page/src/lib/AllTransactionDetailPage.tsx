import { IoClose } from 'react-icons/io5';
import { useRouter } from 'next/router';

import { Box, DetailCardContent, DetailsCard, Divider, Icon, IconButton, PathBar } from '@myra-ui';

import { AllTransactionType, useGetAllTransactionsDetailQuery } from '@coop/cbs/data-access';
import { RedirectButton, ROUTES } from '@coop/cbs/utils';
import { amountConverter, useTranslation } from '@coop/shared/utils';

import { GlTransaction, Note } from '../component';

const ROUTESOBJTRANS = {
  [AllTransactionType.Deposit]: ROUTES.CBS_TRANS_DEPOSIT_DETAILS,
  [AllTransactionType.Withdraw]: ROUTES.CBS_TRANS_WITHDRAW_DETAILS,
  [AllTransactionType.Transfer]: ROUTES.CBS_TRANS_ACCOUNT_TRANSFER_DETAILS,
  [AllTransactionType.LoanRepayment]: ROUTES.CBS_TRANS_LOAN_PAYMENT_DETAILS,
  [AllTransactionType.JournalVoucher]: ROUTES.CBS_TRANS_JOURNAL_VOUCHER_DETAILS,
};

const objKeys = Object.keys(ROUTESOBJTRANS);

export const AllTransactionDetailPage = () => {
  const router = useRouter();

  const { id } = router.query;

  const { data: allTransactionsDetails } = useGetAllTransactionsDetailQuery(
    { id: id as string },
    { staleTime: 0, enabled: !!id && router?.asPath?.includes('/all-transactions/') }
  );
  const allTransactionsData = allTransactionsDetails?.transaction?.viewTransactionDetail?.data;
  const tableData = allTransactionsData?.glTransaction;
  const { t } = useTranslation();

  return (
    <Box bg="gray.100" minH="calc(100vh - 110px)">
      <Box display="flex" flexDir="column" bg="white">
        <PathBar
          paths={[
            { label: 'All Transactions List', link: '/cbs/transactions/all-transactions/list' },
          ]}
          button={
            <IconButton
              variant="ghost"
              aria-label="close"
              color="gray.500"
              height="40px"
              icon={<Icon as={IoClose} size="lg" />}
              onClick={() => {
                router.back();
              }}
            />
          }
        />
        {/* <TransactionDetails detailPage="deposit" />
        <PaymentDetails detailPage="deposit" />
        <OtherDetails
          branch={depositDetailData?.transactionBranch as string}
          teller={depositDetailData?.teller as string}
        /> */}

        <DetailsCard title={t['transDetailTransactionDetails']} hasThreeRows>
          {!objKeys.includes(allTransactionsData?.txnType as string) && (
            <DetailCardContent
              title={t['transDetailTransactionID']}
              subtitle={allTransactionsData?.id}
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
          <DetailCardContent
            title="Amount"
            subtitle={amountConverter(allTransactionsData?.amount ?? 0)}
          />
          <DetailCardContent title={t['transDetailStatus']} status />
          <DetailCardContent title="Transaction Type" subtitle={allTransactionsData?.txnType} />
        </DetailsCard>
        <Divider />
        {allTransactionsData?.note && (
          <Box>
            {' '}
            <Note note={allTransactionsData?.note} />
          </Box>
        )}

        <Divider />

        <GlTransaction
          totalDebit={String(amountConverter(allTransactionsData?.totalDebit ?? 0))}
          totalCredit={String(amountConverter(allTransactionsData?.totalCredit ?? 0))}
          data={tableData ?? []}
        />
      </Box>
    </Box>
  );
};
