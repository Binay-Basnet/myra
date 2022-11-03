import { Box, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { GlTransaction, OtherDetails, SideBar, TransactionDetails } from '../component';
import { useTransactionDetailHooks } from '../hooks/useTransactionDetailHooks';

export const AccountTransferDetailPage = () => {
  const { t } = useTranslation();
  const { accountTransferDetailData } = useTransactionDetailHooks();
  const tableData = accountTransferDetailData?.glTransaction;

  const summary = {
    name: accountTransferDetailData?.member?.name?.local,
    profilePic: accountTransferDetailData?.member?.profilePicUrl,
    transactionId: accountTransferDetailData?.id,
    transactionDate: accountTransferDetailData?.transactionDate,
    paymentMode: accountTransferDetailData?.transferType,
    amount: accountTransferDetailData?.transferAmount,
    method: accountTransferDetailData?.withdrawnBy,
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
        <SideBar summary={summary} />
      </Box>

      <Box ml="320px" p="s16" display="flex" flexDir="column" gap="s16">
        <Text color="gray.800" fontWeight="SemiBold" fontSize="r3">
          {t['transDetailOverview']}
        </Text>
        <TransactionDetails detailPage="accountTransfer" />
        <OtherDetails detailPage="accountTransfer" />
        <GlTransaction data={tableData} />
      </Box>
    </>
  );
};
