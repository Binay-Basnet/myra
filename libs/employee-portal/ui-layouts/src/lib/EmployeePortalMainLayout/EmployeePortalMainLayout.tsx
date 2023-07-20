import React from 'react';

import { Box, Scrollable } from '@myra-ui';

import { EmployeePortalSidebar } from '../../components';
import { EmployeePortalHeader } from '../../components/EmployeePortalHeader/EmployeePortalHeader';

interface EmployeePortalMainLayoutProps {
  children: React.ReactNode;
}

export const EmployeePortalMainLayout = ({ children }: EmployeePortalMainLayoutProps) => (
  <Box display="flex" flexDir="column" h="100vh" overflow="hidden">
    <EmployeePortalHeader />

    <Box display="flex">
      <EmployeePortalSidebar />

      <Box bg="white" w="100%">
        <Scrollable height="calc(100vh - 3.75rem)">
          <Box p="s32">{children}</Box>
        </Scrollable>
      </Box>
    </Box>
  </Box>
);
