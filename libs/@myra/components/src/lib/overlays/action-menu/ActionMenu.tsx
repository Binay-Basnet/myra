import React from 'react';
import { IconType } from 'react-icons';
import {
  Menu,
  MenuButton,
  MenuButtonProps,
  MenuItem,
  MenuItemProps,
  MenuList,
  MenuListProps,
  MenuProps,
} from '@chakra-ui/react';

import { Button, Icon } from '@myra-ui/foundations';

export interface ActionMenuProps<T extends Record<string, unknown>> {
  menuTrigger: React.ReactNode;
  node: T;
  options: {
    label: string;
    variant?: 'danger' | 'neutral';
    icon: IconType;
    onClick: (node: T) => void;
    isShown?: boolean;
  }[];
}

const ActionMenuButton = (props: MenuButtonProps) => (
  <MenuButton as={Button} variant="ghost" size="sm" shade="neutral" {...props} />
);

const ActionMenuList = (props: MenuListProps) => <MenuList {...props} />;

interface ActionMenuItemProps extends Omit<MenuItemProps, 'icon'> {
  variant?: 'danger' | 'neutral';
  label: string;
  icon: IconType;
  onClick: () => void;
}

const ActionMenuItem = ({ variant, icon, label, ...props }: ActionMenuItemProps) => (
  <MenuItem
    _hover={{ bg: 'gray.100' }}
    px="s16"
    py="s10"
    width="100%"
    display="flex"
    alignItems="center"
    gap="s8"
    color={variant === 'danger' ? 'danger.500' : 'gray.800'}
    {...props}
  >
    <Icon as={icon} size="sm" />
    {label}
  </MenuItem>
);

const ActionMenuRoot = (props: MenuProps) => <Menu {...props} />;

export { ActionMenuButton, ActionMenuItem, ActionMenuList, ActionMenuRoot };

export const ActionMenu = <T extends Record<string, unknown>>({
  menuTrigger,
  node,
  options,
}: ActionMenuProps<T>) => (
  <Menu>
    <ActionMenuButton>{menuTrigger}</ActionMenuButton>
    <ActionMenuList zIndex={20}>
      {options?.map(({ isShown = true, ...option }) =>
        !isShown ? null : (
          <ActionMenuItem
            label={option.label}
            icon={option.icon}
            key={option.label}
            variant={option.variant}
            onClick={() => {
              option.onClick(node);
            }}
          />
        )
      )}
    </ActionMenuList>
  </Menu>
);

export default ActionMenu;
