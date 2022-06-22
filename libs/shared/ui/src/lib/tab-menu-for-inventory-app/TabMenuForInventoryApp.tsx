import { IconType } from 'react-icons';
import { AiFillTag, AiOutlineAppstore } from 'react-icons/ai';
import { FaShapes, FaUserFriends } from 'react-icons/fa';
import { IoLockClosed } from 'react-icons/io5';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box, Tab, TabList, Tabs, Text } from '@chakra-ui/react';

import { Icon } from '@coop/shared/ui';

/* eslint-disable-next-line */
export interface TabMenuInventoryProps {}

const NAVBAR_TAB_OBJECT: Record<string, number> = {
  '/inventory/items': 0,
  '/inventory/item-group': 1,
  '/inventory/vendor': 2,
  '/inventory/units-of-measure': 3,
};

const demotabs: {
  title: string;
  icon: IconType;
  link: string;
  name: string;
}[] = [
  {
    title: 'Items',
    icon: IoLockClosed,
    link: '/inventory/items',
    name: 'items',
  },
  {
    title: 'Item Group',
    icon: FaShapes,
    link: '/inventory/item-group',
    name: 'item-group',
  },
  {
    title: 'Vendors',
    icon: FaUserFriends,
    link: '/inventory/vendor',
    name: 'vendor',
  },
  {
    title: 'Units',
    icon: AiFillTag,
    link: '/inventory/units-of-measure',
    name: 'units-of-measure',
  },
];

// ! TODO create theme and tests
export function TabMenuForInventoryApp() {
  // const [tabIndex, setTabIndex] = useState(1);
  const router = useRouter();

  const currentIndex =
    NAVBAR_TAB_OBJECT[
      Object.keys(NAVBAR_TAB_OBJECT).find((string) =>
        router?.pathname.includes(string)
      ) ?? '/inventory/items'
    ];

  return (
    <Box
      height="50px"
      p="0 s16"
      background="secondary.700"
      alignItems="center"
      display="flex"
      px="s16"
    >
      <Text fontWeight={'600'} fontSize="r2" color={'gray.0'} w="230px">
        {' '}
        Inventory{' '}
      </Text>
      <Tabs
        index={currentIndex}
        size="md"
        gap={'s8'}
        variant="enclosed"
        // onChange={(index) => setTabIndex(index)}
      >
        <TabList>
          {demotabs.map(({ title, icon, link, name }, index) => {
            const isActive = router?.asPath.includes(name.toLowerCase());
            return (
              <Link href={link} key={index}>
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

export default TabMenuForInventoryApp;
