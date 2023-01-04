import { IoClose } from 'react-icons/io5';
import { useRouter } from 'next/router';

import { Box, Icon, IconButton, PathBar } from '@myra-ui';

import { useGetAllTransactionsDetailQuery } from '@coop/cbs/data-access';
import { amountConverter } from '@coop/shared/utils';

import { GlTransaction } from '../component';

export const AllTransactionDetailPage = () => {
  const router = useRouter();

  const { id } = router.query;

  const { data: allTransactionsDetails } = useGetAllTransactionsDetailQuery(
    { id: id as string },
    { staleTime: 0, enabled: !!id && router?.asPath?.includes('/all-transactions/') }
  );
  const allTransactionsData = allTransactionsDetails?.transaction?.viewTransactionDetail?.data;
  const tableData = allTransactionsData?.glTransaction;

  return (
    <Box bg="gray.100" minH="calc(100vh - 110px)">
      <Box display="flex" flexDir="column" bg="white">
        <PathBar
          paths={[{ label: 'All Transactions List', link: '/transactions/all-transactions/list' }]}
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
        <GlTransaction
          totalDebit={String(amountConverter(allTransactionsData?.totalDebit ?? 0))}
          totalCredit={String(amountConverter(allTransactionsData?.totalCredit ?? 0))}
          data={tableData ?? []}
        />
      </Box>
    </Box>
  );
};
