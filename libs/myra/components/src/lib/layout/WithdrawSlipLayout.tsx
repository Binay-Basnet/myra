import React from 'react';

import { AppSidebar, MenuContainer, PageContainer } from '@myra-ui';

import { Can } from '@coop/cbs/utils';

interface IMemberPageLayout {
  children: React.ReactNode;
}

export const WithdrawSlipLayout = ({ children }: IMemberPageLayout) => (
  <Can I="SHOW_IN_MENU" a="CBS_WITHDRAW_SLIPS" showError isErrorCentered>
    <MenuContainer>
      <AppSidebar menu="WITHDRAW_SLIP" />
      <PageContainer>{children}</PageContainer>
    </MenuContainer>
  </Can>
);
export default WithdrawSlipLayout;
