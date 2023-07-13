import React from 'react';

import { Box } from '@myra-ui';

import { ROUTES } from '@coop/cbs/utils';

import { SettingsPageHeader } from './SettingsPageHeader';
import { SettingsInnerVerticalMenu } from '../components/SettingsInnerVerticalMenu';

const tabList = [
  {
    title: 'Salary Components',
    to: ROUTES.HRMODULE_PAYROLL_SALARY_COMPONENTS_SETTINGS,
  },
  {
    title: 'Salary Structure',
    to: ROUTES.HRMODULE_PAYROLL_SALARY_STRUCTURE_SETTINGS,
  },
];

interface ISettingsDepositLayout {
  children: React.ReactNode;
}

export const SettingsPayrollLayout = ({ children }: ISettingsDepositLayout) => (
  <>
    <SettingsPageHeader heading="Payroll Settings" />
    <Box
      w="250px"
      px="s8"
      position="fixed"
      py="s12"
      borderRight="1px"
      borderRightColor="border.layout"
      minHeight="100vh"
    >
      <SettingsInnerVerticalMenu tablinks={tabList} />
    </Box>
    <Box ml="250px">{children}</Box>
  </>
);
