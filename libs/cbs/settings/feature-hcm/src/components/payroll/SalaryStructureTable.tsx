import { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
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
} from '@myra-ui';

import {
  InputSalaryStructure,
  LedgerPaymentEnum,
  PaymentModeEnum,
  PayrollFrequencyEnum,
  useDeleteHcmEmployeeGeneralMutation,
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
  payrollFrequency: null,
  description: '',
  salaryEarnings: null,
  salaryDeduction: null,
  modeOfPayment: null,
  salaryPaymentLedger: null,
  makeThisActive: false,
};

export const SalaryStructureTable = () => {
  const [isAddModal, setIsAddModal] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedSalaryStructureId, setselectedSalaryStructureId] = useState('');

  const { data, refetch } = useGetSalaryStructureListQuery({ pagination: getPaginationQuery() });
  const { mutateAsync, isLoading } = useSetSalaryStructureMutation();
  const { mutateAsync: deleteMutateAsync } = useDeleteHcmEmployeeGeneralMutation();

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
  const { getValues, handleSubmit, reset } = methods;

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid templateColumns="repeat(3,1fr)" gap="s16">
              <GridItem colSpan={2}>
                <FormInput name="name" label="Name" />
              </GridItem>
              <FormSelect
                name="payrollFrequency"
                label="Payroll Frequency"
                options={[
                  { label: PayrollFrequencyEnum?.Monthly, value: PayrollFrequencyEnum?.Monthly },
                  { label: PayrollFrequencyEnum?.Yearly, value: PayrollFrequencyEnum?.Yearly },
                ]}
              />
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
                        return (
                          <Box textAlign="right">{selectedDeductionComponent?.node?.abbr}</Box>
                        );
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
                <Box display="flex" gap="s16">
                  <FormSelect
                    name="modeOfPayment"
                    label="Mode of payment"
                    options={[
                      {
                        label: 'Bank Transfer',
                        value: PaymentModeEnum?.BankTransfer,
                      },
                      {
                        label: 'Cash',
                        value: PaymentModeEnum?.Cash,
                      },
                      {
                        label: 'Check',
                        value: PaymentModeEnum?.Check,
                      },
                    ]}
                  />
                  <FormSelect
                    name="salaryPaymentLedger"
                    label="Salary Payment Ledger"
                    options={[
                      {
                        label: LedgerPaymentEnum?.LedgerPayment_1,
                        value: LedgerPaymentEnum?.LedgerPayment_1,
                      },
                      {
                        label: LedgerPaymentEnum?.LedgerPayment_2,
                        value: LedgerPaymentEnum?.LedgerPayment_2,
                      },
                    ]}
                  />
                </Box>
              </GridItem>
              <GridItem colSpan={3}>
                <FormCheckbox name="makeThisActive" label="Make this Active" />
              </GridItem>
              <GridItem colSpan={3}>
                <Box display="flex" flexDir="column" gap="s16">
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
              </GridItem>
            </Grid>
          </form>
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
