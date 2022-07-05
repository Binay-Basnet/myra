import React from 'react';
import { IconType } from 'react-icons';
import { AiFillTag } from 'react-icons/ai';
import { FaShapes, FaUserFriends } from 'react-icons/fa';
import { IoLockClosed } from 'react-icons/io5';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box, Tab, TabList, Tabs, Text } from '@chakra-ui/react';

import { Icon } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface TabMenuInventoryProps {}

const NAVBAR_TAB_OBJECT: Record<string, number> = {
  '/inventory/items': 0,
  '/inventory/warehouse': 1,
  '/inventory/vendor': 2,
};

const demotabs: {
  title: string;
  icon: IconType;
  link: string;
  name: string;
}[] = [
  {
    title: 'items',
    icon: IoLockClosed,
    link: '/inventory/items',
    name: 'items',
  },
  {
    title: 'warehouse',
    icon: FaShapes,
    link: '/inventory/warehouse',
    name: 'warehouse',
  },
  {
    title: 'vendors',
    icon: FaUserFriends,
    link: '/inventory/vendor',
    name: 'vendor',
  },
];

// ! TODO create theme and tests
export function TabMenuForInventoryApp() {
  // const [tabIndex, setTabIndex] = useState(1);
  const router = useRouter();
  const { t } = useTranslation();

  const currentIndex =
    NAVBAR_TAB_OBJECT[
      Object.keys(NAVBAR_TAB_OBJECT).find((string) =>
        router?.pathname.includes(string)
      ) ?? '/inventory/items'
    ];

  return (
    <Box
      height="50px"
      px="s16"
      pt="s4"
      pb="5px"
      background="secondary.700"
      alignItems="center"
      justifyContent={'flex-start'}
      display="flex"
      gap="s8"
    >
      <Box w="200px">
        <Text
          fontWeight={'600'}
          fontSize="16px"
          color={'gray.0'}
          letterSpacing="wide"
        >
          {t['inventory']}
        </Text>
      </Box>
      <Tabs index={currentIndex} height="100%" size="md" variant="enclosed">
        <TabList border="none" height="100%">
          {demotabs.map(({ title, icon, link, name }, index) => {
            const isActive = router?.asPath.includes(name.toLowerCase());
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

export default TabMenuForInventoryApp;
