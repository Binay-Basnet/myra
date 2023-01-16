import React from 'react';

import { TabMenu } from '@myra-ui/components';

import { MainLayoutContainer, Scrollable } from '../containers/Container';
import { TopLevelHeader } from '../../header';

export interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => (
  <MainLayoutContainer>
    <TopLevelHeader />
    <TabMenu module="CBS" />
    <Scrollable>{children}</Scrollable>
  </MainLayoutContainer>
);

export default MainLayout;
