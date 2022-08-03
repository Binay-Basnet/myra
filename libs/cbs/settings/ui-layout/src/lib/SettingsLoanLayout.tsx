import React from 'react';

import { Box } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { SettingsPageHeader } from './SettingsPageHeader';
import { SettingsInnerVerticalMenu } from '../components/SettingsInnerVerticalMenu';

const tabList = [
  {
    // title: 'TDS',
    title: 'settingsLoanGeneral',
    to: '/settings/general/loan/general',
  },
  //   {
  //     // title: 'IRO Setup',
  //     title: 'settingsDepositIROSetup',
  //     to: '/settings/general/deposit/iro-setup',
  //   },
  {
    // title: 'TDS',
    title: 'settingsInsuranceGeneral',
    to: '/settings/general/loan/insurance',
  },
  {
    // title: 'TDS',
    title: 'settingsProductTypeGeneral',
    to: '/settings/general/loan/product-type',
  },
];

interface ISettingsLoanLayout {
  children: React.ReactNode;
}

export const SettingsLoanLayout = ({ children }: ISettingsLoanLayout) => {
  const { t } = useTranslation();

  return (
    <>
      <SettingsPageHeader heading={t['settingsLoan']} />
      <Box
        w="300px"
        px="s8"
        position="fixed"
        py="s16"
        borderRight={'1px'}
        borderRightColor="border.layout"
        minHeight="100vh"
      >
        <SettingsInnerVerticalMenu tablinks={tabList} />
      </Box>
      <Box ml="300px">{children}</Box>
    </>
  );
};
