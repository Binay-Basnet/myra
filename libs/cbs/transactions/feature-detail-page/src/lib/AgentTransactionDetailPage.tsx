import { Box, Scrollable, Text } from '@myra-ui';

import { useTranslation } from '@coop/shared/utils';

import { AssignedMemberList, SideBar, TransactionDetails } from '../component';
import { useTransactionDetailHooks } from '../hooks/useTransactionDetailHooks';

export const AgentTransactionDetailPage = () => {
  const { t } = useTranslation();
  const { agentTransactionDetailData, agentDetailData } = useTransactionDetailHooks();
  const tableData = agentTransactionDetailData?.assignedMember;

  const summary = {
    name: agentDetailData?.name,
    profilePic: agentDetailData?.profilePicUrl,
    transactionId: agentTransactionDetailData?.transactionId,
    transactionDate: agentTransactionDetailData?.transactionDate,
    amount: agentTransactionDetailData?.totalAmount,
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
          <SideBar detailPage="agentTransaction" summary={summary} />
        </Box>
        <Scrollable detailPage>
          <Box minH="100vh" ml="320px" p="s16" display="flex" flexDir="column" gap="s16">
            <Text color="gray.800" fontWeight="SemiBold" fontSize="r3">
              {t['transDetailOverview']}
            </Text>
            <TransactionDetails detailPage="agentTransaction" />
            <AssignedMemberList data={tableData ?? []} />
          </Box>
        </Scrollable>
      </Box>
    </Box>
  );
};
