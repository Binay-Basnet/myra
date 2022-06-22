import { IconType } from 'react-icons';
import {
  IoApps,
  IoArrowDownOutline,
  IoGridOutline,
  IoPerson,
} from 'react-icons/io5';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box, Tab, TabList, Tabs, Text } from '@chakra-ui/react';

import { Icon } from '@coop/shared/ui';

// TODO! ( REMOVE THIS COMPONENT )

const demotabs: { title: string; icon: IconType; link: string }[] = [
  {
    title: 'General',
    icon: IoGridOutline,
    link: '/settings/general/organization',
  },
  {
    title: 'Users',
    icon: IoPerson,
    link: '/settings/users',
  },
  {
    title: 'Import',
    icon: IoArrowDownOutline,
    link: '/settings/import',
  },
  {
    title: 'Subscriptions',
    icon: IoApps,
    link: '/settings/subscriptions',
  },
];

const NAVBAR_TAB_OBJECT: Record<string, number> = {
  '/settings/general': 0,
  '/settings/users': 1,
  '/settings/import': 2,
  '/settings/subscriptions': 3,
};

export const SettingsLayout = () => {
  const route = useRouter();
  const currentIndex =
    NAVBAR_TAB_OBJECT[
      Object.keys(NAVBAR_TAB_OBJECT).find((string) =>
        route.pathname.includes(string)
      ) ?? '/settings'
    ];

  return (
    <Box
      height="50px"
      p="0 s16"
      background="secondary.700"
      alignItems="center"
      justifyContent={'flex-start'}
      display="flex"
    >
      <Box w="10%" px="s16">
        {' '}
        <Text
          fontWeight={'600'}
          fontSize="16px"
          color={'gray.0'}
          letterSpacing="wide"
        >
          {' '}
          Settings
        </Text>
      </Box>

      <Tabs index={currentIndex} size="md" variant="enclosed">
        <TabList>
          {demotabs.map(({ title, icon, link }, index) => {
            const isActive =
              route.asPath === '/settings/general/organization' && index === 0
                ? true
                : route.asPath.includes(title.toLowerCase());
            return (
              <Link href={link} key={index}>
                <Tab
                  // isDisabled
                  borderRadius="br3 br3 0 0"
                  // _focus={{ borderColor: 'primary.500' }}
                  p="s4 s16"
                  _selected={{
                    background: '#EEF2F7',
                    color: 'gray.800',
                  }}
                  fontSize="r1"
                  height="50px"
                  color={isActive ? 'gray.800' : 'gray.0'}
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="center"
                  gap="s12"
                >
                  <Icon
                    as={icon}
                    size={'md'}
                    color={isActive ? 'primary.500' : 'primary.300'}
                  />

                  <Text
                    color={isActive ? 'gray.800' : 'gray.0'}
                    fontWeight={isActive ? 'InterSemiBold' : 'InterMedium'}
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
