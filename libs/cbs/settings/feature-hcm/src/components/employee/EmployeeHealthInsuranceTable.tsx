import { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';

import { asyncToast, Box, Button, Column, Divider, Icon, Modal, Table, Text } from '@myra-ui';

import {
  NewEmployeeHealthInsurance,
  useDeleteHcmEmployeeGeneralMutation,
  useGetEmployeeHealthInsuranceListQuery,
  useGetHealthInsuranceQuery,
  useSetEmployeeHealthInsuranceMutation,
} from '@coop/cbs/data-access';
import { SettingsCard } from '@coop/cbs/settings/ui-components';
import { FormInput } from '@coop/shared/form';
import { getPaginationQuery } from '@coop/shared/utils';

export const EmployeeHealthInsuranceTable = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEmpoyeeHealthInsuranceId, setSelectedEmpoyeeHealthInsuranceId] = useState('');

  const { data, refetch } = useGetEmployeeHealthInsuranceListQuery({
    pagination: getPaginationQuery(),
  });
  const { mutateAsync, isLoading } = useSetEmployeeHealthInsuranceMutation();
  const { mutateAsync: deleteMutateAsync } = useDeleteHcmEmployeeGeneralMutation();

  const { data: healthInsuranceData } = useGetHealthInsuranceQuery(
    { id: selectedEmpoyeeHealthInsuranceId },
    { enabled: !!selectedEmpoyeeHealthInsuranceId }
  );

  const healthInsuranceDataEdit =
    healthInsuranceData?.settings?.general?.HCM?.employee?.employee?.getHealthInsurance?.record;

  useEffect(() => {
    reset(healthInsuranceDataEdit as NewEmployeeHealthInsurance);
  }, [healthInsuranceDataEdit]);

  const methods = useForm();
  const { getValues, handleSubmit, reset } = methods;

  const rowData = useMemo(
    () =>
      data?.settings?.general?.HCM?.employee?.employee?.listEmployeeHealthInsurance?.edges ?? [],
    [data]
  );
  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'S.N',
        accessorFn: (__, index) => index + 1,
      },
      {
        header: 'Health Insurance Provider',
        accessorFn: (row) => row?.node?.healthInsuranceProvider,
      },
      {
        header: 'Health Insurance Number',
        accessorFn: (row) => row?.node?.healthInsuranceNumber,
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
                setSelectedEmpoyeeHealthInsuranceId(props?.row?.original?.node?.id as string);
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
                setSelectedEmpoyeeHealthInsuranceId(props?.row?.original?.node?.id as string);
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
    setSelectedEmpoyeeHealthInsuranceId('');
    reset({ healthInsuranceProvider: '', healthInsuranceNumber: '' });
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setSelectedEmpoyeeHealthInsuranceId('');
    reset({ healthInsuranceProvider: '', healthInsuranceNumber: '' });
  };

  const onSubmit = () => {
    const values = getValues();
    if (selectedEmpoyeeHealthInsuranceId) {
      asyncToast({
        id: 'edit-EmpoyeeHealthInsurance',
        msgs: {
          success: 'Empoyee Health Insurance edited succesfully',
          loading: 'Editing Empoyee Health Insurance',
        },
        onSuccess: () => {
          refetch();
          handleAddModalClose();
        },
        promise: mutateAsync({
          id: selectedEmpoyeeHealthInsuranceId,
          input: values as NewEmployeeHealthInsurance,
        }),
      });
    } else {
      asyncToast({
        id: 'new-EmpoyeeHealthInsurance',
        msgs: {
          success: 'New EmpoyeeHealthInsurance added succesfully',
          loading: 'Adding new EmpoyeeHealthInsurance',
        },
        onSuccess: () => {
          refetch();
          handleAddModalClose();
        },
        promise: mutateAsync({
          id: null,
          input: values as NewEmployeeHealthInsurance,
        }),
      });
    }
  };

  const onDelete = () => {
    asyncToast({
      id: 'delete-employee-health-insurance',
      msgs: {
        success: 'Employee health insurance deleted successfully',
        loading: 'Deleting employee health insurance',
      },
      onSuccess: () => {
        refetch();
        handleDeleteModalClose();
      },
      promise: deleteMutateAsync({ id: selectedEmpoyeeHealthInsuranceId }),
    });
  };

  return (
    <Box id="employee-health-insurance">
      <SettingsCard
        title="Employee Health Insurance"
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
            <Text fontSize="r1">Add Empoyee Health Insurance</Text>
          </Box>
        }
      >
        <Table isStatic data={rowData} columns={columns} />
      </SettingsCard>
      <Modal
        open={isAddModalOpen}
        onClose={handleAddModalClose}
        isCentered
        title="Empoyee Health Insurance"
        width="xl"
      >
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box display="flex" flexDir="column" gap="s16">
              <FormInput name="healthInsuranceProvider" label="Health Insurance Provider" />
              <FormInput name="healthInsuranceNumber" label="Health Insurance Number" />
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
      <Modal open={isDeleteModalOpen} onClose={handleDeleteModalClose} isCentered width="lg">
        <Box display="flex" flexDir="column" p="s4" gap="s16">
          <Text fontSize="r2">Are you sure you want to delete this health insurance ?</Text>
          <Button w="-webkit-fit-content" alignSelf="flex-end" onClick={onDelete}>
            Confirm
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default EmployeeHealthInsuranceTable;
