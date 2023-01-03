import React from 'react';

import { Sidebar } from '@myra-ui';

import { ROUTES } from '@coop/cbs/utils';
import { useTranslation } from '@coop/shared/utils';

interface IOthersPageLayoutProps {
  children: React.ReactNode;
}

const othersColumns = [
  {
    title: 'Market Representatives List',
    link: ROUTES.CBS_OTHERS_MARKET_REPRESENTATIVE_LIST,
    name: 'market-representative',
  },
  {
    title: 'Market Representative Transactions',
    link: ROUTES.CBS_OTHERS_MARKET_REPRESENTATIVE_TRANSACTIONS_LIST,
    name: 'market-representative-transaction',
    addLink: ROUTES.CBS_OTHERS_MARKET_REPRESENTATIVE_TRANSACTIONS_ADD,
  },
  {
    title: 'Profit to Fund Management',
    link: ROUTES.CBS_OTHERS_FUND_MANAGEMENT_LIST,
    name: 'fund-management',
    addLink: ROUTES.CBS_OTHERS_FUND_MANAGEMENT_ADD,
  },
  {
    title: 'Share Dividend Posting',
    link: ROUTES.CBS_OTHERS_SHARE_DIVIDEND_POSTING_LIST,
    name: 'share-dividend-posting',
    addLink: ROUTES.CBS_OTHERS_SHARE_DIVIDEND_POSTING_ADD,
  },
];

const dropdownButtons = [
  {
    title: 'New Market Representatives Transaction',
    link: ROUTES.CBS_OTHERS_MARKET_REPRESENTATIVE_TRANSACTIONS_ADD,
  },
  {
    title: 'New Profit to Fund Management',
    link: ROUTES.CBS_OTHERS_FUND_MANAGEMENT_ADD,
  },
  {
    title: 'New Share Dividend Posting',
    link: ROUTES.CBS_OTHERS_SHARE_DIVIDEND_POSTING_ADD,
  },
];

export const OthersPageLayout = ({ children }: IOthersPageLayoutProps) => {
  const { t } = useTranslation();

  return (
    <Sidebar
      applicationName={t['corebankingSystems']}
      featureName="Others"
      featureLink={ROUTES.CBS_OTHERS_MARKET_REPRESENTATIVE_LIST}
      mainButtonLabel={t['newTransfer']}
      addButtonList={dropdownButtons}
      tabColumns={othersColumns}
      children={children}
    />
  );
};
