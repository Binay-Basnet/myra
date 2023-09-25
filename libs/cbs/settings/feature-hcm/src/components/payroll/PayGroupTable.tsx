import { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { compact, isEmpty } from 'lodash';

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
  PaycycleEnum,
  PaygroupInput,
  useDeletePayGroupMutation,
  useGetEmployeeListQuery,
  useGetPayGroupListQuery,
  useSetPayGroupMutation,
} from '@coop/cbs/data-access';
import { SettingsCard } from '@coop/cbs/settings/ui-components';
import { FormEditableTable, FormInput, FormSelect } from '@coop/shared/form';
import { getPaginationQuery } from '@coop/shared/utils';

interface PayGroupType {
  name?: string;
  paycycle?: PaycycleEnum;
  employees?: {
    isChecked?: boolean;
    employeeName?: string | null;
    employeeId?: string | null;
    department?: string | null;
    designation?: string | null;
  }[];
}

export const PayGroupTable = () => {
  const [isAddModal, setIsAddModal] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPayGroupId, setselectedPayGroupId] = useState('');

  const { data, refetch } = useGetPayGroupListQuery({ pagination: getPaginationQuery() });
  const { data: getEmployeeData, refetch: refetchEmployeeData } = useGetEmployeeListQuery({
    pagination: {
      ...getPaginationQuery(),
    },
    filter: {
      orConditions: [
        {
          andConditions: [{ column: 'paygroupassigned', comparator: 'EqualTo', value: '00' }],
        },
      ],
    },
  });
  const employeeList = getEmployeeData?.hr?.employee?.employee?.listEmployee?.edges?.map(
    (item) => ({
      isChecked: false,
      employee: item?.node?.employeeName,
      employeeId: item?.node?.id,
      department: item?.node?.employeeDepartment,
      designation: item?.node?.designation,
    })
  );

  const defaultFormValue = {
    name: '',
    paycycle: PaycycleEnum?.BiMonthly,
    employees: employeeList,
  };
  const methods = useForm<PayGroupType>({
    defaultValues: defaultFormValue,
  });
  const { getValues, reset, setValue } = methods;

  useEffect(() => {
    if (!isEmpty(employeeList)) {
      setValue('employees', employeeList);
    }
  }, [employeeList]);

  const { mutateAsync } = useSetPayGroupMutation();
  const { mutateAsync: deleteMutateAsync } = useDeletePayGroupMutation();

  // const { data: payGroupData } = useGetPayGroupQuery(
  //   { id: selectedPayGroupId },
  //   { enabled: !!selectedPayGroupId }
  // );

  // const payGroupDataEdit =
  //   payGroupData?.settings?.general?.HCM?.payroll?.paygroup?.getPayGroup?.data;

  // useEffect(() => {
  //   reset(omit({ ...payGroupDataEdit }, ['id']) as InputPayGroup);
  // }, [payGroupDataEdit]);

  const rowData = useMemo(
    () => data?.settings?.general?.HCM?.payroll?.paygroup?.listPayGroup?.edges ?? [],
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
        header: 'Employee',
        accessorFn: (row) => row?.node?.employee,
      },
      {
        header: 'Pay Cycle',
        accessorFn: (row) => row?.node?.paycycle,
      },
      {
        header: 'Last Payroll Run',
        accessorFn: (row) => row?.node?.lastPayrollRun?.local,
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
                setselectedPayGroupId(props?.row?.original?.node?.id as string);
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
                setselectedPayGroupId(props?.row?.original?.node?.id as string);
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
    setselectedPayGroupId('');
    reset(defaultFormValue);
    refetchEmployeeData();
  };
  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setselectedPayGroupId('');
    reset(defaultFormValue);
    refetchEmployeeData();
  };

  const onSubmit = () => {
    const values = getValues();

    const employeesData = compact(
      values?.employees?.map((item) => item?.isChecked && item?.employeeId)
    );

    asyncToast({
      id: 'new-pay-group',
      msgs: {
        success: 'New Pay group added succesfully',
        loading: 'Adding new tax slab',
      },
      onSuccess: () => {
        refetch();
        handleAddModalClose();
      },
      promise: mutateAsync({
        id: null,
        input: { ...values, employees: employeesData } as PaygroupInput,
      }),
    });
  };

  const onDelete = () => {
    asyncToast({
      id: 'delete-salary-structure',
      msgs: {
        success: 'Salary structure deleted successfully',
        loading: 'Deleting earning component',
      },
      onSuccess: () => {
        refetch();
        handleDeleteModalClose();
      },
      promise: deleteMutateAsync({ id: selectedPayGroupId }),
    });
  };

  const paycycleOptions = [
    { label: 'Bi Monthly', value: PaycycleEnum?.BiMonthly },
    { label: 'One Month', value: PaycycleEnum?.OneMonth },
    { label: 'One Year', value: PaycycleEnum?.OneYear },
    { label: 'Six Month', value: PaycycleEnum?.SixMonth },
    { label: 'Three Month', value: PaycycleEnum?.ThreeMonth },
    { label: 'Two Month', value: PaycycleEnum?.TwoMonth },
    { label: 'Weekly', value: PaycycleEnum?.Weekly },
  ];

  return (
    <Box>
      <SettingsCard
        title="Pay Groups"
        subtitle="Create pay groups for various custom employee group inside organization."
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
            <Text fontSize="r1">New Pay Group</Text>
          </Box>
        }
      >
        <Table isStatic data={rowData} columns={columns} />
      </SettingsCard>
      <Modal
        open={isAddModal}
        onClose={handleAddModalClose}
        isCentered
        title="Pay Group"
        width="4xl"
      >
        <FormProvider {...methods}>
          <Grid templateColumns="repeat(3,1fr)" gap="s16">
            <GridItem colSpan={2}>
              <FormInput name="name" label="Name" />
            </GridItem>
            <FormSelect name="paycycle" label="Pay Cycle" options={paycycleOptions} />

            <GridItem colSpan={3}>
              <Divider />
            </GridItem>
            <GridItem colSpan={3}>
              <Box p="s4" h="50vh" overflowY="auto">
                <FormEditableTable
                  name="employees"
                  label="Employees"
                  canAddRow={false}
                  canDeleteRow={false}
                  hideSN
                  columns={[
                    {
                      accessor: 'isChecked',
                      header: '',
                      fieldType: 'checkbox',
                      cellWidth: 'sm',
                    },
                    {
                      accessor: 'employee',
                      header: 'Employee',
                      getDisabled: () => true,
                    },

                    {
                      accessor: 'department',
                      header: 'Department',
                      getDisabled: () => true,
                    },
                    {
                      accessor: 'designation',
                      header: 'Designation',
                      getDisabled: () => true,
                    },
                  ]}
                />
              </Box>
            </GridItem>
            <GridItem colSpan={3}>
              <Divider />
            </GridItem>
            <GridItem colSpan={3}>
              <Box display="flex" justifyContent="flex-end">
                <Button onClick={onSubmit}>Save</Button>
              </Box>
            </GridItem>
          </Grid>
        </FormProvider>
      </Modal>
      <Modal open={isDeleteModalOpen} onClose={handleDeleteModalClose} isCentered width="lg">
        <Box display="flex" flexDir="column" p="s4" gap="s16">
          <Text fontSize="r2">Are you sure you want to delete this Pay Group?</Text>
          <Button w="-webkit-fit-content" alignSelf="flex-end" onClick={onDelete}>
            Confirm
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default PayGroupTable;
