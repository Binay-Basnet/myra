import React from 'react';
import { IoCopyOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { Box, Text } from '@chakra-ui/react';

import { Avatar, DetailPageTabs, Divider, Icon, toast } from '@myra-ui';

import { useGetAgentDetailDataQuery } from '@coop/cbs/data-access';
import { TransactionDetailPathBar } from '@coop/cbs/transactions/ui-components';
import { useTranslation } from '@coop/shared/utils';

interface AgentDetailPageLayoutProps {
  children: React.ReactNode;
  // tabList: { title: string; to: string }[];
}

export const AgentDetailPageLayout = ({ children }: AgentDetailPageLayoutProps) => {
  const { t } = useTranslation();

  const router = useRouter();
  const handleCopyAgentId = (agentId: string | undefined | null) => {
    if (!agentId) {
      return;
    }
    navigator.clipboard.writeText(agentId).then(() => {
      toast({
        id: 'copy-agent-id',
        type: 'success',
        message: t['agentDetailPageLayoutAgentIdCopied'],
      });
    });
  };
  const id = router?.query?.['id'];

  const { data: agentDetailQueryData } = useGetAgentDetailDataQuery(
    { id: id as string },
    { enabled: !!id }
  );
  return (
    <>
      <TransactionDetailPathBar title="Market Representative List" />
      <Box
        w="250px"
        position="fixed"
        borderRight="1px"
        borderRightColor="border.layout"
        minHeight="100vh"
      >
        {' '}
        <Box minHeight="100vh" bg="gray.0" display="flex" flexDirection="column" gap="s16">
          <Box display="flex" flexDirection="column" p="s16" gap="s16">
            <Box display="flex" gap="s16">
              <Avatar
                name={agentDetailQueryData?.transaction?.agentDetail?.data?.name ?? 'Agent'}
                size="md"
                src={agentDetailQueryData?.transaction?.agentDetail?.data?.profilePicUrl ?? ''}
              />

              <Box display="flex" flexDirection="column" gap="s4">
                <Text fontSize="r1" fontWeight="500" color="primary.500">
                  {agentDetailQueryData?.transaction?.agentDetail?.data?.name}
                </Text>
                <Text fontSize="s3" fontWeight="400" color="gray.800" wordBreak="break-all">
                  {agentDetailQueryData?.transaction?.agentDetail?.data?.branch}
                </Text>
                <Box display="flex" alignItems="center" gap="s10">
                  <Text fontSize="s3" fontWeight="400" color="gray.800" wordBreak="break-all">
                    {agentDetailQueryData?.transaction?.agentDetail?.data?.id}
                  </Text>
                  {agentDetailQueryData?.transaction?.agentDetail?.data?.id && (
                    <Icon
                      _hover={{ cursor: 'pointer' }}
                      size="sm"
                      as={IoCopyOutline}
                      onClick={() =>
                        handleCopyAgentId(agentDetailQueryData?.transaction?.agentDetail?.data?.id)
                      }
                    />
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
          <Divider />
          <DetailPageTabs tabs={['Overview', 'Assigned Members']} />
        </Box>
      </Box>
      <Box bg="background.500" ml="250px" minHeight="calc(100vh - 160px)" p="s16">
        {children}
      </Box>
    </>
  );
};
