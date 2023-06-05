import { useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';

import { asyncToast, Box, Button, Column, Divider, Icon, Modal, Table, Text } from '@myra-ui';

import {
  useGetEmployeeHealthInsuranceListQuery,
  useSetEmployeeHealthInsuranceMutation,
} from '@coop/cbs/data-access';
import { SettingsCard } from '@coop/cbs/settings/ui-components';
import { FormInput } from '@coop/shared/form';
import { getPaginationQuery } from '@coop/shared/utils';

export const EmployeeHealthInsuranceTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmpoyeeHealthInsuranceId, setSelectedEmpoyeeHealthInsuranceId] = useState('');

  const { data, refetch } = useGetEmployeeHealthInsuranceListQuery({
    pagination: getPaginationQuery(),
  });
  const { mutateAsync, isLoading } = useSetEmployeeHealthInsuranceMutation();

  const methods = useForm();
  const { getValues, handleSubmit } = methods;

  const rowData = useMemo(
    () => data?.settings?.general?.HCM?.employee?.listEmployeeHealthInsurance?.edges ?? [],
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
    setSelectedEmpoyeeHealthInsuranceId('');
  };

  const onSubmit = () => {
    if (selectedEmpoyeeHealthInsuranceId) {
      asyncToast({
        id: 'edit-EmpoyeeHealthInsurance',
        msgs: {
          success: 'Empoyee Health Insurance edited succesfully',
          loading: 'Editing Empoyee Health Insurance',
        },
        onSuccess: () => {
          refetch();
          handleModalClose();
        },
        promise: mutateAsync({
          id: selectedEmpoyeeHealthInsuranceId,
          input: {
            healthInsuranceProvider: getValues()?.healthInsuranceProvider,
            healthInsuranceNumber: getValues()?.healthInsuranceNumber,
          },
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
          handleModalClose();
        },
        promise: mutateAsync({
          id: null,
          input: {
            healthInsuranceProvider: getValues()?.healthInsuranceProvider,
            healthInsuranceNumber: getValues()?.healthInsuranceNumber,
          },
        }),
      });
    }
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
            onClick={() => setIsModalOpen(true)}
          >
            <Icon size="sm" as={AiOutlinePlus} />
            <Text fontSize="r1">Add Empoyee Health Insurance</Text>
          </Box>
        }
      >
        <Table isStatic data={rowData} columns={columns} />
      </SettingsCard>
      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
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
    </Box>
  );
};

export default EmployeeHealthInsuranceTable;
