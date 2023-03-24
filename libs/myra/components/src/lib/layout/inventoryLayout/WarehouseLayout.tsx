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
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';

import { Box, Button, Divider, Icon, Text } from '@myra-ui';

import { useSetWareHouseMutation } from '@coop/cbs/data-access';
import { FormInput } from '@coop/shared/form';
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
  const queryClient = useQueryClient();
  const { getValues, handleSubmit } = methods;

  const [openModal, setOpenModal] = useState(false);

  const { mutateAsync: warehouseMutateAsync } = useSetWareHouseMutation();

  const onOpenModal = () => {
    setOpenModal(true);
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const onSubmit = () => {
    warehouseMutateAsync({ data: { ...getValues() } }).then(() => {
      queryClient.invalidateQueries(['getWarehouseList']);
      onCloseModal();
    });
  };

  const AddWarehouseModal = () => (
    <Modal isOpen={openModal} onClose={onCloseModal} isCentered trapFocus={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text fontSize="r2" color="neutralColorLight.Gray-80" fontWeight="SemiBold">
            Add Warehouse
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody p="s16">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box display="flex" flexDirection="column" gap="s24">
                <FormInput type="text" name="name" label={t['warehouseFormName']} />

                <FormInput type="number" name="phoneNumber" label={t['warehouseFormPhoneNumber']} />

                <FormInput type="text" name="address" label={t['warehouseFormAddress']} />
                <Button type="submit" w="-webkit-fit-content" alignSelf="flex-end">
                  {t['warehouseFormAddWarehouse']}
                </Button>
              </Box>
            </form>
          </FormProvider>
        </ModalBody>
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
