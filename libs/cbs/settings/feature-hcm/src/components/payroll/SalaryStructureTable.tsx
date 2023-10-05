import { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { useGetPayGroupOptions } from '@hr/common';
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
  Tooltip,
} from '@myra-ui';

import {
  InputSalaryStructure,
  useDeleteSalaryStructureMutation,
  useGetDeductionComponentListQuery,
  useGetEarningComponentListQuery,
  useGetSalaryStructureListQuery,
  useGetSalaryStructureQuery,
  useSetSalaryStructureMutation,
} from '@coop/cbs/data-access';
import { SettingsCard } from '@coop/cbs/settings/ui-components';
import {
  FormCheckbox,
  FormEditableTable,
  FormInput,
  FormSelect,
  FormTextArea,
} from '@coop/shared/form';
import { getPaginationQuery } from '@coop/shared/utils';

const defaultFormValue = {
  name: '',
  paygroup: null,
  description: '',
  salaryEarnings: null,
  salaryDeduction: null,
  makeThisActive: false,
};

export const SalaryStructureTable = () => {
  const [isAddModal, setIsAddModal] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedSalaryStructureId, setselectedSalaryStructureId] = useState('');

  const { payGroupOptions } = useGetPayGroupOptions();

  const { data, refetch } = useGetSalaryStructureListQuery({ pagination: getPaginationQuery() });
  const { mutateAsync, isLoading } = useSetSalaryStructureMutation();
  const { mutateAsync: deleteMutateAsync } = useDeleteSalaryStructureMutation();

  const { data: salaryStructureData } = useGetSalaryStructureQuery(
    { id: selectedSalaryStructureId },
    { enabled: !!selectedSalaryStructureId }
  );

  const { data: earningComponent } = useGetEarningComponentListQuery({
    pagination: getPaginationQuery(),
  });

  const earningComponentData =
    earningComponent?.settings?.general?.HCM?.payroll?.earningComponent?.listEarningComponent
      ?.edges;

  const { data: deductionComponent } = useGetDeductionComponentListQuery({
    pagination: getPaginationQuery(),
  });

  const deductionComponentData =
    deductionComponent?.settings?.general?.HCM?.payroll?.deductionComponent?.listDeductionComponent
      ?.edges;

  const salaryStructureDataEdit =
    salaryStructureData?.settings?.general?.HCM?.payroll?.salaryStructure?.getSalaryStructure
      ?.record;

  useEffect(() => {
    reset(omit({ ...salaryStructureDataEdit }, ['id']) as InputSalaryStructure);
  }, [salaryStructureDataEdit]);

  const methods = useForm<InputSalaryStructure>({
    defaultValues: defaultFormValue,
  });
  const { getValues, reset } = methods;

  const rowData = useMemo(
    () => data?.settings?.general?.HCM?.payroll?.salaryStructure?.listSalaryStructure?.edges ?? [],
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
        header: 'Status',
        accessorFn: (row) => row?.node?.status,
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
          width: '30%',
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
                setselectedSalaryStructureId(props?.row?.original?.node?.id as string);
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
                setselectedSalaryStructureId(props?.row?.original?.node?.id as string);
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
    setselectedSalaryStructureId('');
    reset(defaultFormValue);
  };
  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setselectedSalaryStructureId('');
    reset(defaultFormValue);
  };

  const onSubmit = () => {
    const values = getValues();
    const salaryEarnings = values?.salaryEarnings?.map((item) => ({
      id: item?.id,
      amount: item?.amount,
    }));
    const salaryDeduction = values?.salaryDeduction?.map((item) => ({
      id: item?.id,
      amount: item?.amount,
    }));
    if (selectedSalaryStructureId) {
      asyncToast({
        id: 'edit-salary-structure',
        msgs: {
          success: 'Salary structure edited succesfully',
          loading: 'Editing Salary structure',
        },
        onSuccess: () => {
          refetch();
          handleAddModalClose();
        },
        promise: mutateAsync({
          id: selectedSalaryStructureId,
          input: { ...values, salaryEarnings, salaryDeduction },
        }),
        onError: (error) => {
          if (error.__typename === 'ValidationError') {
            Object.keys(error.validationErrorMsg).map((key) =>
              methods.setError(key as keyof InputSalaryStructure, {
                message: error.validationErrorMsg[key][0] as string,
              })
            );
          }
        },
      });
    } else {
      asyncToast({
        id: 'new-salary-structure',
        msgs: {
          success: 'New Salary structure added succesfully',
          loading: 'Adding new earning component',
        },
        onSuccess: () => {
          refetch();
          handleAddModalClose();
        },
        promise: mutateAsync({
          id: null,
          input: { ...values, salaryEarnings, salaryDeduction },
        }),
        onError: (error) => {
          if (error.__typename === 'ValidationError') {
            Object.keys(error.validationErrorMsg).map((key) =>
              methods.setError(key as keyof InputSalaryStructure, {
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
      id: 'delete-salary-structure',
      msgs: {
        success: 'Salary structure deleted successfully',
        loading: 'Deleting earning component',
      },
      onSuccess: () => {
        refetch();
        handleDeleteModalClose();
      },
      promise: deleteMutateAsync({ id: selectedSalaryStructureId }),
    });
  };

  return (
    <Box id="salary-structure">
      <SettingsCard
        title="Salary Structure"
        subtitle="Extend Fields that can be added to forms for additional Input Fields."
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
            <Text fontSize="r1">Salary Structure</Text>
          </Box>
        }
      >
        <Table isStatic data={rowData} columns={columns} />
      </SettingsCard>
      <Modal
        open={isAddModal}
        onClose={handleAddModalClose}
        isCentered
        title="Salary Structure"
        width="4xl"
      >
        <FormProvider {...methods}>
          <Grid templateColumns="repeat(3,1fr)" gap="s16">
            <GridItem colSpan={2}>
              <FormInput name="name" label="Name" />
            </GridItem>
            <FormSelect name="paygroup" label="Pay Group" options={payGroupOptions} />
            <GridItem colSpan={3}>
              <FormTextArea name="description" label="Description" />
            </GridItem>
            <GridItem colSpan={3}>
              <Text fontSize="r1" fontWeight="medium">
                Salary breakdown based on Earning and Deduction
              </Text>
            </GridItem>
            <GridItem colSpan={3}>
              <FormEditableTable
                name="salaryEarnings"
                label="Earnings"
                columns={[
                  {
                    accessor: 'id',
                    header: 'Component',
                    fieldType: 'select',
                    selectOptions: earningComponentData?.map((item) => ({
                      label: item?.node?.name as string,
                      value: item?.node?.id as string,
                    })),
                  },
                  {
                    accessor: 'abbr',
                    header: 'Abbr',
                    cell: (row) => {
                      const selectedEarningComponent = earningComponentData?.find(
                        (item) => item?.node?.id === row?.id
                      );
                      return <Box textAlign="right">{selectedEarningComponent?.node?.abbr}</Box>;
                    },
                  },
                  {
                    accessor: 'amount',
                    header: 'Amount',
                    isNumeric: true,
                  },

                  {
                    accessor: 'formula',
                    header: 'Formula',
                    isNumeric: true,
                    cell: (row) => {
                      const selectedEarningComponent = earningComponentData?.find(
                        (item) => item?.node?.id === row?.id
                      );
                      if (!selectedEarningComponent?.node?.baseMultiple) {
                        return <Box />;
                      }
                      return (
                        <Box textAlign="right">
                          {selectedEarningComponent?.node?.baseMultiple} × &nbsp;
                          {selectedEarningComponent?.node?.multiplier}
                        </Box>
                      );
                    },
                  },
                ]}
              />
            </GridItem>
            <GridItem colSpan={3}>
              <FormEditableTable
                name="salaryDeduction"
                label="Deductions"
                columns={[
                  {
                    accessor: 'id',
                    header: 'Component',
                    fieldType: 'select',
                    selectOptions: deductionComponentData?.map((item) => ({
                      label: item?.node?.name as string,
                      value: item?.node?.id as string,
                    })),
                  },
                  {
                    accessor: 'abbr',
                    header: 'Abbr',
                    cell: (row) => {
                      const selectedDeductionComponent = deductionComponentData?.find(
                        (item) => item?.node?.id === row?.id
                      );
                      return <Box textAlign="right">{selectedDeductionComponent?.node?.abbr}</Box>;
                    },
                  },
                  {
                    accessor: 'amount',
                    header: 'Amount',
                    isNumeric: true,
                  },
                  {
                    accessor: 'formula',
                    header: 'Formula',
                    isNumeric: true,
                    cell: (row) => {
                      const selectedDeductionComponent = deductionComponentData?.find(
                        (item) => item?.node?.id === row?.id
                      );
                      if (!selectedDeductionComponent?.node?.baseMultiple) {
                        return <Box />;
                      }
                      return (
                        <Box textAlign="right">
                          {selectedDeductionComponent?.node?.baseMultiple} × &nbsp;
                          {selectedDeductionComponent?.node?.multiplier}
                        </Box>
                      );
                    },
                  },
                ]}
              />
            </GridItem>
            <GridItem colSpan={3}>
              <Divider />
            </GridItem>
            <GridItem colSpan={3}>
              <Box display="flex" justifyContent="space-between">
                <FormCheckbox name="makeThisActive" label="Make this Active" />
                <Button onClick={onSubmit} isLoading={isLoading}>
                  Save
                </Button>
              </Box>
            </GridItem>
          </Grid>
        </FormProvider>
      </Modal>
      <Modal open={isDeleteModalOpen} onClose={handleDeleteModalClose} isCentered width="lg">
        <Box display="flex" flexDir="column" p="s4" gap="s16">
          <Text fontSize="r2">Are you sure you want to delete this Salary Structure?</Text>
          <Button w="-webkit-fit-content" alignSelf="flex-end" onClick={onDelete}>
            Confirm
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default SalaryStructureTable;
