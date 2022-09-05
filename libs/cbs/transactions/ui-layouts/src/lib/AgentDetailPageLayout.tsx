import React from 'react';
import { useRouter } from 'next/router';

import { DetailPageSideBar } from '@coop/cbs/transactions/ui-components';
import { Box, PathBar } from '@coop/shared/ui';

interface AgentDetailPageLayoutProps {
  children: React.ReactNode;
  // tabList: { title: string; to: string }[];
}

export const AgentDetailPageLayout = ({
  children,
}: AgentDetailPageLayoutProps) => {
  const router = useRouter();

  const id = router?.query?.['id'];

  const tabList = [
    {
      title: 'Overview',
      to: `/transactions/agent/${id}/overview`,
    },
    {
      title: 'Assigned Members',
      to: `/transactions/agent/${id}/assigned-members`,
    },
    {
      title: 'Tasks',
      to: `/transactions/agent/${id}/tasks`,
    },
    {
      title: 'Documents',
      to: `/transactions/agent/${id}/documents`,
    },
    {
      title: 'Activity',
      to: `/transactions/agent/${id}/activity`,
    },
  ];

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
