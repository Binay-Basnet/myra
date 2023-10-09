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
  CalculationTypeEnum,
  DeductionFrequencyEnum,
  DeductionType,
  InputDeductionComponent,
  useDeleteDeductionComponentMutation,
  useGetDeductionComponentListQuery,
  useGetDeductionComponentQuery,
  useGetEarningComponentListQuery,
  useSetDeductionComponentMutation,
} from '@coop/cbs/data-access';
import { SettingsCard } from '@coop/cbs/settings/ui-components';
import {
  FormCheckbox,
  FormInput,
  FormLeafCoaHeadSelect,
  FormSelect,
  FormTextArea,
} from '@coop/shared/form';
import { getPaginationQuery } from '@coop/shared/utils';

const defaultFormValue = {
  name: '',
  abbr: '',
  description: '',
  ledgerHead: null,
  deductionType: null,
  deductionFrequency: null,
  calculationType: CalculationTypeEnum?.Amount,
  baseMultiple: null,
  multiplier: 0,
  maximumAmountLimitPerYear: '',
  makeThisActive: false,
};

export const DeductionComponentTable = () => {
  const [isAddModal, setIsAddModal] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDeductionComponentId, setSelectedDeductionComponentId] = useState('');

  const { data, refetch } = useGetDeductionComponentListQuery({ pagination: getPaginationQuery() });
  const { data: earningComponentListData } = useGetEarningComponentListQuery({
    pagination: getPaginationQuery(),
  });
  const earningComponentList =
    earningComponentListData?.settings?.general?.HCM?.payroll?.earningComponent
      ?.listEarningComponent?.edges;
  const { mutateAsync, isLoading } = useSetDeductionComponentMutation();
  const { mutateAsync: deleteMutateAsync } = useDeleteDeductionComponentMutation();

  const { data: deductionComponentData } = useGetDeductionComponentQuery(
    { id: selectedDeductionComponentId },
    { enabled: !!selectedDeductionComponentId }
  );

  const deductionComponentDataEdit =
    deductionComponentData?.settings?.general?.HCM?.payroll?.deductionComponent
      ?.getDeductionComponent?.record;

  useEffect(() => {
    reset(omit({ ...deductionComponentDataEdit }, ['id']) as InputDeductionComponent);
  }, [deductionComponentDataEdit]);

  const methods = useForm<InputDeductionComponent>({
    defaultValues: defaultFormValue,
  });
  const { getValues, reset, watch } = methods;
  const calculationTypeWatch = watch('calculationType');

  const rowData = useMemo(
    () =>
      data?.settings?.general?.HCM?.payroll?.deductionComponent?.listDeductionComponent?.edges ??
      [],
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
        header: 'Deduction Frequency',
        accessorFn: (row) => row?.node?.deductionFrequency,
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
                setSelectedDeductionComponentId(props?.row?.original?.node?.id as string);
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
                setSelectedDeductionComponentId(props?.row?.original?.node?.id as string);
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

  const deductionTypeOptions = [
    { label: 'Post Tax deduction', value: DeductionType?.PostTaxDeduction },
    { label: 'Pre Tax deduction', value: DeductionType?.PreTaxDeduction },
  ];

  const deductionFrequencyOptions = [
    { label: 'Fixed', value: DeductionFrequencyEnum?.Fixed },
    { label: 'Recurring', value: DeductionFrequencyEnum?.Recurring },
  ];

  const calculationTypeOptions = [
    { label: 'Amount', value: CalculationTypeEnum?.Amount },
    { label: 'Percentage', value: CalculationTypeEnum?.Percentage },
  ];

  const handleAddModalClose = () => {
    setIsAddModal(false);
    setSelectedDeductionComponentId('');
    reset(defaultFormValue);
  };
  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setSelectedDeductionComponentId('');
    reset(defaultFormValue);
  };

  const onSubmit = () => {
    const values = getValues();
    if (selectedDeductionComponentId) {
      asyncToast({
        id: 'edit-deduction-component',
        msgs: {
          success: 'Deduction component edited succesfully',
          loading: 'Editing Deduction component',
        },
        onSuccess: () => {
          refetch();
          handleAddModalClose();
        },
        promise: mutateAsync({
          id: selectedDeductionComponentId,
          input: values,
        }),
        onError: (error) => {
          if (error.__typename === 'ValidationError') {
            Object.keys(error.validationErrorMsg).map((key) =>
              methods.setError(key as keyof InputDeductionComponent, {
                message: error.validationErrorMsg[key][0] as string,
              })
            );
          }
        },
      });
    } else {
      asyncToast({
        id: 'new-deduction-component',
        msgs: {
          success: 'New Deduction component added succesfully',
          loading: 'Adding new deduction component',
        },
        onSuccess: () => {
          refetch();
          handleAddModalClose();
        },
        promise: mutateAsync({
          id: null,
          input: values,
        }),
        onError: (error) => {
          if (error.__typename === 'ValidationError') {
            Object.keys(error.validationErrorMsg).map((key) =>
              methods.setError(key as keyof InputDeductionComponent, {
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
      id: 'delete-deduction-component',
      msgs: {
        success: 'Deduction component deleted successfully',
        loading: 'Deleting deduction component',
      },
      onSuccess: () => {
        refetch();
        handleDeleteModalClose();
      },
      promise: deleteMutateAsync({ id: selectedDeductionComponentId }),
    });
  };

  return (
    <Box id="deduction-component">
      <SettingsCard
        title="Deduction Component"
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
            <Text fontSize="r1">Deduction Component</Text>
          </Box>
        }
      >
        <Table isStatic data={rowData} columns={columns} />
      </SettingsCard>
      <Modal
        open={isAddModal}
        onClose={handleAddModalClose}
        isCentered
        title="Deduction Component"
        width="4xl"
      >
        <FormProvider {...methods}>
          <Grid templateColumns="repeat(3,1fr)" gap="s16">
            <GridItem colSpan={2}>
              <FormInput name="name" label="Name" />
            </GridItem>
            <FormInput name="abbr" label="Abbr" />
            <GridItem colSpan={3}>
              <FormTextArea name="description" label="Description" />
            </GridItem>
            <FormLeafCoaHeadSelect name="ledgerHead" label="Ledger Name" />
            <FormSelect
              name="deductionType"
              label="Deduction Type"
              options={deductionTypeOptions}
            />
            <FormSelect
              name="deductionFrequency"
              label="Deduction Frequency"
              options={deductionFrequencyOptions}
            />
            <FormSelect
              name="calculationType"
              label="Calculation Type"
              options={calculationTypeOptions}
            />
            {calculationTypeWatch === CalculationTypeEnum?.Amount ? (
              <FormInput name="maximumAmountLimitPerYear" label="Value" />
            ) : (
              <>
                <FormSelect
                  name="baseMultiple"
                  label="Multiplier"
                  options={
                    earningComponentList?.map((item) => ({
                      label: item?.node?.abbr,
                      value: item?.node?.abbr,
                    })) as { label: string; value: string }[]
                  }
                />

                <FormInput type="number" name="multiplier" label="Factor" />
              </>
            )}

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
          <Text fontSize="r2">Are you sure you want to delete this deduction Component?</Text>
          <Button w="-webkit-fit-content" alignSelf="flex-end" onClick={onDelete}>
            Confirm
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default DeductionComponentTable;
