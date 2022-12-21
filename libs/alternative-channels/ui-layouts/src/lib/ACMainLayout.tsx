import React from 'react';
import { AiOutlineCloudDownload, AiOutlineUser } from 'react-icons/ai';

import { Box, TabMenu, TopLevelHeader } from '@myra-ui';

export interface ACMainLayoutProps {
  children: React.ReactNode;
}

export const ACMainLayout = (props: ACMainLayoutProps) => {
  const { children } = props;
  return (
    <div>
      <Box position="fixed" top={0} width="100%" zIndex={11}>
        <TopLevelHeader />
        <TabMenu
          routeIndex={2}
          tabs={[
            {
              title: 'acUsers',
              icon: AiOutlineUser,
              link: '/alternative-channels/users/mBanking',
              match: ['users'],
            },
            {
              title: 'acDownload',
              icon: AiOutlineCloudDownload,
              link: '/alternative-channels/downloads/forms',
              match: ['downloads'],
            },
          ]}
        />
      </Box>
      <Box mt="110px">{children}</Box>
    </div>
  );
};

export default ACMainLayout;
