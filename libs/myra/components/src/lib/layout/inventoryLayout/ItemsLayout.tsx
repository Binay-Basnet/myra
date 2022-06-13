import React from 'react';
import { AiOutlineSetting } from 'react-icons/ai';
import { AddIcon } from '@chakra-ui/icons';
import { Box, Button, Divider, Icon, Text } from '@coop/shared/ui';
import { useRouter } from 'next/router';

import { TabColumn } from '../../tab/TabforMemberPage';

interface IInventoryPageLayoutProps {
  children: React.ReactNode;
}

const inventoryColumns = [
  {
    title: 'inventoryItems',
    link: '/inventory/items',
  },
];

export const InventoryItemsLayout = ({
  children,
}: IInventoryPageLayoutProps) => {
  const router = useRouter();

  return (
    <Box display="flex">
      <Box width="275px" p="s24" flexShrink={0} position="fixed">
        <Text fontSize="l1" fontWeight="600" color="gray.800">
          Items{' '}
        </Text>
        <Divider my="s16" />
        <Button
          width="full"
          size="lg"
          justifyContent="start"
          leftIcon={<AddIcon h="11px" />}
          onClick={() => {
            router.push(router.pathname + '/add');
          }}
        >
          Add Item
        </Button>
        <Divider my="s16" />
        <TabColumn list={inventoryColumns} />
        <Divider my="s16" />
        <Button
          onClick={() => router.push('/members/settings')}
          variant="ghost"
          color="#37474F"
          height="s48"
          width="full"
          justifyContent="start"
          leftIcon={
            <Icon as={AiOutlineSetting} size="md" color="primary.500" />
          }
        >
          Inventory Settings
        </Button>
      </Box>
      <Box
        p="s16"
        width="calc(100% - 275px)"
        borderRadius="br3"
        position="relative"
        left="275px"
      >
        <Box bg="white" borderRadius="br3">
          {children}
        </Box>
      </Box>
    </Box>
  );
};
