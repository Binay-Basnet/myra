import React from 'react';

import { Sidebar } from '@myra-ui';

import { ROUTES } from '@coop/cbs/utils';

interface IMemberPageLayout {
  children: React.ReactNode;
}

const shareColumns = [
  {
    title: 'shareBalance',
    link: ROUTES.CBS_SHARE_BALANCE,
  },
  {
    title: 'shareRegister',
    link: ROUTES.CBS_SHARE_REGISTER,
  },
];

const settingsColumn = [
  {
    label: 'shareLayoutShareSettings',
    navigate: ROUTES.SETTINGS_GENERAL_SHARE,
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
    link: ROUTES.CBS_SHARE_ISSUE_ADD,
  },
  {
    title: 'shareLayoutShareReturn',
    link: ROUTES.CBS_SHARE_RETURN_ADD,
  },
];

export const SharePageLayout = ({ children }: IMemberPageLayout) => (
  <Sidebar
    applicationName="Core Banking System"
    featureName="Share"
    featureLink={ROUTES.CBS_SHARE_BALANCE}
    mainButtonLabel="New"
    tabColumns={shareColumns}
    addButtonList={addButtoncolumns}
    children={children}
    reportButtons={reportColumn}
    settingButtons={settingsColumn}
  />
);
