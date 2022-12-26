import React from 'react';

import { Sidebar } from '@myra-ui';

import { useTranslation } from '@coop/shared/utils';

interface IAccountPageLayoutProps {
  children: React.ReactNode;
}

const accountColumns = [
  {
    title: 'Member Request',
    link: '/requests/member',
  },
  {
    title: 'Withdraw Request',
    link: '/requests/withdraw-via-collector',
  },
  {
    title: 'Loan Request',
    link: '/requests/loan',
  },
];

export const RequestListLayout = ({ children }: IAccountPageLayoutProps) => {
  const { t } = useTranslation();
  return (
    <Sidebar
      applicationName={t['corebankingSystems']}
      featureName="Request"
      featureLink="/requests/member"
      tabColumns={accountColumns}
      children={children}
    />
  );
};
