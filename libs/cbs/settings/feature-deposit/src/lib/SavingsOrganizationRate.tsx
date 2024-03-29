import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiOutlineRefresh } from 'react-icons/hi';
import { useDisclosure } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';

import { asyncToast, Box, Button, Icon, Text } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import {
  InterestRateSetupInput,
  useEditSavingsOrganizationRateMutation,
  useGetEndOfDayDateDataQuery,
  useGetSavingsOrganizationRateDetailQuery,
  useGetSavingsOrganizationRateListQuery,
  useSetSavingsOrganizationRateMutation,
} from '@coop/cbs/data-access';
import { InterestRateDetailModal, UpdateRateModal } from '@coop/cbs/settings/ui-components';
import { CustomInterestRateSetupInput, localizedDate } from '@coop/cbs/utils';

/* eslint-disable-next-line */
export interface SavingsOrganizationRateProps {}

export const SavingsOrganizationRate = () => {
  const queryClient = useQueryClient();
  const [isConfirmationModalOpen, setIsConfirmatioModalOpen] = useState(false);

  const [selectedRateId, setSelectedRateId] = useState('');

  const {
    isOpen: isUpdateModalOpen,
    onClose: onUpdateModalClose,
    onToggle: onUpdateModalToggle,
  } = useDisclosure();

  const {
    isOpen: isDetailModalOpen,
    onClose: onDetailModalClose,
    onToggle: onDetailModalToggle,
  } = useDisclosure();

  const { data: organizationRateDetailData, isFetching: isRateDetailFetching } =
    useGetSavingsOrganizationRateDetailQuery(
      {
        id: selectedRateId,
      },
      { enabled: !!selectedRateId }
    );

  const { data: organizationRateListData, isFetching } = useGetSavingsOrganizationRateListQuery();

  const organizationRateList =
    organizationRateListData?.settings?.general?.deposit?.listOrganizationRate?.data?.map(
      (rate, index) => ({ index: index + 1, ...rate })
    ) ?? [];

  const { data: endOfDayData } = useGetEndOfDayDateDataQuery();

  const closingDate = useMemo(() => endOfDayData?.transaction?.endOfDayDate?.value, [endOfDayData]);

  const methods = useForm<CustomInterestRateSetupInput>();

  const { mutateAsync: setOrganizationRate } = useSetSavingsOrganizationRateMutation();

  const handleSaveInterestRate = () => {
    asyncToast({
      id: 'settings-savings-organization-rate-add',
      msgs: {
        loading: 'Updating Interest Rate',
        success: 'Interest Rate Updated',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['getSavingsOrganizationRateList']);
        handleUpdateModalClose();
        handleConfirmationModalClose();
      },
      promise: setOrganizationRate({
        data: { ...methods.getValues() } as InterestRateSetupInput,
      }),
    });
  };

  const { mutateAsync: editOrganizationRate } = useEditSavingsOrganizationRateMutation();

  const handleEditInterestRate = () => {
    asyncToast({
      id: 'settings-savings-organization-rate-edit',
      msgs: {
        loading: 'Updating Interest Rate',
        success: 'Interest Rate Updated',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['getSavingsOrganizationRateList']);
        handleUpdateModalClose();
        handleConfirmationModalClose();
      },
      promise: editOrganizationRate({
        id: selectedRateId,
        data: { ...methods.getValues() } as InterestRateSetupInput,
      }),
    });
  };

  const columns = useMemo<Column<typeof organizationRateList[0]>[]>(
    () => [
      {
        header: 'S.N.',
        accessorKey: 'index',
        meta: {
          width: '5%',
        },
      },
      {
        header: 'Effective Date',
        accessorKey: 'effectiveDate',
        cell: (props) => localizedDate(props?.row?.original?.effectiveDate),
      },
      {
        header: 'Interest Rate',
        accessorKey: 'rate',
        cell: (props) => (
          <Box display="flex" gap="s4">
            {props?.row?.original?.rate}
            <Text fontWeight="Medium" fontSize="r1" color="primary.500">
              %
            </Text>
          </Box>
        ),
      },
      {
        id: '_actions',
        header: '',
        cell: (props) =>
          closingDate &&
          props?.row?.original?.effectiveDate &&
          (localizedDate(closingDate) as string) <
            (localizedDate(props?.row?.original?.effectiveDate) as string) ? (
            <Button
              variant="ghost"
              onClick={(e) => {
                setSelectedRateId(props?.row?.original?.id as string);
                onUpdateModalToggle();
                e.stopPropagation();
              }}
            >
              Edit
            </Button>
          ) : (
            <Button
              variant="ghost"
              onClick={() => {
                setSelectedRateId(props?.row?.original?.id as string);
                onDetailModalToggle();
              }}
            >
              View
            </Button>
          ),
        meta: {
          width: '3.125rem',
        },
      },
    ],
    [closingDate]
  );

  const handleUpdateModalClose = () => {
    methods.reset({ rate: null, effectiveDate: null, fileUploads: [], note: '' });

    setSelectedRateId('');
    onUpdateModalClose();
    handleConfirmationModalClose();
  };

  const handleConfirmationModalClose = () => {
    setIsConfirmatioModalOpen(false);
  };

  return (
    <>
      <Box pb="s20" width="full" display="flex" flexDirection="column">
        <Box display="flex" flexDirection="row" h="fit-content">
          <Box p="s16" flex={1}>
            <Box
              borderBottom="1px"
              borderBottomColor="border.layout"
              py="s8"
              w="100%"
              display="flex"
              justifyContent="space-between"
            >
              <Box>
                <Text variant="pageHeader" color="gray.800">
                  Organization Rate
                </Text>
                <Text variant="formLabel" color="gray.700">
                  Base interest rate for organization.
                </Text>
              </Box>

              {organizationRateList?.length ? (
                <Button leftIcon={<Icon as={HiOutlineRefresh} />} onClick={onUpdateModalToggle}>
                  Update Rate
                </Button>
              ) : null}
            </Box>
            <Box mt="s12">
              <Box border="1px" borderColor="border.layout" w="100%" height="30rem">
                <Table
                  data={organizationRateList}
                  isStatic
                  isLoading={isFetching}
                  columns={columns}
                  noDataTitle="Interest"
                  forms={[
                    {
                      label: 'Add Interest Rate',
                      aclKey: 'SETTINGS_GENERAL',
                      onClick: () => onUpdateModalToggle(),
                    },
                  ]}
                  menu="SETTINGS_SAVINGS_ORGANIZATION_RATE"
                  rowOnClick={(row) => {
                    setSelectedRateId(row?.id as string);
                    onDetailModalToggle();
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      {!isRateDetailFetching && (
        <UpdateRateModal
          isOpen={isUpdateModalOpen}
          onClose={handleUpdateModalClose}
          onSave={handleSaveInterestRate}
          onEdit={handleEditInterestRate}
          isConfirmationModalOpen={isConfirmationModalOpen}
          setIsConfirmationModalOpen={setIsConfirmatioModalOpen}
          handleConfirmationModalClose={handleConfirmationModalClose}
          type="saving"
          methods={methods}
          rate={
            selectedRateId
              ? organizationRateDetailData?.settings?.general?.deposit?.getOrganizationRate?.data
              : null
          }
          rateLabel="Organization Rate"
        />
      )}

      <InterestRateDetailModal
        isOpen={isDetailModalOpen}
        onClose={onDetailModalClose}
        rate={organizationRateDetailData?.settings?.general?.deposit?.getOrganizationRate?.data}
        rateLabel="New Organization Rate"
      />
    </>
  );
};

export default SavingsOrganizationRate;
