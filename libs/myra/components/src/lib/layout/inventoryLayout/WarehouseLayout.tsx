import React from 'react';

import { AppSidebar, MenuContainer, PageContainer } from '@myra-ui';

import { Can } from '@coop/cbs/utils';

interface IInventoryPageLayoutProps {
  children: React.ReactNode;
}

export const WarehouseLayout = ({ children }: IInventoryPageLayoutProps) => (
  <Can I="SHOW_IN_MENU" a="CBS_MEMBERS_MEMBER" showError isErrorCentered>
    <MenuContainer>
      <AppSidebar menu="WAREHOUSE" module="INVENTORY" />
      <PageContainer>{children}</PageContainer>
    </MenuContainer>
  </Can>
  // <Box display="flex">
  //   <Box width="275px" p="s24" flexShrink={0} position="fixed">
  //     <Text fontSize="l1" fontWeight="600" color="gray.800">
  //       {t['warehouseLayoutWarehouse']}
  //     </Text>
  //     <Divider my="s16" />
  //     <Button
  //       width="full"
  //       size="lg"
  //       justifyContent="start"
  //       leftIcon={<AddIcon h="11px" />}
  //       onClick={() => onOpenModal()}
  //     >
  //       {t['warehouseLayoutAddWarehouse']}
  //     </Button>
  //     <Divider my="s16" />
  //     <TabColumn list={inventoryColumns} />
  //     <Divider my="s16" />
  //     <Button
  //       onClick={() => router.push('/inventory/warehouse/settings')}
  //       variant="ghost"
  //       color="#37474F"
  //       height="s48"
  //       width="full"
  //       justifyContent="start"
  //       leftIcon={<Icon as={AiOutlineSetting} size="md" color="primary.500" />}
  //     >
  //       {t['warehouseSettings']}
  //     </Button>
  //     <AddWarehouseModal />
  //   </Box>
  //   <Box width="calc(100% - 275px)" overflowX="hidden" position="relative" left="275px">
  //     <Box bg="white" minHeight="100vh">
  //       {children}
  //     </Box>
  //   </Box>
  // </Box>
);
