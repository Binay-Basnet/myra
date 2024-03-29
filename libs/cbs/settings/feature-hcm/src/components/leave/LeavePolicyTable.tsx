import { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';

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
  Tooltip,
} from '@myra-ui';

import {
  LeavePolicyInput,
  useDeleteLeavePolicyMutation,
  useGetEmployeeLeavePolicyListQuery,
  useGetEmployeeLeaveTypeListQuery,
  useGetEmployeeLevelListQuery,
  useGetLeavePolicyQuery,
  useSetEmployeeLeavePolicyMutation,
} from '@coop/cbs/data-access';
import { SettingsCard } from '@coop/cbs/settings/ui-components';
import {
  FormDatePicker,
  FormEditableTable,
  FormInput,
  FormSelect,
  FormTextArea,
} from '@coop/shared/form';
import { getPaginationQuery } from '@coop/shared/utils';

type LeavePolicyType = {
  leaveTypeId: string;
  annualAllocation: number;
};

const defaultFormValue = {
  name: '',
  description: '',
  employeeLevelId: '',
  effectiveFrom: null,
  leavePolicyDetails: [],
};

export const LeavePolicyTable = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedLeavePolicyId, setSelectedLeavePolicyId] = useState('');

  const methods = useForm<LeavePolicyInput>({
    defaultValues: defaultFormValue,
  });
  const { getValues, reset } = methods;

  const { data, refetch } = useGetEmployeeLeavePolicyListQuery({
    pagination: getPaginationQuery(),
  });
  const { mutateAsync, isLoading } = useSetEmployeeLeavePolicyMutation();
  const { mutateAsync: deleteMutateAsync } = useDeleteLeavePolicyMutation();
  const { data: leavePolicyData } = useGetLeavePolicyQuery(
    { id: selectedLeavePolicyId },
    { enabled: !!selectedLeavePolicyId }
  );

  const leavePolicyDataEdit =
    leavePolicyData?.settings?.general?.HCM?.employee?.leavePolicy?.getLeavePolicy?.record;

  useEffect(() => {
    reset(leavePolicyDataEdit as LeavePolicyInput);
  }, [leavePolicyDataEdit]);

  const { data: employeeLevelData } = useGetEmployeeLevelListQuery({
    pagination: {
      ...getPaginationQuery(),
      first: -1,
      order: {
        arrange: 'ASC',
        column: 'ID',
      },
    },
  });

  const { data: leaveTypeData } = useGetEmployeeLeaveTypeListQuery({
    pagination: {
      ...getPaginationQuery(),
      first: -1,
      order: {
        arrange: 'ASC',
        column: 'ID',
      },
    },
  });

  const employeeLevelOptions =
    employeeLevelData?.settings?.general?.HCM?.employee?.employee?.listEmployeeLevel?.edges?.map(
      (item) => ({
        label: item?.node?.name as string,
        value: item?.node?.id as string,
      })
    );

  const leaveTypeOptions =
    leaveTypeData?.settings?.general?.HCM?.employee?.leave?.listLeaveType?.edges?.map((item) => ({
      label: item?.node?.name as string,
      value: item?.node?.id as string,
    }));

  const rowData = useMemo(
    () => data?.settings?.general?.HCM?.employee?.leavePolicy?.listLeavePolicy?.edges ?? [],
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
        cell: (row) => (
          <Tooltip title={row?.row?.original?.node?.description as string}>
            <Text overflow="hidden" textOverflow="ellipsis" maxWidth="xs" cursor="pointer">
              {row?.row?.original?.node?.description}
            </Text>
          </Tooltip>
        ),
        meta: {
          width: '40%',
        },
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
                setSelectedLeavePolicyId(props?.row?.original?.node?.id as string);
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
                setSelectedLeavePolicyId(props?.row?.original?.node?.id as string);
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
    setSelectedLeavePolicyId('');
    reset(defaultFormValue);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setSelectedLeavePolicyId('');
    reset(defaultFormValue);
  };

  const onSubmit = () => {
    if (selectedLeavePolicyId) {
      asyncToast({
        id: 'edit-leave-policy',
        msgs: {
          success: 'Leave Policy edited succesfully',
          loading: 'Editing leave policy',
        },
        onSuccess: () => {
          refetch();
          handleAddModalClose();
        },
        promise: mutateAsync({
          id: selectedLeavePolicyId,
          input: getValues(),
        }),
        onError: (error) => {
          if (error.__typename === 'ValidationError') {
            Object.keys(error.validationErrorMsg).map((key) =>
              methods.setError(key as keyof LeavePolicyInput, {
                message: error.validationErrorMsg[key][0] as string,
              })
            );
          }
        },
      });
    } else {
      asyncToast({
        id: 'new-leave-policy',
        msgs: {
          success: 'New Leave Policy added succesfully',
          loading: 'Adding new leave policy',
        },
        onSuccess: () => {
          refetch();
          handleAddModalClose();
        },
        promise: mutateAsync({
          id: null,
          input: getValues(),
        }),
        onError: (error) => {
          if (error.__typename === 'ValidationError') {
            Object.keys(error.validationErrorMsg).map((key) =>
              methods.setError(key as keyof LeavePolicyInput, {
                message: error.validationErrorMsg[key][0] as string,
              })
            );
          }
        },
      });
    }
  };

  const onDelete = () => {
    asyncToast({
      id: 'delete-department',
      msgs: {
        success: 'Leave policy deleted successfully',
        loading: 'Deleting leave policy',
      },
      onSuccess: () => {
        refetch();
        handleDeleteModalClose();
      },
      promise: deleteMutateAsync({ id: selectedLeavePolicyId }),
    });
  };

  return (
    <Box id="leave-policy">
      <SettingsCard
        title="Leave Policy"
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
            <Text fontSize="r1">Add Leave Policy</Text>
          </Box>
        }
      >
        <Table isStatic data={rowData} columns={columns} />
      </SettingsCard>
      <Modal
        open={isAddModalOpen}
        onClose={handleAddModalClose}
        isCentered
        title={selectedLeavePolicyId ? ' Edit leave policy' : 'Add leave policy'}
        width="5xl"
      >
        <FormProvider {...methods}>
          <Grid templateColumns="repeat(3,1fr)" gap="s16">
            <GridItem colSpan={2}>
              <FormInput name="name" label="Name" />
            </GridItem>
            <FormSelect
              name="employeeLevelId"
              label="Assign to Employee Level"
              options={employeeLevelOptions}
            />
            <GridItem colSpan={3}>
              <FormTextArea name="description" label="Description" />
            </GridItem>
            <FormDatePicker name="effectiveFrom" label="Effective From" />

            <GridItem colSpan={3}>
              <Divider />
            </GridItem>
            <GridItem colSpan={3}>
              <Box display="flex" flexDir="column" gap="s16">
                <Text fontSize="s3">Leave Policy Details</Text>

                <FormEditableTable<LeavePolicyType>
                  name="leavePolicyDetails"
                  columns={[
                    {
                      accessor: 'leaveTypeId',
                      header: 'Leave Type',
                      cellWidth: 'auto',
                      fieldType: 'select',
                      selectOptions: leaveTypeOptions,
                    },
                    {
                      accessor: 'annualAllocation',
                      header: 'Annual Allocation',
                    },
                  ]}
                />

                <Button
                  w="-webkit-fit-content"
                  alignSelf="flex-end"
                  onClick={onSubmit}
                  isLoading={isLoading}
                >
                  Save
                </Button>
              </Box>
            </GridItem>
          </Grid>
        </FormProvider>
      </Modal>
      <Modal open={isDeleteModalOpen} onClose={handleDeleteModalClose} isCentered width="lg">
        <Box display="flex" flexDir="column" p="s4" gap="s16">
          <Text fontSize="r2">Are you sure you want to delete this leave policy ?</Text>
          <Button w="-webkit-fit-content" alignSelf="flex-end" onClick={onDelete}>
            Confirm
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default LeavePolicyTable;
