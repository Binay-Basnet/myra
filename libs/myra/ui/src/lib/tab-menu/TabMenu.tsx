import { useState } from 'react';
import { Box, Text, Tabs, TabList, Tab } from '@chakra-ui/react';
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
    title: 'Dashboard',
  },
  {
    title: 'Members',
  },
  {
    title: 'Share',
  },
  {
    title: 'Accounts',
  },
  {
    title: 'Transactions',
  },
  {
    title: 'Loan',
  },
  {
    title: 'Reports',
  },
  {
    title: 'Utilities',
  },
];

const getTabIcon = (iconName: string, isActive: boolean) => {
  switch (iconName) {
    case 'Dashboard':
      return <AiOutlineAppstore size={18} color="#8CC63F" />;
    case 'Members':
      return <FaUser size={18} color="#8CC63F" />;
    case 'Share':
      return <FiShare2 size={18} color="#8CC63F" />;
    case 'Accounts':
      return <AiOutlineAppstore size={18} color="#8CC63F" />;
    case 'Transactions':
      return <VscListFlat size={18} color="#8CC63F" />;
    case 'Loan':
      return <BiTransfer size={18} color="#8CC63F" />;
    case 'Reports':
      return <MdBackupTable size={18} color="#8CC63F" />;
    case 'Utilities':
      return <CgDropOpacity size={18} color="#8CC63F" />;
    default:
      return <AiOutlineAppstore size={18} color="#8CC63F" />;
  }
};

// ! TODO create theme and tests
export function TabMenu() {
  const [tabIndex, setTabIndex] = useState(1);
  const route = useRouter();
  console.log('route', route);

  return (
    <Box
      height="60px"
      px="5"
      background="#00382F"
      alignItems="center"
      display="flex"
    >
      <Tabs
        defaultIndex={1}
        mt="3"
        size="md"
        variant="enclosed"
        onChange={(index) => setTabIndex(index)}
      >
        <TabList>
          {demotabs.map(({ title }, index) => {
            const isActive = tabIndex === index;
            return (
              <Link
                href={title === 'Dashboard' ? '/' : `/${title.toLowerCase()}`}
              >
                <Tab
                  _selected={{
                    background: '#EEF2F7',
                    color: '#042E33',
                  }}
                  style={{
                    color: isActive ? '#042E33' : 'white',
                    fontWeight: 500,
                    fontSize: '1.1rem',
                    height: 50,
                    borderRadius: 0,
                    outline: 'none',
                  }}
                  key={index}
                >
                  {getTabIcon(title, isActive)}
                  <Text mx="2">{title}</Text>
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
