import { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';

import { asyncToast, Box, Button, Column, Divider, Icon, Modal, Table, Text } from '@myra-ui';

import {
  NewDesignation,
  useDeleteHcmEmployeeGeneralMutation,
  useGetDesignationListQuery,
  useGetDesignationQuery,
  useSetDesignationMutation,
} from '@coop/cbs/data-access';
import { SettingsCard } from '@coop/cbs/settings/ui-components';
import { FormInput } from '@coop/shared/form';
import { getPaginationQuery } from '@coop/shared/utils';

export const DesignationsTable = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDesignationId, setSelectedDesignationId] = useState('');

  const { data, refetch } = useGetDesignationListQuery({ pagination: getPaginationQuery() });
  const { mutateAsync, isLoading } = useSetDesignationMutation();
  const { mutateAsync: deleteMutateAsync } = useDeleteHcmEmployeeGeneralMutation();

  const { data: designationData } = useGetDesignationQuery(
    { id: selectedDesignationId },
    { enabled: !!selectedDesignationId }
  );

  const designationDataEdit =
    designationData?.settings?.general?.HCM?.employee?.employee?.getDesignation?.record;

  useEffect(() => {
    reset(designationDataEdit as NewDesignation);
  }, [designationDataEdit]);

  const methods = useForm();
  const { getValues, reset } = methods;

  const rowData = useMemo(
    () => data?.settings?.general?.HCM?.employee?.employee?.listDesignation?.edges ?? [],
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
                setSelectedDesignationId(props?.row?.original?.node?.id as string);
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
                setSelectedDesignationId(props?.row?.original?.node?.id as string);
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
    setSelectedDesignationId('');
    reset({ name: '', description: '' });
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setSelectedDesignationId('');
    reset({ name: '', description: '' });
  };

  const onSubmit = () => {
    const values = getValues();
    if (selectedDesignationId) {
      asyncToast({
        id: 'edit-designation',
        msgs: {
          success: 'Designation edited succesfully',
          loading: 'Editing designation',
        },
        onSuccess: () => {
          refetch();
          handleAddModalClose();
        },
        promise: mutateAsync({
          id: selectedDesignationId,
          input: values as NewDesignation,
        }),
      });
    } else {
      asyncToast({
        id: 'new-designation',
        msgs: {
          success: 'New Designation added succesfully',
          loading: 'Adding new designation',
        },
        onSuccess: () => {
          refetch();
          handleAddModalClose();
        },
        promise: mutateAsync({
          id: null,
          input: values as NewDesignation,
        }),
      });
    }
  };

  const onDelete = () => {
    asyncToast({
      id: 'delete-designation',
      msgs: {
        success: 'Designation deleted successfully',
        loading: 'Deleting designation',
      },
      onSuccess: () => {
        refetch();
        handleDeleteModalClose();
      },
      promise: deleteMutateAsync({ id: selectedDesignationId }),
    });
  };

  return (
    <Box id="designation">
      <SettingsCard
        title="Designations"
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
            <Text fontSize="r1">Add Designation</Text>
          </Box>
        }
      >
        <Table isStatic data={rowData} columns={columns} />
      </SettingsCard>
      <Modal
        open={isAddModalOpen}
        onClose={handleAddModalClose}
        isCentered
        title="Designations"
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
          <Text fontSize="r2">Are you sure you want to delete this designation ?</Text>
          <Button w="-webkit-fit-content" alignSelf="flex-end" onClick={onDelete}>
            Confirm
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default DesignationsTable;
