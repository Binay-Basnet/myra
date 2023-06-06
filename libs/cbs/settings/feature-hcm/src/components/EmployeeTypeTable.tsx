import { useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';

import { asyncToast, Box, Button, Column, Divider, Icon, Modal, Table, Text } from '@myra-ui';

import { useGetEmployeeTypeListQuery, useSetEmployeeTypeMutation } from '@coop/cbs/data-access';
import { SettingsCard } from '@coop/cbs/settings/ui-components';
import { FormInput } from '@coop/shared/form';
import { getPaginationQuery } from '@coop/shared/utils';

export const EmployeeTypeTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmpoymentTypeId, setSelectedEmpoymentTypeId] = useState('');

  const { data, refetch } = useGetEmployeeTypeListQuery({ pagination: getPaginationQuery() });
  const { mutateAsync, isLoading } = useSetEmployeeTypeMutation();

  const methods = useForm();
  const { getValues, handleSubmit } = methods;

  const rowData = useMemo(
    () => data?.settings?.general?.HCM?.employee?.listEmployeeType?.edges ?? [],
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
                setSelectedEmpoymentTypeId(props?.row?.original?.node?.id as string);
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
    setSelectedEmpoymentTypeId('');
  };

  const onSubmit = () => {
    if (selectedEmpoymentTypeId) {
      asyncToast({
        id: 'edit-EmpoymentType',
        msgs: {
          success: 'Empoyment Type edited succesfully',
          loading: 'Editing Empoyment Type',
        },
        onSuccess: () => {
          refetch();
          handleModalClose();
        },
        promise: mutateAsync({
          id: selectedEmpoymentTypeId,
          input: { name: getValues()?.name, description: getValues()?.description },
        }),
      });
    } else {
      asyncToast({
        id: 'new-EmpoymentType',
        msgs: {
          success: 'New Empoyment Type added succesfully',
          loading: 'Adding new Empoyment Type',
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
    <Box id="employee-type">
      <SettingsCard
        title="Employee Type"
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
            <Text fontSize="r1">Add Empoyment Type</Text>
          </Box>
        }
      >
        <Table isStatic data={rowData} columns={columns} />
      </SettingsCard>
      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        isCentered
        title="Empoyment Type"
        width="xl"
      >
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
    </Box>
  );
};

export default EmployeeTypeTable;
