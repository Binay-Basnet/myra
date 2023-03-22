import { Box, Scrollable, Text } from '@myra-ui';

import { amountConverter, useTranslation } from '@coop/shared/utils';

import {
  GlTransaction,
  OtherDetails,
  PaymentDetails,
  SideBar,
  TransactionDetails,
} from '../component';
import { Note } from '../component/Note';
import { useTransactionDetailHooks } from '../hooks/useTransactionDetailHooks';

export const DepositDetailPage = () => {
  const { t } = useTranslation();
  const { depositDetailData } = useTransactionDetailHooks();
  const tableData = depositDetailData?.glTransaction;

  const summary = {
    memberId: depositDetailData?.member?.id,
    code: depositDetailData?.member?.code,
    name: depositDetailData?.member?.name?.local,
    profilePic: depositDetailData?.member?.profilePicUrl,
    transactionId: depositDetailData?.transactionCode,
    transactionDate: depositDetailData?.transactionDate,
    paymentMode: depositDetailData?.paymentMode,
    amount: depositDetailData?.amount,
    method: depositDetailData?.depositedBy,
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
          <SideBar detailPage="deposit" summary={summary} />
        </Box>
        <Scrollable detailPage>
          <Box ml="320px" p="s16" display="flex" flexDir="column" minH="100vh" gap="s16">
            <Text color="gray.800" fontWeight="SemiBold" fontSize="r3">
              {t['transDetailOverview']}
            </Text>
            <TransactionDetails detailPage="deposit" />
            <PaymentDetails detailPage="deposit" />
            <OtherDetails
              branch={depositDetailData?.transactionBranch as string}
              teller={depositDetailData?.teller as string}
            />

            {depositDetailData?.note && <Note note={depositDetailData?.note} />}

            <GlTransaction
              totalDebit={String(amountConverter(depositDetailData?.totalDebit ?? 0))}
              totalCredit={String(amountConverter(depositDetailData?.totalCredit ?? 0))}
              data={tableData ?? []}
            />
          </Box>
        </Scrollable>
      </Box>
    </Box>
  );
};
