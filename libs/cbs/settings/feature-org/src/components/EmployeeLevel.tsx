import { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';

import { asyncToast, Box, Button, Column, Divider, Icon, Modal, Table, Text } from '@myra-ui';

import {
  NewEmployeeLevel,
  useDeleteHcmEmployeeGeneralMutation,
  useGetEmployeeLevelListQuery,
  useGetEmployeeLevelQuery,
  useSetEmployeeLevelMutation,
} from '@coop/cbs/data-access';
import { SettingsCard } from '@coop/cbs/settings/ui-components';
import { FormInput } from '@coop/shared/form';
import { getPaginationQuery } from '@coop/shared/utils';

export const EmployeeLevel = () => {
  const [isAddModal, setIsAddModal] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEmployeeLevelId, setSelectedEmployeeLevelId] = useState('');

  const { data, refetch } = useGetEmployeeLevelListQuery({ pagination: getPaginationQuery() });
  const { mutateAsync, isLoading } = useSetEmployeeLevelMutation();
  const { mutateAsync: deleteMutateAsync } = useDeleteHcmEmployeeGeneralMutation();

  const { data: employeeLevelData } = useGetEmployeeLevelQuery(
    { id: selectedEmployeeLevelId },
    { enabled: !!selectedEmployeeLevelId }
  );

  const employeeLevelDataEdit =
    employeeLevelData?.settings?.general?.HCM?.employee?.employee?.getEmployeeLevel?.record;

  useEffect(() => {
    reset(employeeLevelDataEdit as NewEmployeeLevel);
  }, [employeeLevelDataEdit]);

  const methods = useForm();
  const { getValues, reset } = methods;

  const rowData = useMemo(
    () => data?.settings?.general?.HCM?.employee?.employee?.listEmployeeLevel?.edges ?? [],
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
                setSelectedEmployeeLevelId(props?.row?.original?.node?.id as string);
                setIsAddModal(true);
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
                setSelectedEmployeeLevelId(props?.row?.original?.node?.id as string);
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
    setIsAddModal(false);
    setSelectedEmployeeLevelId('');
    reset({ name: '', description: '' });
  };
  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setSelectedEmployeeLevelId('');
    reset({ name: '', description: '' });
  };

  const onSubmit = () => {
    const values = getValues();
    if (selectedEmployeeLevelId) {
      asyncToast({
        id: 'edit-department',
        msgs: {
          success: 'Employee Level edited succesfully',
          loading: 'Editing Employee Level',
        },
        onSuccess: () => {
          refetch();
          handleAddModalClose();
        },
        promise: mutateAsync({
          id: selectedEmployeeLevelId,
          input: values as NewEmployeeLevel,
        }),
      });
    } else {
      asyncToast({
        id: 'new-department',
        msgs: {
          success: 'New EmployeeLevel added succesfully',
          loading: 'Adding new department',
        },
        onSuccess: () => {
          refetch();
          handleAddModalClose();
        },
        promise: mutateAsync({
          id: null,
          input: values as NewEmployeeLevel,
        }),
      });
    }
  };

  const onDelete = () => {
    asyncToast({
      id: 'delete-employee-level',
      msgs: {
        success: 'Employee level deleted successfully',
        loading: 'Deleting employee level',
      },
      onSuccess: () => {
        refetch();
        handleDeleteModalClose();
      },
      promise: deleteMutateAsync({ id: selectedEmployeeLevelId }),
    });
  };

  return (
    <Box id="employee-level">
      <SettingsCard
        title="Employee Level"
        subtitle="Extends Fields that can be added to forms for additional input Fields"
        headerButton={
          <Box
            display="flex"
            alignItems="center"
            gap="s4"
            color="green.500"
            cursor="pointer"
            onClick={() => setIsAddModal(true)}
          >
            <Icon size="sm" as={AiOutlinePlus} />
            <Text fontSize="r1">Add Employee Level</Text>
          </Box>
        }
      >
        <Table isStatic data={rowData} columns={columns} />
      </SettingsCard>
      <Modal
        open={isAddModal}
        onClose={handleAddModalClose}
        isCentered
        title="Employee Level"
        width="xl"
      >
        <FormProvider {...methods}>
          <Box display="flex" flexDir="column" gap="s16">
            <FormInput name="name" label="Name" />
            <FormInput name="description" label="Description" />
            <Divider />
            <Button
              w="-webkit-fit-content"
              alignSelf="flex-end"
              onClick={onSubmit}
              isLoading={isLoading}
            >
              Save
            </Button>
          </Box>
        </FormProvider>
      </Modal>
      <Modal open={isDeleteModalOpen} onClose={handleDeleteModalClose} isCentered width="lg">
        <Box display="flex" flexDir="column" p="s4" gap="s16">
          <Text fontSize="r2">Are you sure you want to delete this Employee level ?</Text>
          <Button w="-webkit-fit-content" alignSelf="flex-end" onClick={onDelete}>
            Confirm
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default EmployeeLevel;
