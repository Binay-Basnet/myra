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
  Icon,
  Modal,
  Table,
  Text,
  Tooltip,
} from '@myra-ui';

import {
  NewDepartment,
  useDeleteHcmEmployeeGeneralMutation,
  useGetDepartmentListQuery,
  useGetDepartmentQuery,
  useSetDepartmentMutation,
} from '@coop/cbs/data-access';
import { SettingsCard } from '@coop/cbs/settings/ui-components';
import { FormInput } from '@coop/shared/form';
import { getPaginationQuery } from '@coop/shared/utils';

export const Department = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState('');

  const { data, refetch } = useGetDepartmentListQuery({ pagination: getPaginationQuery() });
  const { mutateAsync, isLoading } = useSetDepartmentMutation();
  const { mutateAsync: deleteMutateAsync } = useDeleteHcmEmployeeGeneralMutation();

  const { data: departmentData } = useGetDepartmentQuery(
    { id: selectedDepartmentId },
    { enabled: !!selectedDepartmentId }
  );

  const departmentDataEdit =
    departmentData?.settings?.general?.HCM?.employee?.employee?.getDepartment?.record;

  useEffect(() => {
    reset(departmentDataEdit as NewDepartment);
  }, [departmentDataEdit]);

  const methods = useForm();
  const { getValues, reset } = methods;

  const rowData = useMemo(
    () => data?.settings?.general?.HCM?.employee?.employee?.listDepartment?.edges ?? [],
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
                setSelectedDepartmentId(props?.row?.original?.node?.id as string);
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
                setSelectedDepartmentId(props?.row?.original?.node?.id as string);
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
    setSelectedDepartmentId('');
    reset({ name: '', description: '' });
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setSelectedDepartmentId('');
    reset({ name: '', description: '' });
  };

  const onSubmit = () => {
    const values = getValues();
    if (selectedDepartmentId) {
      asyncToast({
        id: 'edit-department',
        msgs: {
          success: 'Department edited succesfully',
          loading: 'Editing department',
        },
        onSuccess: () => {
          refetch();
          handleAddModalClose();
        },
        promise: mutateAsync({
          id: selectedDepartmentId,
          input: values as NewDepartment,
        }),
      });
    } else {
      asyncToast({
        id: 'new-department',
        msgs: {
          success: 'New Department added succesfully',
          loading: 'Adding new department',
        },
        onSuccess: () => {
          refetch();
          handleAddModalClose();
        },
        promise: mutateAsync({
          id: null,
          input: values as NewDepartment,
        }),
      });
    }
  };

  const onDelete = () => {
    asyncToast({
      id: 'delete-department',
      msgs: {
        success: 'Department deleted successfully',
        loading: 'Deleting department',
      },
      onSuccess: () => {
        refetch();
        handleDeleteModalClose();
      },
      promise: deleteMutateAsync({ id: selectedDepartmentId }),
    });
  };

  return (
    <Box id="department">
      <SettingsCard
        title="Departments"
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
            <Text fontSize="r1">Add Department</Text>
          </Box>
        }
      >
        <Table isStatic data={rowData} columns={columns} />
      </SettingsCard>
      <Modal
        open={isAddModalOpen}
        onClose={handleAddModalClose}
        isCentered
        title="Department"
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
          <Text fontSize="r2">Are you sure you want to delete this department ?</Text>
          <Button w="-webkit-fit-content" alignSelf="flex-end" onClick={onDelete}>
            Confirm
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Department;
