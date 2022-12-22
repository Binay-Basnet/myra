import React from 'react';

import { Sidebar } from '@myra-ui';

import { useTranslation } from '@coop/shared/utils';

interface IAccountPageLayoutProps {
  children: React.ReactNode;
}

const userColumns = [
  {
    title: 'acMBanking',
    link: '/alternative-channels/users/mBanking',
    addLink: '/alternative-channels/users/activation?type=mBanking',
  },
  {
    title: 'acEBanking',
    link: '/alternative-channels/users/eBanking',
    addLink: '/alternative-channels/users/activation?type=eBanking',
  },
  {
    title: 'acSMSBanking',
    link: '/alternative-channels/users/smsBanking',
    addLink: '/alternative-channels/users/activation?type=smsBanking',
  },
];

const addButtoncolumns = [
  {
    title: 'acActivateMBanking',
    link: '/alternative-channels/users/activation?type=mBanking',
  },
  {
    title: 'acActivateEBanking',
    link: '/alternative-channels/users/activation?type=eBanking',
  },
  {
    title: 'acActivateSMSBanking',
    link: '/alternative-channels/users/activation?type=smsBanking',
  },
];

export const UserLayout = ({ children }: IAccountPageLayoutProps) => {
  const { t } = useTranslation();

  return (
    <Sidebar
      applicationName="Alternative Channels"
      featureName={t['acUsers']}
      featureLink="/alternative-channels/users/mBanking"
      mainButtonLabel={t['shareLayoutNewShare']}
      tabColumns={userColumns}
      addButtonList={addButtoncolumns}
      children={children}
    />
  );
};
