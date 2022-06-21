import React from 'react';
import { Box } from '@chakra-ui/react';

import { SettingSideBar } from './SettingsSideBar';

type TabList = {
  title: string;
  to: string;
};

const tabList: TabList[] = [
  {
    title: 'Organization',
    to: '/settings/general/organization',
  },
  {
    title: 'Branches',
    to: '/settings/general/branches',
  },
  {
    title: 'Charts of Accounts',
    to: '/settings/general/charts-of-accounts',
  },
  {
    title: 'Members',
    to: '/settings/general/members',
  },
  {
    title: 'Share',
    to: '/settings/general/share',
  },
  {
    title: 'Deposit / Withdraw',
    to: '/settings/general/deposit-withdraw',
  },
  {
    title: 'Loan',
    to: '/settings/general/loan',
  },
];

interface ISettingsGeneralLayoutProps {
  children: React.ReactNode;
}

export const SettingsGeneralLayout = ({
  children,
}: ISettingsGeneralLayoutProps) => {
  return (
    <Box display={'flex'} flexDirection={'row'}>
      <SettingSideBar />
      <Box width="100%" ml="275px" bg="white" minHeight="calc(100vh - 110px)">
        {children}
      </Box>
    </Box>
  );
};
