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
    <Box display={'flex'} p="s16" flexDirection={'row'} gap="s16">
      <SettingSideBar />
      <Box width="100%" bg="white" borderRadius="br3">
        {children}
      </Box>
    </Box>
  );
};
