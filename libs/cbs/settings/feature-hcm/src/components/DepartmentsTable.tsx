import { useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';

import { asyncToast, Box, Button, Column, Divider, Icon, Modal, Table, Text } from '@myra-ui';

import { useGetDepartmentListQuery, useSetDepartmentMutation } from '@coop/cbs/data-access';
import { SettingsCard } from '@coop/cbs/settings/ui-components';
import { FormInput } from '@coop/shared/form';
import { getPaginationQuery } from '@coop/shared/utils';

export const DepartmentsTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState('');

  const { data, refetch } = useGetDepartmentListQuery({ pagination: getPaginationQuery() });
  const { mutateAsync, isLoading } = useSetDepartmentMutation();

  const methods = useForm();
  const { getValues, handleSubmit } = methods;

  const rowData = useMemo(
    () => data?.settings?.general?.HCM?.employee?.listDepartment?.edges ?? [],
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
                setSelectedDepartmentId(props?.row?.original?.node?.id as string);
                setIsModalOpen(true);
              }}
            >
              <Icon as={BiEdit} />
              <Text>Edit</Text>
            </Box>
            <Box display="flex" alignItems="center" color="red.500" gap="s8" cursor="pointer">
              <Icon as={AiOutlineDelete} />
              <Text>Delete</Text>
            </Box>
          </Box>
        ),
      },
    ],
    []
  );

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedDepartmentId('');
  };

  const onSubmit = () => {
    if (selectedDepartmentId) {
      asyncToast({
        id: 'edit-department',
        msgs: {
          success: 'Department edited succesfully',
          loading: 'Editing department',
        },
        onSuccess: () => {
          refetch();
          handleModalClose();
        },
        promise: mutateAsync({
          id: selectedDepartmentId,
          input: { name: getValues()?.name, description: getValues()?.description },
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
          handleModalClose();
        },
        promise: mutateAsync({
          id: null,
          input: { name: getValues()?.name, description: getValues()?.description },
        }),
      });
    }
  };
  return (
    <>
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
            onClick={() => setIsModalOpen(true)}
          >
            <Icon size="sm" as={AiOutlinePlus} />
            <Text fontSize="r1">Add Department</Text>
          </Box>
        }
      >
        <Table isStatic data={rowData} columns={columns} />
      </SettingsCard>
      <Modal open={isModalOpen} onClose={handleModalClose} isCentered title="Department" width="xl">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box display="flex" flexDir="column" gap="s16">
              <FormInput name="name" label="Name" />
              <FormInput name="description" label="Description" />
              <Divider />
              <Button
                w="-webkit-fit-content"
                alignSelf="flex-end"
                type="submit"
                isLoading={isLoading}
              >
                Save
              </Button>
            </Box>
          </form>
        </FormProvider>
      </Modal>
    </>
  );
};

export default DepartmentsTable;
