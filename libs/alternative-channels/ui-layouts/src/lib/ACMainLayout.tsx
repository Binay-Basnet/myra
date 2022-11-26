import React from 'react';
import { Box } from '@chakra-ui/react';

import { TopLevelHeader } from '@myra-ui';

import { TabMenu } from '../components/TabMenu';

export interface ACMainLayoutProps {
  children: React.ReactNode;
}

export const ACMainLayout = (props: ACMainLayoutProps) => {
  const { children } = props;
  return (
    <div>
      <Box position="fixed" top={0} width="100%" zIndex={11}>
        <TopLevelHeader />
        <TabMenu />
      </Box>
      <Box mt="110px">{children}</Box>
    </div>
  );
};

export default ACMainLayout;
