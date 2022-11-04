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
    paymentMode: accountTransferDetailData?.withdrawnBy,
    amount: accountTransferDetailData?.transferAmount,
    method: accountTransferDetailData?.transferType,
    sourceAccount: accountTransferDetailData?.sourceAccount?.accountName,
    destinationName: accountTransferDetailData?.recipientMember?.name?.local,
    destinationAccount: accountTransferDetailData?.destinationAccount?.accountName,
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
        <SideBar detailPage="accountTransfer" summary={summary} />
      </Box>

      <Box ml="320px" p="s16" display="flex" flexDir="column" gap="s16">
        <Text color="gray.800" fontWeight="SemiBold" fontSize="r3">
          {t['transDetailOverview']}
        </Text>
        <TransactionDetails detailPage="accountTransfer" />
        <OtherDetails
          branch={accountTransferDetailData?.transactionBranch as string}
          teller={accountTransferDetailData?.teller as string}
        />
        <GlTransaction
          totalDebit={accountTransferDetailData?.totalDebit as string}
          totalCredit={accountTransferDetailData?.totalCredit as string}
          data={tableData}
        />
      </Box>
    </>
  );
};
