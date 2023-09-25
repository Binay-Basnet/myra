import { IconType } from 'react-icons';
import { IoMdAnalytics } from 'react-icons/io';
import { IoCubeOutline, IoRoseOutline } from 'react-icons/io5';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Tab, TabList, Tabs } from '@chakra-ui/react';

import { Box, Icon, Text } from '@myra-ui';

import { getUrl, useTranslation } from '@coop/shared/utils';

const getIndex = (pathname: string) => {
  switch (getUrl(pathname, 1)) {
    case 'clients':
      return 0;
    case 'users':
      return 1;
    case 'analytics':
      return 2;
    default:
      return 3;
  }
};

/* eslint-disable-next-line */
export interface TabMenuProps {}

export const TabMenu = () => {
  const router = useRouter();

  const { t } = useTranslation();

  const demotabs: { title: string; icon: IconType; link: string }[] = [
    // {
    //   title: t['neoClientDashboard'],
    //   icon: AiOutlineAppstore,
    //   link: '/',
    // },
    {
      title: t['neoClientClients'],
      icon: IoRoseOutline,
      link: '/clients',
    },
    {
      title: t['neoClientUsers'],
      icon: IoCubeOutline,
      link: '/users',
    },

    {
      title: 'Analytics',
      icon: IoMdAnalytics,
      link: '/analytics/members',
    },
    {
      title: 'Utility',
      icon: IoMdAnalytics,
      link: '/utility/transactions',
    },
  ];

  return (
    <Box height="3.125rem" px="s16" py="s4" alignItems="center" display="flex">
      <Tabs index={getIndex(router.pathname)} size="md" height="100%" variant="enclosed">
        <TabList border="none" height="100%">
          {demotabs.map(({ title, icon, link }) => {
            const isActive = getIndex(router?.pathname) === getIndex(link);
            return (
              <Link href={link} key={link}>
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
                  <Icon as={icon} size="md" color={isActive ? 'primary.500' : 'primary.300'} />

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
};

export default TabMenu;
