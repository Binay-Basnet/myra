import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';

import { Box, Button, Column, Icon, Scrollable, Table, Text } from '@myra-ui';

import { useGetLoanProductProcessingChargesListQuery } from '@coop/cbs/data-access';
import { localizedDate } from '@coop/cbs/utils';

import { SideBar, UpdateChargesDetailModal, UpdateChargesModal } from '../components';

const LoanFeesAndChargesUpdatePage = () => {
  const router = useRouter();
  const [selectedChargeId, setSelectedChargeId] = useState('');

  const methods = useForm();

  const {
    isOpen: isUpdateChargeModalOpen,
    onClose: onUpdateChargeModalClose,
    onToggle: onUpdateChargeModalToggle,
  } = useDisclosure();

  const {
    isOpen: isUpdateOpenChargesDetailModalOpen,
    onClose: onUpdateOpenChargesDetailModalClose,
    onToggle: onUpdateOpenChargesDetailModalToggle,
  } = useDisclosure();

  const { data: loanProcessingChargesListData, isFetching } =
    useGetLoanProductProcessingChargesListQuery({
      productId: router?.query?.['id'] as string,
    });

  const loanProcessingChargesList = useMemo(
    () =>
      loanProcessingChargesListData?.settings?.general?.loanProducts?.listProcessingCharge?.data ??
      [],
    [loanProcessingChargesListData]
  );

  const columns = useMemo<Column<typeof loanProcessingChargesList[0]>[]>(
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
    onUpdateChargeModalClose();
  };

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
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Text fontSize="r1" fontWeight="medium">
              Loan Processing Charges
            </Text>
            <Button
              leftIcon={<Icon as={AiOutlinePlus} size="md" />}
              onClick={onUpdateChargeModalToggle}
            >
              Update Charges
            </Button>
          </Box>
          <Box bg="background.500" p="s16" mt="s16">
            <Table
              isStatic
              isLoading={isFetching}
              data={loanProcessingChargesList}
              columns={columns}
              rowOnClick={(row) => {
                setSelectedChargeId(row?.additionalData?.id as string);
                onUpdateOpenChargesDetailModalToggle();
              }}
            />
          </Box>
        </Box>
      </Scrollable>
      {!isFetching && (
        <UpdateChargesModal
          isOpen={isUpdateChargeModalOpen}
          onClose={handleUpdateOpenChargesModalClose}
          methods={methods}
        />
      )}

      <UpdateChargesDetailModal
        isOpen={isUpdateOpenChargesDetailModalOpen}
        onClose={onUpdateOpenChargesDetailModalClose}
        serviceId={selectedChargeId}
      />
    </Box>
  );
};

export default LoanFeesAndChargesUpdatePage;
