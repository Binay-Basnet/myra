import { useState } from 'react';
import { IconType } from 'react-icons';
import { AiOutlineAppstore } from 'react-icons/ai';
import { Box, Tab, TabList, Tabs, Text } from '@chakra-ui/react';
import { Icon } from '@saccos/myra/ui';
import Link from 'next/link';
import { useRouter } from 'next/router';

const demotabs: { title: string; icon: IconType; link: string }[] = [
  {
    title: 'General',
    icon: AiOutlineAppstore,
    link: '/settings/general/organization',
  },
  {
    title: 'Users',
    icon: AiOutlineAppstore,
    link: '/settings/users',
  },
  {
    title: 'Import',
    icon: AiOutlineAppstore,
    link: '/settings/import',
  },
  {
    title: 'Subscriptions',
    icon: AiOutlineAppstore,
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
  const [tabIndex, setTabIndex] = useState(1);
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

      <Tabs
        index={currentIndex}
        size="md"
        variant="enclosed"
        onChange={(index) => setTabIndex(index)}
      >
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
