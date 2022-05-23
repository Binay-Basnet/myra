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
import { useTranslation } from '@saccos/myra/util';
import { en } from '@saccos/myra/locales';
import { IconType } from 'react-icons';
import { Icon } from '@saccos/myra/ui';

/* eslint-disable-next-line */
export interface TabMenuProps {}

const demotabs: { title: keyof typeof en; icon: IconType }[] = [
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
export function TabMenu() {
  const [tabIndex, setTabIndex] = useState(1);
  const route = useRouter();
  console.log('route', route);
  const { t } = useTranslation();

  return (
    <Box
      height="50px"
      p="0 s16"
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
                href={title === 'dashboard' ? '/' : `/${title.toLowerCase()}`}
              >
                <Tab
                  isDisabled
                  borderRadius="br3 br3 0 0"
                  p="s4 s16"
                  _selected={{
                    background: '#EEF2F7',
                    color: 'gray.800',
                  }}
                  style={{
                    color: isActive ? 'gray.800' : 'gray.0',
                    fontSize: 'r1',
                    height: '51px',
                    outline: 'none',
                  }}
                  key={index}
                  display="flex"
                  justifyContent="flex-start"
                >
                  <Icon
                    as={icon}
                    size={'md'}
                    color={isActive ? 'primary.500' : 'primary.300'}
                  />

                  <Text
                    mx="2"
                    color={isActive ? 'gray.800' : 'gray.0'}
                    fontWeight={isActive ? '800' : '500'}
                  >
                    {t[title]}
                  </Text>
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
