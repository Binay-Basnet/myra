import React from 'react';

import { Sidebar } from '@myra-ui';

import { useTranslation } from '@coop/shared/utils';

interface IMemberPageLayout {
  children: React.ReactNode;
}

const shareColumns = [
  {
    title: 'Withdraw Slip Book',
    link: '/withdraw/withdraw-slip-book/list',
    addLink: '/withdraw/withdraw-slip-book/add',
  },
  {
    title: 'withdrawSlipRequests',
    link: '/withdraw/cheque-book',
  },
  {
    title: 'withdrawSlipBlockRequests',
    link: '/withdraw/block-withdraw-slip-requests/list',
    addLink: '/withdraw/block-withdraw-slip-requests/add',
  },
];

const addButtoncolumns = [
  {
    title: 'Withraw Slip Book',
    link: '/withdraw/withdraw-slip-book/add',
  },
  {
    title: 'Block Withdraw Slip Requests',
    link: '/withdraw/block-withdraw-slip-requests/add',
  },
];

export const WithdrawSlipLayout = ({ children }: IMemberPageLayout) => {
  const { t } = useTranslation();

  return (
    <Sidebar
      applicationName={t['corebankingSystems']}
      featureName={t['withdrawSlip']}
      featureLink="/withdraw/cheque-book"
      mainButtonLabel={t['New']}
      tabColumns={shareColumns}
      addButtonList={addButtoncolumns}
      children={children}
    />
  );
};
export default WithdrawSlipLayout;
