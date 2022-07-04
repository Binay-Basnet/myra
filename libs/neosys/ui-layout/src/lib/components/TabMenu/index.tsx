import { IconType } from 'react-icons';
import { AiOutlineAppstore } from 'react-icons/ai';
import { ImStack } from 'react-icons/im';
import { IoCubeOutline, IoRoseOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { Link, Tab, TabList, Tabs } from '@chakra-ui/react';

import { Box, Icon, Text } from '@coop/shared/ui';

/* eslint-disable-next-line */
export interface TabMenuProps {}

const NAVBAR_TAB_OBJECT: Record<string, number> = {
  '/': 0,
  '/clients/list': 1,
  '/users': 2,
  '/settings': 3,
};

const demotabs: { title: string; icon: IconType; link: string }[] = [
  {
    title: 'Dashboard',
    icon: AiOutlineAppstore,
    link: '/',
  },
  {
    title: 'Clients',
    icon: IoRoseOutline,
    link: '/clients/list',
  },
  {
    title: 'Users',
    icon: IoCubeOutline,
    link: '/users',
  },
  {
    title: 'Settings',
    icon: ImStack,
    link: '/settings',
  },
];

export function TabMenu(props: TabMenuProps) {
  const router = useRouter();

  const currentIndex =
    NAVBAR_TAB_OBJECT[
      Object.keys(NAVBAR_TAB_OBJECT).find(
        (string) => router?.pathname === string
      ) ?? '/'
    ];

  return (
    <Box height="50px" px="s16" py="s4" alignItems="center" display="flex">
      <Tabs index={currentIndex} size="md" height="100%" variant="enclosed">
        <TabList border="none" height="100%">
          {demotabs.map(({ title, icon, link }, index) => {
            const isActive = router?.pathname === link;

            return (
              <Link href={link} key={index} _hover={{ textDecoration: 'none' }}>
                <Tab
                  _focus={{}}
                  px="s24"
                  py="s12"
                  display="flex"
                  alignItems="center"
                  gap="s12"
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
                    {title}
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
