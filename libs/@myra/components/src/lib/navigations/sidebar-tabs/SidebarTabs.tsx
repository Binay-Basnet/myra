/* eslint-disable-next-line */
import { chakra, Tab, Text } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

export interface SidebarTabsProps {
  title: React.ReactNode;
  to: string;
  isSelected?: boolean;
}

const TabCol = chakra(Tab, {
  baseStyle: {
    color: 'gray.800',
    height: '40px',
    borderRadius: 'br2',
    fontSize: 'r1',
    fontWeight: '400',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',

    _hover: {
      bg: 'highlight.500',
    },
    _selected: {
      bg: '#EEF2F7',
      fontWeight: '600',
    },
    _focus: {
      boxShadow: 'none',
    },
  },
});

export const SidebarTabs = ({ title, to, isSelected }: SidebarTabsProps) => (
  <Link href={to}>
    <TabCol bg={isSelected ? '#EEF2F7' : 'white'} fontWeight={isSelected ? '600' : '400'}>
      <Text as="div">{title}</Text>
    </TabCol>
  </Link>
);

export default SidebarTabs;
