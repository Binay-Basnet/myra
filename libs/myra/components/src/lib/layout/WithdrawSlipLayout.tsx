import React from 'react';

import { Sidebar } from '@myra-ui';

import { ROUTES } from '@coop/cbs/utils';
import { useTranslation } from '@coop/shared/utils';

interface IMemberPageLayout {
  children: React.ReactNode;
}

const shareColumns = [
  {
    title: 'Withdraw Slip Book',
    link: ROUTES.CBS_WITHDRAW_SLIP_BOOK_LIST,
    addLink: ROUTES.CBS_WITHDRAW_SLIP_BOOK_ADD,
  },
  {
    title: 'withdrawSlipRequests',
    link: ROUTES.CBS_WITHDRAW_SLIP_LIST,
  },
  {
    title: 'withdrawSlipBlockRequests',
    link: ROUTES.CBS_BLOCK_WITHDRAW_SLIP_REQUEST_LIST,
    addLink: ROUTES.CBS_BLOCK_WITHDRAW_SLIP_REQUEST_ADD,
  },
];

const addButtoncolumns = [
  {
    title: 'Withraw Slip Book',
    link: ROUTES.CBS_WITHDRAW_SLIP_BOOK_ADD,
  },
  {
    title: 'Block Withdraw Slip Requests',
    link: ROUTES.CBS_BLOCK_WITHDRAW_SLIP_REQUEST_ADD,
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
