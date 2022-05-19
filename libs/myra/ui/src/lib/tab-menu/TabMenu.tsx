import { useState } from 'react';
import { Box, Text, Tabs, TabList, Tab, Icon } from '@chakra-ui/react';
import { AiOutlineAppstore } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';
import { VscListFlat } from 'react-icons/vsc';
import { BiTransfer } from 'react-icons/bi';
import { MdBackupTable } from 'react-icons/md';
import { CgDropOpacity } from 'react-icons/cg';
import { FiShare2 } from 'react-icons/fi';
import Link from 'next/link';
import { useRouter } from 'next/router';

const demotabs = [
  {
    title: 'navbarDashboard',
    icon: AiOutlineAppstore,
  },
  {
    title: 'navbarMembers',
    icon: FaUser,
  },
  {
    title: 'navbarShare',
    icon: FiShare2,
  },
  {
    title: 'navbarAccounts',
    icon: VscListFlat,
  },
  {
    title: 'navbarTransactions',
    icon: BiTransfer,
  },
  {
    title: 'navbarLoan',
    icon: MdBackupTable,
  },
  {
    title: 'navbarReports',
    icon: CgDropOpacity,
  },
  {
    title: 'navbarUtilities',
    icon: CgDropOpacity,
  },
];

// ! TODO create theme and tests
export function TabMenu({ t }: { t: Record<string, string> }) {
  const [tabIndex, setTabIndex] = useState(1);
  const route = useRouter();
  console.log('route', route);

  return (
    <Box
      height="50px"
      px="5"
      background="secondary.700"
      alignItems="center"
      display="flex"
    >
      <Tabs
        defaultIndex={1}
        size="md"
        variant="enclosed"
        onChange={(index) => setTabIndex(index)}
      >
        <TabList>
          {demotabs.map(({ title, icon }, index) => {
            const isActive = tabIndex === index;
            return (
              <Link
                href={title === 'Dashboard' ? '/' : `/${title.toLowerCase()}`}
              >
                <Tab
                  isDisabled
                  width="150"
                  borderRadius="8px 8px 0 0"
                  p="s4 s16"
                  _selected={{
                    background: '#EEF2F7',
                    color: 'gray.800',
                  }}
                  style={{
                    color: isActive ? 'gray.800' : 'white',
                    fontWeight: 500,
                    fontSize: 'r1',
                    height: 50,
                    outline: 'none',
                  }}
                  key={index}
                >
                  <Icon
                    as={icon}
                    size={18}
                    color={isActive ? 'primary.500' : 'primary.300'}
                  />

                  <Text mx="2">{t[title]}</Text>
                </Tab>
              </Link>
            );
          })}
        </TabList>
      </Tabs>
    </Box>
  );
}

export default TabMenu;
