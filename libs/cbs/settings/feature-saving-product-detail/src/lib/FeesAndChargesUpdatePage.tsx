import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';

import { Box, Button, Column, Icon, Scrollable, Table, Text } from '@myra-ui';

import { useGetCloseChargeListQuery, useGetOpenChargeListQuery } from '@coop/cbs/data-access';
import {
  UpdateCloseChargeDetailModal,
  UpdateCloseChargesModal,
  UpdateOpenChargeDetailModal,
  UpdateOpenChargesModal,
} from '@coop/cbs/settings/ui-components';
import { localizedDate } from '@coop/cbs/utils';

import { SideBar } from '../components';

const FeesAndChargesUpdatePage = () => {
  const router = useRouter();
  const [selectedOpenServiceChargeId, setSelectedOpenServiceChargeId] = useState('');
  const [selectedCloseServiceChargeId, setSelectedCloseServiceChargeId] = useState('');

  const openChargesMethods = useForm();
  const closeChargesMethods = useForm();

  const {
    isOpen: isUpdateOpenChargesModalOpen,
    onClose: onUpdateOpenChargesModalClose,
    onToggle: onUpdateOpenChargesModalToggle,
  } = useDisclosure();

  const {
    isOpen: isUpdateCloseChargesModalOpen,
    onClose: onUpdateCloseChargesModalClose,
    onToggle: onUpdateCloseChargesModalToggle,
  } = useDisclosure();

  const {
    isOpen: isUpdateOpenChargesDetailModalOpen,
    onClose: onUpdateOpenChargesDetailModalClose,
    onToggle: onUpdateOpenChargesDetailModalToggle,
  } = useDisclosure();

  const {
    isOpen: isUpdateCloseChargesDetailModalOpen,
    onClose: onUpdateCloseChargesDetailModalClose,
    onToggle: onUpdateCloseChargesDetailModalToggle,
  } = useDisclosure();

  const { data: openServiceChargeData, isFetching: openServiceChargeFetching } =
    useGetOpenChargeListQuery({
      productId: router?.query?.['id'] as string,
    });

  const openServiceRowData = useMemo(
    () => openServiceChargeData?.settings?.general?.depositProduct?.listOpenCharge?.data ?? [],
    [openServiceChargeData]
  );

  const openServiceColumns = useMemo<Column<typeof openServiceRowData[0]>[]>(
    () => [
      {
        header: 'Created Date',
        accessorFn: (row) => localizedDate(row?.additionalData?.createdAt),
      },
      {
        header: 'Effective Date',
        accessorFn: (row) => localizedDate(row?.additionalData?.effectiveDate),
      },
    ],
    []
  );

  const { data: closeServiceChargeData, isFetching: closeServiceChargeFetching } =
    useGetCloseChargeListQuery({
      productId: router?.query?.['id'] as string,
    });

  const closeServiceRowData = useMemo(
    () => closeServiceChargeData?.settings?.general?.depositProduct?.listCloseCharge?.data ?? [],
    [closeServiceChargeData]
  );

  const closeServiceColumns = useMemo<Column<typeof openServiceRowData[0]>[]>(
    () => [
      {
        header: 'Created Date',
        accessorFn: (row) => localizedDate(row?.additionalData?.createdAt),
      },
      {
        header: 'Effective Date',
        accessorFn: (row) => localizedDate(row?.additionalData?.effectiveDate),
      },
    ],
    []
  );

  const handleUpdateOpenChargesModalClose = () => {
    onUpdateOpenChargesModalClose();
  };

  const handleUpdateCloseChargesModalClose = () => {
    onUpdateCloseChargesModalClose();
  };
  // const handleSaveOpenCharge = () => {};

  return (
    <Box display="flex">
      <Box
        bg="gray.0"
        w="320px"
        position="fixed"
        h="calc(100vh - 110px)"
        borderRight="1px"
        borderRightColor="border.layout"
      >
        <SideBar />
      </Box>
      <Scrollable detailPage>
        <Box bg="background.500" ml="320px" p="s16" display="flex" flexDir="column" gap="s16">
          <Box display="flex" flexDir="column" bg="white" p="s16" borderRadius={10}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Text fontSize="r1" fontWeight="medium">
                Account Open Service Charges
              </Text>
              <Button
                leftIcon={<Icon as={AiOutlinePlus} size="md" />}
                onClick={onUpdateOpenChargesModalToggle}
              >
                Update Charges
              </Button>
            </Box>
            <Box bg="background.500" p="s16" mt="s16">
              <Table
                isStatic
                isLoading={openServiceChargeFetching}
                data={openServiceRowData}
                columns={openServiceColumns}
                rowOnClick={(row) => {
                  setSelectedOpenServiceChargeId(row?.additionalData?.id as string);
                  onUpdateOpenChargesDetailModalToggle();
                }}
              />
            </Box>
          </Box>
        </Box>
        <Box bg="background.500" ml="320px" p="s16" display="flex" flexDir="column" gap="s16">
          <Box display="flex" flexDir="column" bg="white" p="s16" borderRadius={10}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Text fontSize="r1" fontWeight="medium">
                Account Close Service Charges
              </Text>
              <Button
                leftIcon={<Icon as={AiOutlinePlus} size="md" />}
                onClick={onUpdateCloseChargesModalToggle}
              >
                Update Charges
              </Button>
            </Box>
            <Box bg="background.500" p="s16" mt="s16">
              <Table
                isStatic
                isLoading={closeServiceChargeFetching}
                data={closeServiceRowData}
                columns={closeServiceColumns}
                rowOnClick={(row) => {
                  setSelectedCloseServiceChargeId(row?.additionalData?.id as string);
                  onUpdateCloseChargesDetailModalToggle();
                }}
              />
            </Box>
          </Box>
        </Box>
      </Scrollable>
      {!openServiceChargeFetching && (
        <UpdateOpenChargesModal
          isOpen={isUpdateOpenChargesModalOpen}
          onClose={handleUpdateOpenChargesModalClose}
          methods={openChargesMethods}
        />
      )}
      {!closeServiceChargeFetching && (
        <UpdateCloseChargesModal
          isOpen={isUpdateCloseChargesModalOpen}
          onClose={handleUpdateCloseChargesModalClose}
          methods={closeChargesMethods}
        />
      )}
      <UpdateOpenChargeDetailModal
        isOpen={isUpdateOpenChargesDetailModalOpen}
        onClose={onUpdateOpenChargesDetailModalClose}
        serviceId={selectedOpenServiceChargeId}
      />
      <UpdateCloseChargeDetailModal
        isOpen={isUpdateCloseChargesDetailModalOpen}
        onClose={onUpdateCloseChargesDetailModalClose}
        serviceId={selectedCloseServiceChargeId}
      />
    </Box>
  );
};

export default FeesAndChargesUpdatePage;
