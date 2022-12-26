import React from 'react';

import { Sidebar } from '@myra-ui';

import { useTranslation } from '@coop/shared/utils';

interface IOthersPageLayoutProps {
  children: React.ReactNode;
}

const othersColumns = [
  {
    title: 'Market Representatives List',
    link: '/others/market-representative/list',
    name: 'market-representative',
  },
  {
    title: 'Market Representative Transactions',
    link: '/others/market-representative-transaction/list',
    name: 'market-representative-transaction',
    addLink: '/others/market-representative-transaction/add',
  },
  {
    title: 'Profit to Fund Management',
    link: '/others/fund-management/list',
    name: 'fund-management',
    addLink: '/others/fund-management/add',
  },
  {
    title: 'Share Dividend Posting',
    link: '/others/share-dividend-posting/list',
    name: 'share-dividend-posting',
    addLink: '/others/share-dividend-posting/add',
  },
];

const dropdownButtons = [
  {
    title: 'New Market Representatives',
    link: '/others/market-representative-transaction/add',
  },
  {
    title: 'New Profit to Fund Management',
    link: '/others/fund-management/add',
  },
  {
    title: 'New Share Dividend Posting',
    link: '/others/share-dividend-posting/add',
  },
];

export const OthersPageLayout = ({ children }: IOthersPageLayoutProps) => {
  const { t } = useTranslation();

  return (
    <Sidebar
      applicationName={t['corebankingSystems']}
      featureName="Others"
      featureLink="/others/fund-management/list"
      mainButtonLabel={t['newTransfer']}
      addButtonList={dropdownButtons}
      tabColumns={othersColumns}
      children={children}
    />
  );
};
