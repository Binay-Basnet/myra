import { chakra, Tab, Tabs, Text, Box } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
const NAVBAR_TAB_OBJECT: Record<string, number> = {
  '/settings/general/organization': 0,
  '/settings/general/branches': 1,
  '/settings/general/chartsOfAccounts': 2,
  '/settings/general/subscriptions': 3,
  '/settings/general/members': 4,
  '/settings/general/share': 5,
  '/settings/general/depositWithdraw': 6,
  '/settings/general/loan': 7,
};
const TabCol = chakra(Tab, {
  baseStyle: {
    color: '#37474F',
    height: '48px',
    fontSize: '14px',
    fontWeight: '500',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    _selected: {
      color: '#37474F',
      bg: '#FFFFFF',
      boxShadow: 'inset 4px 0px 0px #8CC63F',
      fontWeight: '600',
    },
  },
});
export const VerticalSideBar = ({ props }) => {
  const [tabIndex, setTabIndex] = useState(1);
  const route = useRouter();
  const currentIndex =
    NAVBAR_TAB_OBJECT[
      Object.keys(NAVBAR_TAB_OBJECT).find((string) =>
        route.pathname.includes(string)
      ) ?? '/settings'
    ];
  return (
    <Box pl="s24">
      <Tabs variant="unstyled" onChange={(index) => setTabIndex(index)}>
        {props.map(({ title, to }, index) => {
          const isActive =
            route.asPath === '/settings/general' && index === 0
              ? true
              : route.asPath.includes(title.toLowerCase());
          return (
            <Link href={to}>
              <TabCol key={`${title}${index}`}>
                <Text>{title}</Text>
              </TabCol>
            </Link>
          );
        })}
      </Tabs>
    </Box>
  );
};
