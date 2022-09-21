import React from 'react';
import { useRouter } from 'next/router';

import { DetailPageSideBar } from '@coop/cbs/transactions/ui-components';
import { Box, PathBar } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

interface AgentDetailPageLayoutProps {
  children: React.ReactNode;
  // tabList: { title: string; to: string }[];
}

export const AgentDetailPageLayout = ({ children }: AgentDetailPageLayoutProps) => {
  const { t } = useTranslation();

  const router = useRouter();

  const id = router?.query?.['id'];

  const tabList = [
    {
      title: t['agentDetailPageLayoutOverview'],
      to: `/transactions/agent/${id}/overview`,
    },
    {
      title: t['agentDetailPageLayoutAssigendMembers'],
      to: `/transactions/agent/${id}/assigned-members`,
    },
    {
      title: t['agentDetailPageLayoutTasks'],
      to: `/transactions/agent/${id}/tasks`,
    },
    {
      title: t['agentDetailPageLayoutDocuments'],
      to: `/transactions/agent/${id}/documents`,
    },
    {
      title: t['agentDetailPageLayoutActivity'],
      to: `/transactions/agent/${id}/activity`,
    },
  ];

  return (
    <>
      <Box bg="white" zIndex="10" top="110px" position="sticky">
        <PathBar
          paths={[
            {
              label: t['agentDetailPageLayoutMarketRepresentativeList'],
              link: '/transactions/agent/list',
            },
            {
              label: t['agentDetailPageLayoutMarketRepresentativeDetail'],
              link: router.asPath,
            },
          ]}
        />
      </Box>
      <Box
        w="250px"
        position="fixed"
        borderRight="1px"
        borderRightColor="border.layout"
        minHeight="100vh"
      >
        <DetailPageSideBar tablinks={tabList} />
      </Box>
      <Box bg="background.500" ml="300px" minHeight="calc(100vh - 160px)" p="s16">
        {children}
      </Box>
    </>
  );
};
