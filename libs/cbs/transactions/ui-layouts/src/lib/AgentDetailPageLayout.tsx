import React from 'react';
import { useRouter } from 'next/router';

import { DetailPageSideBar } from '@coop/cbs/transactions/ui-components';
import { Box, PathBar } from '@coop/shared/ui';

interface AgentDetailPageLayoutProps {
  children: React.ReactNode;
  // tabList: { title: string; to: string }[];
}

const tabList = [
  {
    title: 'Overview',
    to: '/transactions/agent/123456/overview',
  },
  {
    title: 'Assigned Members',
    to: '/transactions/agent/123456/assigned-members',
  },
  {
    title: 'Tasks',
    to: '/transactions/agent/123456/tasks',
  },
  {
    title: 'Documents',
    to: '/transactions/agent/123456/documents',
  },
  {
    title: 'Activity',
    to: '/transactions/agent/123456/activity',
  },
];

export const AgentDetailPageLayout = ({
  children,
}: AgentDetailPageLayoutProps) => {
  const router = useRouter();

  return (
    <>
      <Box bg="white" zIndex="10" top="110px" position="sticky">
        <PathBar
          paths={[
            {
              label: 'Agent List',
              link: '/transactions/agent/list',
            },
            {
              label: 'Agent Detail',
              link: router.asPath,
            },
          ]}
        />
      </Box>
      <Box
        w="300px"
        position="fixed"
        borderRight={'1px'}
        borderRightColor="border.layout"
        minHeight="100vh"
      >
        <DetailPageSideBar tablinks={tabList} />
      </Box>
      <Box
        bg="background.500"
        ml="300px"
        minHeight="calc(100vh - 160px)"
        p="s16"
      >
        {children}
      </Box>
    </>
  );
};
