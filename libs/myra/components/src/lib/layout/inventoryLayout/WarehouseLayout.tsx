import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AiOutlineSetting } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { AddIcon } from '@chakra-ui/icons';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

import { FormInput, FormMap, FormSwitch } from '@coop/shared/form';
import { Box, Button, Divider, Grid, GridItem, Icon, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { TabColumn } from '../../tab/TabforMemberPage';

interface IInventoryPageLayoutProps {
  children: React.ReactNode;
}

const inventoryColumns = [
  {
    title: 'warehouseLayoutWarehouseList',
    link: '/inventory/warehouse/list',
  },
  {
    title: 'warehouseLayoutWarehouseTransfer',
    link: '/inventory/warehouse/transfer',
  },
];

export const WarehouseLayout = ({ children }: IInventoryPageLayoutProps) => {
  const router = useRouter();
  const { t } = useTranslation();
  const methods = useForm({});
  const [openModal, setOpenModal] = useState(false);

  const onOpenModal = () => {
    setOpenModal(true);
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const AddWarehouseModal = () => (
    <Modal isOpen={openModal} onClose={onCloseModal} isCentered trapFocus={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text fontSize="r2" color="neutralColorLight.Gray-80" fontWeight="SemiBold">
            {t['warehouseFormNewWarehouse']}
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody p="s16">
          <FormProvider {...methods}>
            <form>
              <Box display="flex" flexDirection="column" gap="s24">
                <Grid templateColumns="repeat(3,1fr)" gap="s20">
                  <GridItem colSpan={2}>
                    <FormInput
                      type="text"
                      name="name"
                      label={t['warehouseFormName']}
                      __placeholder={t['warehouseFormEnterName']}
                    />
                  </GridItem>
                  <GridItem>
                    <FormInput
                      type="text"
                      name="phoneNumber"
                      label={t['warehouseFormPhoneNumber']}
                      __placeholder={t['warehouseFormEnterPhoneNumber']}
                    />
                  </GridItem>
                </Grid>

                <FormSwitch name="defaultWarehouse" label={t['warehouseFormDefaultWarehouse']} />

                <Box display="flex" flexDirection="column" gap="s16">
                  <FormInput
                    type="text"
                    name="address"
                    label={t['warehouseFormAddress']}
                    __placeholder={t['warehouseFormEnterAddress']}
                  />

                  <Box>
                    <FormMap name="addressMap" />
                  </Box>
                </Box>
              </Box>
            </form>
          </FormProvider>
        </ModalBody>

        <ModalFooter>
          <Button>{t['warehouseFormAddWarehouse']}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  return (
    <Box display="flex">
      <Box width="275px" p="s24" flexShrink={0} position="fixed">
        <Text fontSize="l1" fontWeight="600" color="gray.800">
          {t['warehouseLayoutWarehouse']}
        </Text>
        <Divider my="s16" />
        <Button
          width="full"
          size="lg"
          justifyContent="start"
          leftIcon={<AddIcon h="11px" />}
          onClick={() => onOpenModal()}
        >
          {t['warehouseLayoutAddWarehouse']}
        </Button>
        <Divider my="s16" />
        <TabColumn list={inventoryColumns} />
        <Divider my="s16" />
        <Button
          onClick={() => router.push('/inventory/warehouse/settings')}
          variant="ghost"
          color="#37474F"
          height="s48"
          width="full"
          justifyContent="start"
          leftIcon={<Icon as={AiOutlineSetting} size="md" color="primary.500" />}
        >
          {t['warehouseSettings']}
        </Button>
        <AddWarehouseModal />
      </Box>
      <Box width="calc(100% - 275px)" overflowX="hidden" position="relative" left="275px">
        <Box bg="white" minHeight="100vh">
          {children}
        </Box>
      </Box>
    </Box>
  );
};
