import { Box, Scrollable, Text } from '@myra-ui';

import { Member } from '@coop/cbs/data-access';
import { amountConverter, useTranslation } from '@coop/shared/utils';

import { GlTransaction, Note, OtherDetails, SideBar, TransactionDetails } from '../component';
import { useTransactionDetailHooks } from '../hooks/useTransactionDetailHooks';

export const AccountTransferDetailPage = () => {
  const { t } = useTranslation();
  const { accountTransferDetailData } = useTransactionDetailHooks();
  const tableData = accountTransferDetailData?.glTransaction;

  const summary = {
    memberId: accountTransferDetailData?.member?.id,
    name: accountTransferDetailData?.member?.name?.local,
    profilePic: accountTransferDetailData?.member?.profilePicUrl,
    transactionId: accountTransferDetailData?.transactionCode,
    transactionDate: accountTransferDetailData?.transactionDate,
    paymentMode: accountTransferDetailData?.withdrawnBy,
    amount: accountTransferDetailData?.transferAmount,
    method: accountTransferDetailData?.transferType,
    sourceAccount: accountTransferDetailData?.sourceAccount?.accountName,
    sourceAccountId: accountTransferDetailData?.sourceAccount?.id,
    destinationName: accountTransferDetailData?.recipientMember?.name?.local,
    destinationAccount: accountTransferDetailData?.destinationAccount?.accountName,
    destinationAccountId: accountTransferDetailData?.destinationAccount?.id,
    recipientMember: accountTransferDetailData?.recipientMember?.id,
    senderMember: accountTransferDetailData?.member as Member,
    reciepentMemberDetails: accountTransferDetailData?.recipientMember as Member,
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
          <SideBar detailPage="accountTransfer" summary={summary} />
        </Box>
        <Scrollable detailPage>
          <Box ml="320px" p="s16" display="flex" flexDir="column" minH="100vh" gap="s16">
            <Text color="gray.800" fontWeight="SemiBold" fontSize="r3">
              {t['transDetailOverview']}
            </Text>
            <TransactionDetails detailPage="accountTransfer" />
            <OtherDetails
              branch={accountTransferDetailData?.transactionBranch as string}
              teller={accountTransferDetailData?.teller as string}
            />
            {accountTransferDetailData?.note && <Note note={accountTransferDetailData?.note} />}

            <GlTransaction
              totalDebit={String(amountConverter(accountTransferDetailData?.totalDebit ?? 0))}
              totalCredit={String(amountConverter(accountTransferDetailData?.totalCredit ?? 0))}
              data={tableData}
            />
          </Box>
        </Scrollable>
      </Box>
    </Box>
  );
};
