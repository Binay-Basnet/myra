import React from 'react';

import { Sidebar } from '@myra-ui';

import { ROUTES } from '@coop/cbs/utils';
import { useTranslation } from '@coop/shared/utils';

interface IAccountPageLayoutProps {
  children: React.ReactNode;
}

const accountColumns = [
  {
    title: 'Member Request',
    link: ROUTES.CBS_REQUESTS_MEMBER_LIST,
  },
  {
    title: 'Withdraw Request',
    link: ROUTES.CBS_REQUESTS_WITHDRAW_VIA_COLLECTOR_LIST,
  },
  {
    title: 'Loan Request',
    link: ROUTES.CBS_REQUESTS_LOAN_LIST,
  },
];

export const RequestListLayout = ({ children }: IAccountPageLayoutProps) => {
  const { t } = useTranslation();
  return (
    <Sidebar
      applicationName={t['corebankingSystems']}
      featureName="Request"
      featureLink={ROUTES.CBS_REQUESTS_MEMBER_LIST}
      tabColumns={accountColumns}
      children={children}
    />
  );
};
