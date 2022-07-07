import React from 'react';
import { AiOutlineSetting } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { AddIcon } from '@chakra-ui/icons';

import { Box, Button, Divider, Icon, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { TabColumn } from '../../tab/TabforMemberPage';

interface IInventoryPageLayoutProps {
  children: React.ReactNode;
}

const inventoryColumns = [
  {
    title: 'itemsList',
    link: '/inventory/items',
  },
  {
    title: 'itemsCategory',
    link: '/inventory/items/category',
  },
  {
    title: 'itemUnits',
    link: '/inventory/items/units',
  },
];

export const InventoryItemsLayout = ({
  children,
}: IInventoryPageLayoutProps) => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <Box display="flex">
      <Box width="275px" p="s24" flexShrink={0} position="fixed">
        <Text fontSize="l1" fontWeight="600" color="gray.800">
          {t['items']}
        </Text>
        <Divider my="s16" />
        <Button
          width="full"
          size="lg"
          justifyContent="start"
          leftIcon={<AddIcon h="11px" />}
          onClick={() => {
            router.push(router.pathname + '/[action]');
          }}
        >
          {t['addItems']}
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
          {t['itemInventorySettings']}
        </Button>
      </Box>
      <Box
        width="calc(100% - 275px)"
        overflowX="hidden"
        position="relative"
        left="275px"
      >
        <Box bg="white" minHeight="100vh">
          {children}
        </Box>
      </Box>
    </Box>
  );
};
