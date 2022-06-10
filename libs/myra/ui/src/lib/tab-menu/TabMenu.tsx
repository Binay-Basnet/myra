import { useState } from 'react';
import { IconType } from 'react-icons';
import { AiOutlineAppstore } from 'react-icons/ai';
import { BsArrowLeftRight, BsCardList, BsFileText } from 'react-icons/bs';
import { CgDropOpacity } from 'react-icons/cg';
import { FaUser } from 'react-icons/fa';
import { ImStack } from 'react-icons/im';
import { IoArchiveOutline, IoCubeOutline } from 'react-icons/io5';
import { Box, Tab, TabList, Tabs, Text } from '@chakra-ui/react';
import { en } from '@coop/myra/locales';
import { Icon } from '@coop/myra/ui';
import { useTranslation } from '@coop/myra/util';
import Link from 'next/link';
import { useRouter } from 'next/router';

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

const demotabs: { title: keyof typeof en; icon: IconType; link: string }[] = [
  {
    title: 'navbarDashboard',
    icon: AiOutlineAppstore,
    link: '/',
  },
  {
    title: 'members',
    icon: FaUser,
    link: '/members/list',
  },
  {
    title: 'share',
    icon: IoCubeOutline,
    link: '/share/balance',
  },
  {
    title: 'accounts',
    icon: ImStack,
    link: '/accounts/list',
  },

  {
    title: 'transactions',
    icon: BsCardList,
    link: '/transactions',
  },
  {
    title: 'loan',
    icon: BsArrowLeftRight,
    link: '/loan',
  },
  {
    title: 'reports',
    icon: BsFileText,
    link: '/reports',
  },
  {
    title: 'utilities',
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
  console.log('router', router.pathname, currentIndex);

  return (
    <Box
      height="50px"
      pl="s16"
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
            const isActive = router.asPath.includes(title.toLowerCase());
            console.log('title', title, isActive);
            return (
              <Link href={link} key={index}>
                <Tab
                  // isDisabled
                  borderRadius="br3 br3 0 0"
                  _focus={{}}
                  px="s16"
                  py="s4"
                  gap={'s8'}
                  _selected={{
                    background: '#EEF2F7',
                    color: 'gray.800',
                  }}
                  fontSize="r1"
                  height="50px"
                  color={isActive ? 'gray.800' : 'gray.0'}
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
