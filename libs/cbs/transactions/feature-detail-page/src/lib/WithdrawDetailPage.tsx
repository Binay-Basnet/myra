import { Box, Scrollable, Text } from '@myra-ui';

import { WithdrawPaymentType } from '@coop/cbs/data-access';
import { amountConverter, useTranslation } from '@coop/shared/utils';

import {
  GlTransaction,
  MarketRepresentative,
  Note,
  OtherDetails,
  PaymentDetails,
  SideBar,
  TransactionDetails,
} from '../component';
import { useTransactionDetailHooks } from '../hooks/useTransactionDetailHooks';

export const WithdrawDetailPage = () => {
  const { t } = useTranslation();
  const { withdrawDetailData } = useTransactionDetailHooks();
  const tableData = withdrawDetailData?.glTransaction;

  const summary = {
    memberId: withdrawDetailData?.member?.id,
    code: withdrawDetailData?.member?.code,
    name: withdrawDetailData?.member?.name?.local,
    profilePic: withdrawDetailData?.member?.profilePicUrl,
    transactionId: withdrawDetailData?.transactionCode,
    transactionDate: withdrawDetailData?.transactionDate,
    paymentMode: withdrawDetailData?.paymentMode,
    amount: withdrawDetailData?.withdrawAmount,
    method: withdrawDetailData?.withdrawnBy,
  };
  return (
    <Box bg="gray.100">
      <Box display="flex">
        <Box
          bg="gray.0"
          w="320px"
          position="fixed"
          h="calc(100vh - 110px)"
          borderRight="1px"
          borderRightColor="border.layout"
        >
          <SideBar detailPage="withdraw" summary={summary} />
        </Box>
        <Scrollable detailPage>
          <Box ml="320px" p="s16" display="flex" flexDir="column" minH="100vh" gap="s16">
            <Text color="gray.800" fontWeight="SemiBold" fontSize="r3">
              {t['transDetailOverview']}
            </Text>
            <TransactionDetails detailPage="withdraw" />
            <PaymentDetails detailPage="withdraw" />
            {withdrawDetailData?.paymentMode === WithdrawPaymentType?.BankCheque && (
              <MarketRepresentative />
            )}

            <OtherDetails
              branch={withdrawDetailData?.transactionBranch as string}
              teller={withdrawDetailData?.teller as string}
            />

            {withdrawDetailData?.note && <Note note={withdrawDetailData?.note} />}

            <GlTransaction
              totalDebit={String(amountConverter(withdrawDetailData?.totalDebit ?? 0))}
              totalCredit={String(amountConverter(withdrawDetailData?.totalCredit ?? 0))}
              data={tableData ?? []}
            />
          </Box>
        </Scrollable>
      </Box>
    </Box>
  );
};
