import { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { omit } from 'lodash';

import {
  asyncToast,
  Box,
  Button,
  Column,
  Divider,
  Grid,
  GridItem,
  Icon,
  Modal,
  Table,
  Text,
} from '@myra-ui';

import {
  LeaveTypeEnum,
  LeaveTypeInput,
  useDeleteHcmEmployeeGeneralMutation,
  useGetEmployeeLeaveTypeListQuery,
  useGetLeaveTypeQuery,
  useSetEmployeeLeaveTypeMutation,
} from '@coop/cbs/data-access';
import { SettingsCard } from '@coop/cbs/settings/ui-components';
import { FormCheckbox, FormInput, FormSelect, FormTextArea } from '@coop/shared/form';
import { getPaginationQuery } from '@coop/shared/utils';

export const LeaveTypeTable = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedLeaveTypeId, setSelectedLeaveTypeId] = useState('');
  const methods = useForm();
  const { getValues, handleSubmit, watch, reset } = methods;

  const { data, refetch } = useGetEmployeeLeaveTypeListQuery({
    pagination: getPaginationQuery(),
  });
  const { mutateAsync, isLoading } = useSetEmployeeLeaveTypeMutation();
  const { mutateAsync: deleteMutateAsync } = useDeleteHcmEmployeeGeneralMutation();
  const { data: leaveData } = useGetLeaveTypeQuery(
    { id: selectedLeaveTypeId },
    { enabled: !!selectedLeaveTypeId }
  );

  const leaveDataEdit = leaveData?.settings?.general?.HCM?.employee?.leave?.getLeaveType?.record;

  useEffect(() => {
    reset(omit({ ...leaveDataEdit }, ['id']) as LeaveTypeInput);
  }, [leaveDataEdit]);

  const rowData = useMemo(
    () => data?.settings?.general?.HCM?.employee?.leave?.listLeaveType?.edges ?? [],
    [data]
  );
  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'S.N',
        accessorFn: (__, index) => index + 1,
      },
      {
        header: 'Name',
        accessorFn: (row) => row?.node?.name,
      },
      {
        header: 'Description',
        accessorFn: (row) => row?.node?.description,
      },
      {
        header: 'Actions',
        cell: (props) => (
          <Box display="flex" alignItems="center" gap="s24">
            <Box
              display="flex"
              alignItems="center"
              gap="s8"
              cursor="pointer"
              onClick={() => {
                setSelectedLeaveTypeId(props?.row?.original?.node?.id as string);
                setIsAddModalOpen(true);
              }}
            >
              <Icon as={BiEdit} />
              <Text>Edit</Text>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              color="red.500"
              gap="s8"
              cursor="pointer"
              onClick={() => {
                setSelectedLeaveTypeId(props?.row?.original?.node?.id as string);
                setIsDeleteModalOpen(true);
              }}
            >
              <Icon as={AiOutlineDelete} />
              <Text>Delete</Text>
            </Box>
          </Box>
        ),
      },
    ],
    []
  );

  const handleAddModalClose = () => {
    setIsAddModalOpen(false);
    setSelectedLeaveTypeId('');
    reset();
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setSelectedLeaveTypeId('');
  };

  const onSubmit = () => {
    if (selectedLeaveTypeId) {
      asyncToast({
        id: 'edit-leave-type',
        msgs: {
          success: 'LeaveType edited succesfully',
          loading: 'Editing leave type',
        },
        onSuccess: () => {
          refetch();
          handleAddModalClose();
        },
        promise: mutateAsync({
          id: selectedLeaveTypeId,
          input: getValues(),
        }),
      });
    } else {
      asyncToast({
        id: 'new-leave-type',
        msgs: {
          success: 'New Leave Type added succesfully',
          loading: 'Adding new leave type',
        },
        onSuccess: () => {
          refetch();
          handleAddModalClose();
        },
        promise: mutateAsync({
          id: null,
          input: getValues(),
        }),
      });
    }
  };

  const onDelete = () => {
    asyncToast({
      id: 'delete-leave-type',
      msgs: {
        success: 'Leave Type deleted successfully',
        loading: 'Deleting leave type',
      },
      onSuccess: () => {
        refetch();
        handleDeleteModalClose();
      },
      promise: deleteMutateAsync({ id: selectedLeaveTypeId }),
    });
  };

  const typeOptions = [
    { label: 'Paid', value: LeaveTypeEnum?.Paid },
    { label: 'Unpaid', value: LeaveTypeEnum?.Unpaid },
  ];

  const isPartiallyPaidWatch = watch('isPartiallyPaid');

  return (
    <Box id="leave-type">
      <SettingsCard
        title="Leave Types"
        subtitle="Extends Fields that can be added to forms for additional input Fields"
        headerButton={
          <Box
            display="flex"
            alignItems="center"
            gap="s4"
            color="green.500"
            cursor="pointer"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Icon size="sm" as={AiOutlinePlus} />
            <Text fontSize="r1">Add Leave Type</Text>
          </Box>
        }
      >
        <Table isStatic data={rowData} columns={columns} />
      </SettingsCard>
      <Modal
        open={isAddModalOpen}
        onClose={handleAddModalClose}
        isCentered
        title={selectedLeaveTypeId ? 'Edit Leave Type' : 'New Leave Type'}
        width="5xl"
      >
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid templateColumns="repeat(3,1fr)" gap="s16">
              <GridItem colSpan={2}>
                <FormInput name="name" label="Name" />
              </GridItem>

              <FormSelect name="typeOfLeave" label="Type" options={typeOptions} />
              <GridItem colSpan={3}>
                <FormTextArea name="description" label="Description" />
              </GridItem>
              <FormInput
                type="number"
                name="applicableAfter"
                label="Applicable After(Working Days)"
              />
              <FormInput type="number" name="maximumLeaveAllowed" label="Maximum Leave Allowed" />
              <FormInput
                type="number"
                name="maximumContinuousDaysApplicable"
                label="Maximum Continuous Days Applicable"
              />
              <GridItem colSpan={3}>
                <Divider />
              </GridItem>
              <GridItem colSpan={3}>
                <Box display="flex" flexDir="column" gap="s16">
                  <Text fontSize="s3">Advance Setup</Text>
                  <FormCheckbox name="isCarriedForward" label="Is Carry Forward" />
                  <FormCheckbox name="isPartiallyPaid" label="Is Partially Paid Leave" />
                  {isPartiallyPaidWatch && (
                    <FormInput
                      name="fractionOfDailySalaryPerLeave"
                      label="Fraction of Daily Salary per Leave"
                      w="-webkit-fit-content"
                    />
                  )}
                  <FormCheckbox name="isOptionalLeave" label="Is Optional Leave" />
                  <FormCheckbox
                    name="includeHolidaysWithLeavesAsLeaves"
                    label="Include holidays within leaves as leaves"
                  />
                  <FormCheckbox name="isCompensatory" label="Is Compensatory" />
                  <Button
                    w="-webkit-fit-content"
                    alignSelf="flex-end"
                    type="submit"
                    isLoading={isLoading}
                  >
                    Save
                  </Button>
                </Box>
              </GridItem>
            </Grid>
          </form>
        </FormProvider>
      </Modal>
      <Modal open={isDeleteModalOpen} onClose={handleDeleteModalClose} isCentered width="lg">
        <Box display="flex" flexDir="column" p="s4" gap="s16">
          <Text fontSize="r2">Are you sure you want to delete this leave type ?</Text>
          <Button w="-webkit-fit-content" alignSelf="flex-end" onClick={onDelete}>
            Confirm
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default LeaveTypeTable;
