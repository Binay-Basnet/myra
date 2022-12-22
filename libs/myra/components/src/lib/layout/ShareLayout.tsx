import React from 'react';

import { Sidebar } from '@myra-ui';

interface IMemberPageLayout {
  children: React.ReactNode;
}

const shareColumns = [
  {
    title: 'shareBalance',
    link: '/share/balance',
  },
  {
    title: 'shareRegister',
    link: '/share/register',
  },
];

const settingsColumn = [
  {
    label: 'shareLayoutShareSettings',
    navigate: '/settings/general/share',
  },
];

const reportColumn = [
  {
    label: 'shareLayoutRegisterReport',
    navigate: '/reports/cbs/share/register/new',
  },
  {
    label: 'shareLayoutStateReport',
    navigate: '/reports/cbs/share/statement/new',
  },
  {
    label: 'shareLayoutTransactionReport',
    navigate: '/reports/cbs/share/transaction/new',
  },
];

const addButtoncolumns = [
  {
    title: 'shareLayoutSharePurchase',
    link: '/share/share-issue',
  },
  {
    title: 'shareLayoutShareReturn',
    link: '/share/share-return',
  },
];

export const SharePageLayout = ({ children }: IMemberPageLayout) => (
  <Sidebar
    applicationName="Core Banking System"
    featureName="Share"
    featureLink="/share/balance"
    mainButtonLabel="New"
    tabColumns={shareColumns}
    addButtonList={addButtoncolumns}
    children={children}
    reportButtons={reportColumn}
    settingButtons={settingsColumn}
  />
);
