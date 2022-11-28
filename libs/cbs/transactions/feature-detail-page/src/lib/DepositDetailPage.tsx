import { Box, Text } from '@myra-ui';
import { useTranslation } from '@coop/shared/utils';

import {
  GlTransaction,
  OtherDetails,
  PaymentDetails,
  SideBar,
  TransactionDetails,
} from '../component';
import { useTransactionDetailHooks } from '../hooks/useTransactionDetailHooks';

export const DepositDetailPage = () => {
  const { t } = useTranslation();
  const { depositDetailData } = useTransactionDetailHooks();
  const tableData = depositDetailData?.glTransaction;

  const summary = {
    memberId: depositDetailData?.member?.id,
    name: depositDetailData?.member?.name?.local,
    profilePic: depositDetailData?.member?.profilePicUrl,
    transactionId: depositDetailData?.id,
    transactionDate: depositDetailData?.transactionDate,
    paymentMode: depositDetailData?.paymentMode,
    amount: depositDetailData?.amount,
    method: depositDetailData?.depositedBy,
  };
  return (
    <>
      <Box
        bg="gray.0"
        w="320px"
        position="fixed"
        h="calc(100vh - 110px)"
        borderRight="1px"
        borderRightColor="border.layout"
      >
        <SideBar detailPage="deposit" summary={summary} />
      </Box>

      <Box ml="320px" p="s16" display="flex" flexDir="column" gap="s16">
        <Text color="gray.800" fontWeight="SemiBold" fontSize="r3">
          {t['transDetailOverview']}
        </Text>
        <TransactionDetails detailPage="deposit" />
        <PaymentDetails detailPage="deposit" />
        <OtherDetails
          branch={depositDetailData?.transactionBranch as string}
          teller={depositDetailData?.teller as string}
        />
        <GlTransaction
          totalDebit={depositDetailData?.totalDebit as string}
          totalCredit={depositDetailData?.totalCredit as string}
          data={tableData ?? []}
        />
      </Box>
    </>
  );
};
