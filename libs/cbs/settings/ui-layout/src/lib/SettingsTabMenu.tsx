import { IconType } from 'react-icons';
import { IoGridOutline, IoPerson } from 'react-icons/io5';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box, Tab, TabList, Tabs, Text } from '@chakra-ui/react';

import { Icon } from '@myra-ui';

import { ROUTES } from '@coop/cbs/utils';
import { useTranslation } from '@coop/shared/utils';

const demoTabs: { title: string; icon: IconType; link: string }[] = [
  {
    title: 'settingsTabMenuGeneral',
    icon: IoGridOutline,
    link: ROUTES.SETTINGS_GENERAL_SERVICE_CENTER_LIST,
  },
  {
    title: 'settingsTabMenuUsers',
    icon: IoPerson,
    link: ROUTES.SETTINGS_USERS_LIST,
  },
  // {
  //   title: 'settingsTabMenuImport',
  //   icon: IoArrowDownOutline,
  //   link: '/settings/import',
  // },
  // {
  //   title: 'settingsTabMenuSubscriptions',
  //   icon: IoApps,
  //   link: '/settings/subscriptions',
  // },
];

const NAVBAR_TAB_OBJECT: Record<string, number> = {
  '/settings/general': 0,
  '/settings/users': 1,
  '/settings/import': 2,
  '/settings/subscriptions': 3,
};

export const SettingsTabMenu = () => {
  const route = useRouter();
  const { t } = useTranslation();
  const currentIndex =
    NAVBAR_TAB_OBJECT[
      Object.keys(NAVBAR_TAB_OBJECT).find((string) => route.pathname.includes(string)) ??
        '/settings'
    ];

  return (
    <Box
      height="50px"
      px="s16"
      pt="s4"
      pb="5px"
      background="secondary.700"
      alignItems="center"
      justifyContent="flex-start"
      display="flex"
      gap="s8"
    >
      <Box w="200px">
        <Text fontWeight="600" fontSize="16px" color="gray.0" letterSpacing="wide">
          {t['settingsTabMenu']}
        </Text>
      </Box>

      <Tabs index={currentIndex} height="100%" size="md" variant="enclosed">
        <TabList border="none" height="100%">
          {demoTabs.map(({ title, icon, link }, index) => {
            const isActive =
              route.asPath === '/settings/general/organization' && index === 0
                ? true
                : route.asPath.includes(t[title].toLowerCase());
            return (
              <Link href={link} key={title}>
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
                  <Icon as={icon} size="md" color={isActive ? 'primary.500' : 'primary.300'} />

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
};
