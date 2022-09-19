import { useMemo } from 'react';
import { IoCopyOutline } from 'react-icons/io5';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box, chakra, Tab, Tabs, Text } from '@chakra-ui/react';

import { useGetAgentDetailDataQuery } from '@coop/cbs/data-access';
import { Avatar, Divider, Icon, toast } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

const TabCol = chakra(Tab, {
  baseStyle: {
    color: 'gray.800',
    height: '48px',
    fontSize: 'r1',
    fontWeight: '400',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    _selected: {
      bg: '#EEF2F7',
      fontWeight: '600',
    },
    _focus: {
      boxShadow: 'none',
    },
  },
});

interface IVerticalSidebarProps {
  tablinks: {
    title: string;
    to: string;
  }[];
}

export const DetailPageSideBar = ({ tablinks }: IVerticalSidebarProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const pathArray = router.pathname.split('/');

  const currentIndex = useMemo(
    () =>
      tablinks.findIndex((link) => {
        const linkArray = link.to.split('/');

        return pathArray[pathArray.length - 1] === linkArray[linkArray.length - 1];
      }),
    [router.pathname]
  );

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
    <Box display="flex" flexDirection="column" gap="s16">
      <Box display="flex" flexDirection="column" p="s16" gap="s16">
        <Box display="flex" gap="s16">
          <Avatar
            name={agentDetailQueryData?.transaction?.agentDetail?.data?.name ?? 'Agent'}
            size="lg"
            src={agentDetailQueryData?.transaction?.agentDetail?.data?.profilePicUrl ?? ''}
          />

          <Box display="flex" flexDirection="column" gap="s4">
            <Text fontSize="r1" fontWeight="500" color="primary.500">
              {agentDetailQueryData?.transaction?.agentDetail?.data?.name}
            </Text>
            <Text fontSize="s3" fontWeight="400" color="gray.800">
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

      <Tabs p="s16" variant="unstyled" index={currentIndex}>
        {tablinks.map(({ title, to }) => (
          <Link href={to} key={`${title}${to}`}>
            <TabCol>
              <Text>{title}</Text>
            </TabCol>
          </Link>
        ))}
      </Tabs>
    </Box>
  );
};
