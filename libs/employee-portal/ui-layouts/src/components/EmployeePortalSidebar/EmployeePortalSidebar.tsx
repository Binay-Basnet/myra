import React from 'react';
import { BsFolder } from 'react-icons/bs';
import { LuCalendarCheck, LuCalendarX, LuCommand, LuDollarSign, LuMedal } from 'react-icons/lu';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Avatar, Box, Icon, Text } from '@myra-ui';

import { store } from '@coop/employee-portal/data-access';

const SIDEBAR_ITEMS: EmployeePortalSidebarItemProps[] = [
  {
    title: 'Home',
    link: '/',
    icon: (
      <Avatar
        name={store?.getState().auth?.user?.firstName?.local || ''}
        src={store?.getState().auth?.user?.profilePic || ''}
        size="xs"
      />
    ),
  },
  {
    title: 'Attendance',
    link: '/attendance',
    icon: <Icon size="md" as={LuCalendarCheck} />,
  },
  {
    title: 'Leave',
    link: '/leave',
    icon: <Icon size="md" as={LuCalendarX} />,
  },
  {
    title: 'Payroll',
    link: '/payroll',
    icon: <Icon size="md" as={LuDollarSign} />,
  },
  {
    title: 'Training',
    link: '/training',
    icon: <Icon size="md" as={LuCommand} />,
  },
  {
    title: 'Certificates',
    link: '/certificates',
    icon: <Icon size="md" as={LuMedal} />,
  },
  {
    title: 'Collections',
    link: '/collections',
    icon: <Icon size="md" as={BsFolder} />,
  },
];

export const EmployeePortalSidebar = () => {
  const router = useRouter();

  return (
    <Box
      w="20rem"
      flexShrink={0}
      p="s16"
      borderRight="1px"
      borderRightColor="border.layout"
      display="flex"
      flexDir="column"
    >
      {SIDEBAR_ITEMS?.map((item) => (
        <React.Fragment key={item.title}>
          <EmployeePortalSidebarItem {...item} isSelected={router.pathname === item.link} />
        </React.Fragment>
      ))}
    </Box>
  );
};

interface EmployeePortalSidebarItemProps {
  title: string;
  icon: React.ReactNode;
  link: string;
  isSelected?: boolean;
}

const EmployeePortalSidebarItem = ({
  title,
  icon,
  link,
  isSelected = false,
}: EmployeePortalSidebarItemProps) => (
  <Link href={link}>
    <Box
      display="flex"
      borderRadius="br2"
      h="s44"
      px="s16"
      alignItems="center"
      w="100%"
      gap="s8"
      _hover={{ bg: 'gray.200' }}
      transition="all"
      bg={isSelected ? 'gray.200' : 'transparent'}
    >
      {icon}
      <Text fontSize="r1" fontWeight={500} color="gray.700">
        {title}
      </Text>
    </Box>
  </Link>
);
