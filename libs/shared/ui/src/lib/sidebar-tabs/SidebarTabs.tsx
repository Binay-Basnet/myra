/* eslint-disable-next-line */
import { chakra, Tab, Text } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

export interface SidebarTabsProps {
  title: React.ReactNode;
  to: string;
}

const TabCol = chakra(Tab, {
  baseStyle: {
    color: 'gray.800',
    height: '48px',
    fontSize: 'r1',
    fontWeight: '400',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',

    _selected: {
      bg: '#EEF2F7',
      fontWeight: '600',
    },
    _focus: {
      boxShadow: 'none',
    },
  },
});

export function SidebarTabs({ title, to }: SidebarTabsProps) {
  return (
    <Link href={to}>
      <TabCol>
        <Text as="div">{title}</Text>
      </TabCol>
    </Link>
  );
}

export default SidebarTabs;
