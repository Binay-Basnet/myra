import { IoAddOutline, IoCopyOutline } from 'react-icons/io5';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import { Box, Divider, Grid, Icon, QuickLinks, Text } from '@myra-ui';

import { EmployeeHeader } from '@coop/employee-portal/components';
import { copyToClipboard } from '@coop/shared/utils';

import { Accounts } from '../../components/Accounts/Accounts';
import { Compensation } from '../../components/Compensation';
import { Documents } from '../../components/Documents';
import { Employment } from '../../components/Employment';
import { Overview } from '../../components/Overview';
import { Personal } from '../../components/Personal';

const tabs = [
  {
    label: 'Overview',
    value: 'overview',
    content: <Overview />,
  },
  {
    label: 'Personal',
    value: 'personal',
    content: <Personal />,
  },
  {
    label: 'Employment',
    value: 'employment',
    content: <Employment />,
  },
  {
    label: 'Compensation',
    value: 'compensation',
    content: <Compensation />,
  },
  {
    label: 'Documents',
    value: 'documents',
    content: <Documents />,
  },
  {
    label: 'Accounts',
    value: 'accounts',
    content: <Accounts />,
  },
];

export const EmployeeHomePage = () => {
  const router = useRouter();

  const selectedIndex = tabs.findIndex((p) => p.value === router.query['tab']);

  return (
    <>
      <EmployeeHeader title="Profile" />

      <Box display="flex" justifyContent="space-between" width="100%" py="s24">
        <Box display="flex" gap="s16" flexShrink={0}>
          <Box w="120px" h="120px" position="relative" borderRadius="br3" overflow="hidden">
            <Image src="/images/profile.jpg" alt="Profile" fill />
          </Box>
          <Box display="flex" flexDir="column" gap="s8">
            <Text fontSize="l1" fontWeight={500} color="gray.800">
              Hari Bahadur
            </Text>
            <Text fontSize="r1" fontWeight={400} color="gray.600">
              193847194098139813{' '}
              <Icon
                _hover={{ cursor: 'pointer' }}
                size="sm"
                as={IoCopyOutline}
                onClick={() => copyToClipboard('193847194098139813')}
              />
            </Text>{' '}
            <Text fontSize="r1" fontWeight={400} color="gray.600">
              Employee Since:{' '}
              <Text as="span" fontWeight={500}>
                1yr 50days
              </Text>
            </Text>
          </Box>
        </Box>

        <Box>
          <Text fontSize="s3" color="gray.800">
            Quick Links
          </Text>
          <Grid templateColumns="repeat(3, 1fr)" gap="s10">
            <QuickLinks icon={IoAddOutline} text="Attendance Request" onclick={() => {}} />
            <QuickLinks icon={IoAddOutline} text="Leave Request" onclick={() => {}} />
            <QuickLinks icon={IoAddOutline} text="New Feedback" onclick={() => {}} />
            <QuickLinks icon={IoAddOutline} text="Training Request" onclick={() => {}} />
            <QuickLinks icon={IoAddOutline} text="Expense Request" onclick={() => {}} />
            <QuickLinks icon={IoAddOutline} text="Apply Loan" onclick={() => {}} />
          </Grid>
        </Box>
      </Box>

      <Divider />

      <Tabs
        index={selectedIndex === -1 ? 0 : selectedIndex}
        onChange={(e) => {
          router.push(
            {
              query: {
                tab: tabs[e].value,
              },
            },
            undefined,
            { shallow: true }
          );
        }}
      >
        <TabList borderBottom="1px" borderBottomColor="border.layout">
          {tabs?.map((tab) => (
            <Tab
              key={tab.value}
              fontSize="r1"
              color="gray.700"
              _selected={{
                color: 'primary.500',
                borderBottom: '2px',
                borderBottomColor: 'primary.500',
              }}
            >
              {tab.label}
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          {tabs?.map((tab) => (
            <TabPanel py="s32" px={0} key={tab.value}>
              {tab.content}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </>
  );
};
