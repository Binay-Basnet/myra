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

import {
  useGetItemCategoryListQuery,
  useSetItemCategoryMutation,
  useSetUnitsMutation,
} from '@coop/cbs/data-access';
import { FormInput, FormSelect, FormSwitch } from '@coop/shared/form';
import { getPaginationQuery, useTranslation } from '@coop/shared/utils';

import { TabColumn } from '../../tab/TabforMemberPage';

interface IInventoryPageLayoutProps {
  children: React.ReactNode;
}

export const InventoryItemsLayout = ({ children }: IInventoryPageLayoutProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalUnits, setOpenModalUnits] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const itemCategoryMethods = useForm();
  const unitMethods = useForm();

  const { getValues: itemCategoryValues, handleSubmit: itemCategoryHandleSubmit } =
    itemCategoryMethods;

  const { getValues: unitsValues, handleSubmit: unitHandleSubmit } = unitMethods;

  const { data } = useGetItemCategoryListQuery({
    pagination: {
      ...getPaginationQuery(),
      first: 20,
      order: {
        arrange: 'ASC',
        column: 'ID',
      },
    },
  });

  const { mutateAsync: itemCategoryMutate } = useSetItemCategoryMutation();
  const { mutateAsync: unitMutate } = useSetUnitsMutation();

  const underItemGroup = data?.inventory?.itemsGroup?.list?.edges?.map((item) => ({
    value: item?.node?.id,
    label: item?.node?.name,
  })) as { value: string; label: string }[];

  const onOpenModal = () => {
    setOpenModal(true);
  };
  const onOpenModalUnits = () => {
    setOpenModalUnits(true);
  };
  const onCloseModal = () => {
    setOpenModal(false);
  };
  const onCloseModalUnits = () => {
    setOpenModalUnits(false);
  };
  const inventoryColumns = [
    {
      title: 'itemsList',
      link: '/inventory/items',
    },
    {
      title: 'itemsCategory',
      link: '/inventory/items/category',
      modalOpen: onOpenModal,
    },
    {
      title: 'itemUnits',
      link: '/inventory/items/units',
      modalOpen: onOpenModalUnits,
    },
  ];

  const onItemCategorySubmit = () => {
    itemCategoryMutate({ data: { ...itemCategoryValues() } }).then(() => {
      queryClient.invalidateQueries(['getItemCategoryList']);
      onCloseModal();
    });
  };

  const unitOnSubmit = () => {
    unitMutate({ data: { ...unitsValues() } }).then(() => {
      queryClient.invalidateQueries(['getUnitsList']);
      onCloseModalUnits();
    });
  };

  return (
    <>
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
              router.push('/inventory/items/add');
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
            leftIcon={<Icon as={AiOutlineSetting} size="md" color="primary.500" />}
          >
            {t['itemInventorySettings']}
          </Button>
        </Box>
        <Box width="calc(100% - 275px)" overflowX="hidden" position="relative" left="275px">
          <Box bg="white" minHeight="100vh">
            {children}
          </Box>
        </Box>
      </Box>
      <Modal isOpen={openModal} onClose={onCloseModal} isCentered trapFocus={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text fontSize="r2" color="neutralColorLight.Gray-80" fontWeight="SemiBold">
              {t['catgAddNewCatgModal']}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormProvider {...itemCategoryMethods}>
              <form onSubmit={itemCategoryHandleSubmit(onItemCategorySubmit)}>
                <Box display="flex" flexDirection="column" gap="s24">
                  <FormInput type="text" name="name" label={t['catgItemGroupName']} />
                  <FormSelect
                    name="parentCategory"
                    label={t['catgUnderItemGroup']}
                    __placeholder={t['catgSelectItemGroup']}
                    options={underItemGroup}
                  />
                  <FormInput type="text" name="description" label={t['catgDescription']} />
                  <Button w="-webkit-fit-content" type="submit" alignSelf="flex-end">
                    {t['catgAddItemGroup']}
                  </Button>
                </Box>
              </form>
            </FormProvider>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isOpen={openModalUnits} onClose={onCloseModalUnits} isCentered trapFocus={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text fontSize="r2" color="neutralColorLight.Gray-80" fontWeight="SemiBold">
              {t['itemUnitAddNewUnit']}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormProvider {...unitMethods}>
              <form onSubmit={unitHandleSubmit(unitOnSubmit)}>
                <Box display="flex" flexDirection="column" gap="s24">
                  <FormInput type="text" name="name" label={t['itemUnitFormName']} />
                  <FormInput type="text" name="shortName" label={t['itemUnitFormShortName']} />
                  <FormInput type="text" name="description" label={t['itemUnitFormDescription']} />
                  <FormSwitch name="acceptFraction" label={t['itemUnitFormAcceptsFraction']} />
                  <Button w="-webkit-fit-content" type="submit" alignSelf="flex-end">
                    Add Unit
                  </Button>
                </Box>
              </form>
            </FormProvider>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
