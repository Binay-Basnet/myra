import { useState } from 'react';
import { Box, Tab, TabList, Tabs, Text } from '@chakra-ui/react';
import { AiOutlineAppstore } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';
import { CgDropOpacity } from 'react-icons/cg';
import { IoArchiveOutline, IoCubeOutline } from 'react-icons/io5';
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
  '/inventory': 4,
  '/transactions': 5,
  '/loan': 6,
  '/reports': 7,
  '/utilities': 8,
};

const demotabs: { title: keyof typeof en; icon: IconType; link: string }[] = [
  {
    title: 'navbarDashboard',
    icon: AiOutlineAppstore,
    link: '/',
  },
  {
    title: 'navbarMembers',
    icon: FaUser,
    link: '/members/list',
  },
  {
    title: 'navbarShare',
    icon: IoCubeOutline,
    link: '/share/list',
  },
  {
    title: 'navbarAccounts',
    icon: ImStack,
    link: '/accounts/list',
  },
  {
    title: 'navbarInventory',
    icon: IoArchiveOutline,
    link: '/inventory/product',
  },
  {
    title: 'navbarTransactions',
    icon: BsCardList,
    link: '/transactions',
  },
  {
    title: 'navbarLoan',
    icon: BsArrowLeftRight,
    link: '/loan',
  },
  {
    title: 'navbarReports',
    icon: BsFileText,
    link: '/reports',
  },
  {
    title: 'navbarUtilities',
    icon: CgDropOpacity,
    link: '/utilities',
  },
];

// ! TODO create theme and tests
export function TabMenu() {
  const [tabIndex, setTabIndex] = useState(1);
  const router = useRouter();
  const { t } = useTranslation();

  const currentIndex =
    NAVBAR_TAB_OBJECT[
      Object.keys(NAVBAR_TAB_OBJECT).find((string) =>
        router.pathname.includes(string)
      ) ?? '/dashboard'
    ];

  return (
    <Box
      height="50px"
      p="0 s16"
      background="secondary.700"
      alignItems="center"
      display="flex"
    >
      <Tabs
        index={currentIndex}
        size="md"
        variant="enclosed"
        onChange={(index) => setTabIndex(index)}
      >
        <TabList>
          {demotabs.map(({ title, icon, link }, index) => {
            const isActive = router.asPath.includes(t[title].toLowerCase());
            return (
              <Link href={link}>
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
