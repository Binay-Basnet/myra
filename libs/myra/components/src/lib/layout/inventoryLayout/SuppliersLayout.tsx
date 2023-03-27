import React from 'react';

import { AppSidebar, MenuContainer, PageContainer } from '@myra-ui';

import { Can } from '@coop/cbs/utils';

interface IInventoryPageLayoutProps {
  children: React.ReactNode;
}

export const SuppliersLayout = ({ children }: IInventoryPageLayoutProps) => (
  <Can I="SHOW_IN_MENU" a="CBS_MEMBERS_MEMBER" showError isErrorCentered>
    <MenuContainer>
      <AppSidebar menu="SUPPLIERS" module="INVENTORY" />
      <PageContainer>{children}</PageContainer>
    </MenuContainer>
  </Can>
  // <Box display="flex">
  //   <Box width="275px" p="s24" flexShrink={0} position="fixed">
  //     <Text fontSize="l1" fontWeight="600" color="gray.800">
  //       {t['supplier']}
  //     </Text>
  //     <Divider my="s16" />
  //     <Button
  //       width="full"
  //       size="lg"
  //       justifyContent="start"
  //       leftIcon={<AddIcon h="11px" />}
  //       onClick={() => {
  //         router.push('/inventory/suppliers/add');
  //       }}
  //     >
  //       {t['addSuppliers']}
  //     </Button>
  //     <Divider my="s16" />
  //     <TabColumn list={inventoryColumns} />
  //     <Divider my="s16" />
  //     <Button
  //       onClick={() => router.push('/inventory/suppliers/settings')}
  //       variant="ghost"
  //       color="#37474F"
  //       height="s48"
  //       width="full"
  //       justifyContent="start"
  //       leftIcon={<Icon as={AiOutlineSetting} size="md" color="primary.500" />}
  //     >
  //       {t['suppiersSettings']}
  //     </Button>
  //   </Box>
  //   <Box width="calc(100% - 275px)" overflowX="hidden" position="relative" left="275px">
  //     <Box bg="white" minHeight="100vh">
  //       {children}
  //     </Box>
  //   </Box>
  // </Box>
);
