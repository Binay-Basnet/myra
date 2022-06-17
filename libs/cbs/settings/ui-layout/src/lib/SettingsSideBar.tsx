import { Box, Divider, Text } from '@chakra-ui/react';

import { VerticalSideBarForSettings } from '../components/VerticalSideBarForSettings';

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

export const SettingSideBar = () => {
  return (
    <Box
      w="13%"
      display="flex"
      flexDirection="column"
      gap="s16"
      flexShrink={0}
      minWidth="250px"
      pt="s8"
      pl="s8"
    >
      <Text fontSize="r3" fontWeight="600">
        General
      </Text>
      <Divider borderColor="border.layout" />
      <VerticalSideBarForSettings tablinks={tabList} />
    </Box>
  );
};
