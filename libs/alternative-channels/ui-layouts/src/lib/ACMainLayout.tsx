import React from 'react';
import { IoChatboxEllipsesOutline, IoPhonePortraitSharp, IoTvOutline } from 'react-icons/io5';
import { Box } from '@chakra-ui/react';

import { TabMenu, TopLevelHeader } from '@myra-ui';

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
          app="Alternative Channels"
          tabs={[
            {
              title: 'acMBanking',
              icon: IoPhonePortraitSharp,
              link: '/alternative-channels/mBanking/users',
              match: ['mBanking'],
            },
            {
              title: 'acEBanking',
              icon: IoTvOutline,
              link: '/alternative-channels/eBanking/users',
              match: ['eBanking'],
            },
            {
              title: 'acSMSBanking',
              icon: IoChatboxEllipsesOutline,
              link: '/alternative-channels/smsBanking/users',
              match: ['smsBanking'],
            },
          ]}
        />
      </Box>
      <Box mt="110px">{children}</Box>
    </div>
  );
};

export default ACMainLayout;
