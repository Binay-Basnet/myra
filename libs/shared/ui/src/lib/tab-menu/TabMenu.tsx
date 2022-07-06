import { IconType } from 'react-icons';
import { AiOutlineAppstore } from 'react-icons/ai';
import { BsArrowLeftRight, BsFileText } from 'react-icons/bs';
import { ImStack } from 'react-icons/im';
import { IoIosList } from 'react-icons/io';
import { IoCubeOutline, IoPerson } from 'react-icons/io5';
import { MdOutlineWaterDrop } from 'react-icons/md';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box, Tab, TabList, Tabs, Text } from '@chakra-ui/react';

import { Icon } from '@coop/shared/ui';
import { en, useTranslation } from '@coop/shared/utils';

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
    icon: IoPerson,
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
    icon: IoIosList,
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
    icon: MdOutlineWaterDrop,
    link: '/utilities',
  },
];

// ! TODO create theme and tests
export function TabMenu() {
  const router = useRouter();
  const { t } = useTranslation();

  const currentIndex =
    NAVBAR_TAB_OBJECT[
      Object.keys(NAVBAR_TAB_OBJECT).find((string) =>
        router?.pathname.includes(string)
      ) ?? '/dashboard'
    ];

  return (
    <Box
      height="50px"
      px="s16"
      pt="s4"
      pb="5px"
      background="secondary.700"
      alignItems="center"
      display="flex"
    >
      <Tabs index={currentIndex} size="md" height="100%" variant="enclosed">
        <TabList border="none" height="100%">
          {demotabs.map(({ title, icon, link }, index) => {
            const isActive = router?.asPath.includes(title.toLowerCase());
            console.log(router?.asPath, title);
            return (
              <Link href={link} key={index}>
                <Tab
                  _focus={{}}
                  px="s16"
                  py="s4"
                  display="flex"
                  alignItems="center"
                  gap="s8"
                  border="none"
                  _selected={{
                    bg: 'background.500',
                    color: 'gray.800',
                    borderRadius: 'br2',
                  }}
                >
                  <Icon
                    as={icon}
                    size={'md'}
                    color={isActive ? 'primary.500' : 'primary.300'}
                  />

                  <Text
                    fontSize="r1"
                    lineHeight="0"
                    color={isActive ? 'gray.800' : 'gray.0'}
                    fontWeight={isActive ? '600' : '500'}
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
