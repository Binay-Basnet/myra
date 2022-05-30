import { VerticalSideBar } from '../';
type TabList = {
  title: string;
  to: string;
};
import { useRouter } from 'next/router';

// import { SettingsLayout } from '@saccos/myra/components';
import { Box, Divider, Text } from '@chakra-ui/react';

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

export const SettingsGeneral = () => {
  return (
    <>
      <Box w="12%" display="flex" flexDirection={'column'} mt="s24">
        <Text pl={'s24'} fontSize="16px" fontWeight="600">
          {' '}
          General
        </Text>
        <Box pl="s24">
          <Divider />
        </Box>
        <Box pt="s16">
          <VerticalSideBar props={tabList} />
        </Box>
      </Box>
    </>
  );
};
