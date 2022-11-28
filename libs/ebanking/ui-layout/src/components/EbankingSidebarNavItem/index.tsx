import { IconType } from 'react-icons';
import Link from 'next/link';

import { Box, Icon, Text } from '@myra-ui';

type SidebarNavItem = {
  label: string;
  link: string;
  icon: {
    active: IconType;
    inactive: IconType;
  };
};

interface IEbankingSidebarNavItem {
  item: SidebarNavItem;
  isActive: boolean;
}

export const EbankingSidebarNavItem = ({ item, isActive }: IEbankingSidebarNavItem) => (
  <Link href={item.link}>
    <Box
      tabIndex={0}
      px="s16"
      w="100%"
      h="48px"
      cursor="pointer"
      display="flex"
      alignItems="center"
      gap="s16"
      _hover={{
        bg: 'gray.200',
      }}
      bg={isActive ? 'gray.200' : 'transparent'}
    >
      <Icon
        as={isActive ? item.icon.active : item.icon.inactive}
        size="lg"
        color={isActive ? 'primary.500' : 'gray.500'}
      />
      <Text
        fontSize="r1"
        fontWeight={isActive ? '600' : '500'}
        color={isActive ? 'gray.800' : 'gray.700'}
      >
        {item.label}
      </Text>
    </Box>
  </Link>
);
