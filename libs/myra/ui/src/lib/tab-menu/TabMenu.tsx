import { useState } from 'react';
import { Box, Tab, TabList, Tabs, Text } from '@chakra-ui/react';
import { AiOutlineAppstore } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';
import { CgDropOpacity } from 'react-icons/cg';
import { IoCubeOutline } from 'react-icons/io5';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from '@saccos/myra/util';
import { en } from '@saccos/myra/locales';
import { IconType } from 'react-icons';
import { Icon } from '@saccos/myra/ui';
import { ImStack } from 'react-icons/im';
import { BsArrowLeftRight, BsCardList, BsFileText } from 'react-icons/bs';

/* eslint-disable-next-line */
export interface TabMenuProps {}

const NAVBAR_TAB_OBJECT: Record<string, number> = {
  '/dashboard': 0,
  '/members': 1,
  '/share': 2,
  '/accounts': 3,
  '/transactions': 4,
  '/loan': 5,
  '/reports': 6,
  '/utilities': 7,
};

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
    icon: IoCubeOutline,
  },
  {
    title: 'navbarAccounts',
    icon: ImStack,
  },
  {
    title: 'navbarTransactions',
    icon: BsCardList,
  },
  {
    title: 'navbarLoan',
    icon: BsArrowLeftRight,
  },
  {
    title: 'navbarReports',
    icon: BsFileText,
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
        index={NAVBAR_TAB_OBJECT[route.asPath]}
        size="md"
        variant="enclosed"
        onChange={(index) => setTabIndex(index)}
      >
        <TabList>
          {demotabs.map(({ title, icon }, index) => {
            const isActive = route.asPath.includes(t[title].toLowerCase());
            return (
              <Link
                href={
                  title === 'navbarDashboard'
                    ? '/'
                    : `/${title.slice(6).toLowerCase()}`
                }
              >
                <Tab
                  // isDisabled
                  borderRadius="br3 br3 0 0"
                  _focus={{}}
                  p="s4 s16"
                  _selected={{
                    background: '#EEF2F7',
                    color: 'gray.800',
                  }}
                  fontSize="r1"
                  height="50px"
                  color={isActive ? 'gray.800' : 'gray.0'}
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
                    fontWeight={isActive ? 'InterSemiBold' : 'InterMedium'}
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
