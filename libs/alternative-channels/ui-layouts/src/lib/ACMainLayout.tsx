import React from 'react';
import { AiOutlineCloudDownload, AiOutlineUser } from 'react-icons/ai';

import { MainLayoutContainer, TabMenu, TopLevelHeader } from '@myra-ui';

import { ROUTES } from '@coop/cbs/utils';

export interface ACMainLayoutProps {
  children: React.ReactNode;
}

export const ACMainLayout = (props: ACMainLayoutProps) => {
  const { children } = props;
  return (
    <MainLayoutContainer>
      <TopLevelHeader />
      <TabMenu
        routeIndex={2}
        module="ALTERNATIVE_CHANNELS"
        tabs={[
          {
            title: 'acUsers',
            icon: AiOutlineUser,
            link: ROUTES.ALTERNATIVE_CHANNELS_MBANKING_USERS,
            aclKey: 'ALTERNATIVE_CHANNELS_USERS',
            match: ['users'],
            navMenu: 'USERS',
          },
          {
            title: 'acDownload',
            icon: AiOutlineCloudDownload,
            link: ROUTES.ALTERNATIVE_CHANNELS_MBANKING_USERS,
            aclKey: 'ALTERNATIVE_CHANNELS_DOWNLOADS',
            match: ['downloads'],
            navMenu: 'DOWNLOADS',
          },
        ]}
      />
      {children}
    </MainLayoutContainer>
  );
};

export default ACMainLayout;
