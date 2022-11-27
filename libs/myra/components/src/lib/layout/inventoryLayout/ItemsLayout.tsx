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

import { FormInput, FormSelect, FormSwitch } from '@coop/shared/form';
import { Box, Button, Divider, Icon, Text } from '@myra-ui';
import { useTranslation } from '@coop/shared/utils';

import { TabColumn } from '../../tab/TabforMemberPage';

interface IInventoryPageLayoutProps {
  children: React.ReactNode;
}

export const InventoryItemsLayout = ({ children }: IInventoryPageLayoutProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalUnits, setOpenModalUnits] = useState(false);

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

  const router = useRouter();
  const { t } = useTranslation();
  const methods = useForm();

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
            <FormProvider {...methods}>
              <form>
                <Box display="flex" flexDirection="column" gap="s24">
                  <FormInput
                    type="text"
                    name="name"
                    label={t['catgItemGroupName']}
                    __placeholder={t['catgItemGroupName']}
                  />
                  <FormSelect
                    name="group"
                    label={t['catgUnderItemGroup']}
                    __placeholder={t['catgSelectItemGroup']}
                    options={[
                      {
                        label: '1',
                        value: '1',
                      },
                      {
                        label: '2',
                        value: '2',
                      },
                      {
                        label: '3',
                        value: '3',
                      },
                    ]}
                  />
                  <FormInput
                    type="text"
                    name="name"
                    label={t['catgDescription']}
                    __placeholder={t['catgDescription']}
                  />
                </Box>
              </form>
            </FormProvider>
          </ModalBody>

          <ModalFooter>
            <Button>{t['catgAddItemGroup']}</Button>
          </ModalFooter>
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
            <FormProvider {...methods}>
              <form>
                <Box display="flex" flexDirection="column" gap="s24">
                  <FormInput
                    type="text"
                    name="name"
                    label={t['itemUnitFormName']}
                    __placeholder={t['itemUnitFormName']}
                  />
                  <FormInput
                    type="text"
                    name="shortName"
                    label={t['itemUnitFormShortName']}
                    __placeholder={t['itemUnitFormShortName']}
                  />
                  <FormInput
                    type="text"
                    name="description"
                    label={t['itemUnitFormDescription']}
                    __placeholder={t['itemUnitFormDescription']}
                  />
                  <FormSwitch name="acceptFraction" label={t['itemUnitFormAcceptsFraction']} />
                </Box>
              </form>
            </FormProvider>
          </ModalBody>

          <ModalFooter>
            <Button>{t['itemUnitFormAddUnitofMeasurement']}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
