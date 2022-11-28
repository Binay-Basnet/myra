import React, { useState } from 'react';
import { AiOutlineSetting } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { AddIcon } from '@chakra-ui/icons';

import { Box, Button, Divider, Icon, Input, Modal, Switch, Text } from '@myra-ui';

import { TabColumn } from '../../tab/TabforMemberPage';

interface IInventoryPageLayoutProps {
  children: React.ReactNode;
}

const inventoryColumns = [
  {
    title: 'inventoryUnitOfMeasure',
    link: '/inventory/units-of-measure',
  },
];

export const InventoryUnitsLayout = ({ children }: IInventoryPageLayoutProps) => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const onCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Box display="flex">
      <Box width="275px" p="s24" flexShrink={0} position="fixed">
        <Text fontSize="l1" fontWeight="600" color="gray.800">
          Units of Measurement
        </Text>
        <Divider my="s16" />
        <Button
          width="full"
          size="lg"
          justifyContent="start"
          leftIcon={<AddIcon h="11px" />}
          onClick={() => {
            // router.push(router.pathname + '/[action]');
            setOpenModal(true);
          }}
        >
          Add Item
        </Button>
        <Modal
          open={openModal}
          onClose={onCloseModal}
          isCentered
          title={
            <Text fontSize="r2" color="gray.800" fontWeight="SemiBold">
              Add New Unit of Measurement
            </Text>
          }
        >
          <Box display="flex" flexDirection="column" gap="s24" p="s16">
            <Box display="flex" flexDirection="column" gap="s4">
              <Text fontSize="r2" color="gray.800" fontWeight="500">
                Name
              </Text>
              <Input type="text" h="44px" w="100%" variant="outline" __placeholder="NIBL Bank" />
            </Box>
            <Box display="flex" flexDirection="column" gap="s4">
              <Text fontSize="r2" color="gray.800" fontWeight="500">
                Short Name
              </Text>
              <Input type="text" h="44px" w="100%" variant="outline" __placeholder="NIBL Bank" />
            </Box>
            <Box display="flex" flexDirection="column" gap="s4">
              <Text fontSize="r2" color="gray.800" fontWeight="500">
                Description
              </Text>
              <Input type="text" h="44px" w="100%" variant="outline" __placeholder="NIBL Bank" />
            </Box>
            <Box display="flex" flexDirection="row" gap="s16">
              <Switch />
              <Text fontSize="r1" color="gray.700" fontWeight="600">
                Accept fraction
              </Text>
            </Box>
          </Box>
          <Box p="s12">
            {' '}
            <Button size="lg">Add Unit of Measurement</Button>
          </Box>
        </Modal>
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
          Inventory Settings
        </Button>
      </Box>
      <Box width="calc(100% - 275px)" overflowX="hidden" position="relative" left="275px">
        <Box bg="white" minHeight="100vh">
          {children}
        </Box>
      </Box>
    </Box>
  );
};
