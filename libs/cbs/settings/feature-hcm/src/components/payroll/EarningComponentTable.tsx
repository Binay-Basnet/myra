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
  Tooltip,
} from '@myra-ui';

import {
  CalculationTypeEnum,
  EarningComponentInput,
  EarningFrequencyEnum,
  useDeleteEarningComponentMutation,
  useGetEarningComponentListQuery,
  useGetEarningComponentQuery,
  useSetEarningComponentMutation,
} from '@coop/cbs/data-access';
import { SettingsCard } from '@coop/cbs/settings/ui-components';
import {
  FormAmountInput,
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
  earningFrequency: null,
  calculationType: CalculationTypeEnum?.Amount,
  baseMultiple: null,
  multiplier: 0,
  maximumAmountLimitPerYear: '',
  taxExempted: false,
  requiredProof: false,
  makeThisActive: false,
};

export const EarningComponentTable = () => {
  const [isAddModal, setIsAddModal] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEarningComponentId, setselectedEarningComponentId] = useState('');

  const { data, refetch } = useGetEarningComponentListQuery({ pagination: getPaginationQuery() });
  const { mutateAsync, isLoading } = useSetEarningComponentMutation();
  const { mutateAsync: deleteMutateAsync } = useDeleteEarningComponentMutation();

  const earningFrequencyOptions = [
    { label: 'Fixed', value: EarningFrequencyEnum?.Fixed },
    { label: 'Reccuring', value: EarningFrequencyEnum?.Recurring },
  ];

  const calculationTypeOptions = [
    { label: 'Amount', value: CalculationTypeEnum?.Amount },
    { label: 'Percentage', value: CalculationTypeEnum?.Percentage },
  ];

  const { data: earningComponentData } = useGetEarningComponentQuery(
    { id: selectedEarningComponentId },
    { enabled: !!selectedEarningComponentId }
  );

  const earningComponentDataEdit =
    earningComponentData?.settings?.general?.HCM?.payroll?.earningComponent?.getEarningComponent
      ?.data;

  useEffect(() => {
    reset(omit({ ...earningComponentDataEdit }, ['id']) as EarningComponentInput);
  }, [earningComponentDataEdit]);

  const methods = useForm<EarningComponentInput>({
    defaultValues: defaultFormValue,
  });
  const { getValues, reset, watch } = methods;

  const calculationTypeWatch = watch('calculationType');

  const rowData = useMemo(
    () =>
      data?.settings?.general?.HCM?.payroll?.earningComponent?.listEarningComponent?.edges ?? [],
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
                setselectedEarningComponentId(props?.row?.original?.node?.id as string);
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
                setselectedEarningComponentId(props?.row?.original?.node?.id as string);
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
    setselectedEarningComponentId('');
    reset(defaultFormValue);
  };
  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setselectedEarningComponentId('');
    reset(defaultFormValue);
  };

  const onSubmit = () => {
    const values = getValues();
    if (selectedEarningComponentId) {
      asyncToast({
        id: 'edit-earning-component',
        msgs: {
          success: 'Earning component edited succesfully',
          loading: 'Editing Earning component',
        },
        onSuccess: () => {
          refetch();
          handleAddModalClose();
        },
        promise: mutateAsync({
          id: selectedEarningComponentId,
          input: values,
        }),
        onError: (error) => {
          if (error.__typename === 'ValidationError') {
            Object.keys(error.validationErrorMsg).map((key) =>
              methods.setError(key as keyof EarningComponentInput, {
                message: error.validationErrorMsg[key][0] as string,
              })
            );
          }
        },
      });
    } else {
      asyncToast({
        id: 'new-earning-component',
        msgs: {
          success: 'New Earning component added succesfully',
          loading: 'Adding new earning component',
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
              methods.setError(key as keyof EarningComponentInput, {
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
      id: 'delete-earning-component',
      msgs: {
        success: 'Earning component deleted successfully',
        loading: 'Deleting earning component',
      },
      onSuccess: () => {
        refetch();
        handleDeleteModalClose();
      },
      promise: deleteMutateAsync({ id: selectedEarningComponentId }),
    });
  };

  return (
    <Box id="earning-component">
      <SettingsCard
        title="Earning Component"
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
            <Text fontSize="r1">Earning Component</Text>
          </Box>
        }
      >
        <Table isStatic data={rowData} columns={columns} />
      </SettingsCard>
      <Modal
        open={isAddModal}
        onClose={handleAddModalClose}
        isCentered
        title="Earning Component"
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
            <GridItem colSpan={3}>
              <Divider />
            </GridItem>
            <GridItem colSpan={3}>
              <Box display="flex" gap="s20">
                <Box flex={1}>
                  <FormLeafCoaHeadSelect name="ledgerHead" label="Ledger Name" />
                </Box>
                <Box flex={1}>
                  <FormSelect
                    name="earningFrequency"
                    label="Earning Frequency"
                    options={earningFrequencyOptions}
                  />
                </Box>
              </Box>
              <Box display="flex" gap="s20" mt="s16">
                <Box flex={1}>
                  <FormSelect
                    name="calculationType"
                    label="Calculation Type"
                    options={calculationTypeOptions}
                  />
                </Box>
                {calculationTypeWatch === CalculationTypeEnum?.Amount ? (
                  <Box flex={1}>
                    <FormAmountInput
                      type="number"
                      name="maximumAmountLimitPerYear"
                      label="Maximum Limit/year"
                    />
                  </Box>
                ) : (
                  <>
                    <Box flex={1}>
                      <FormSelect
                        name="baseMultiple"
                        label="Multiplier"
                        options={
                          rowData?.map((item) => ({
                            label: item?.node?.abbr,
                            value: item?.node?.abbr,
                          })) as { label: string; value: string }[]
                        }
                      />
                    </Box>
                    <Box flex={1}>
                      <FormInput type="number" name="multiplier" label="Factor" />
                    </Box>
                  </>
                )}
              </Box>
            </GridItem>
            <GridItem colSpan={3}>
              <Box display="flex" flexDir="column" gap="s16">
                <Text fontSize="r1" fontWeight="medium">
                  Additional Setup
                </Text>
                <FormCheckbox name="taxExempted" label="Tax Exempted" />
                <FormCheckbox name="requiredProof" label="Required Proof" />
              </Box>
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
          <Text fontSize="r2">Are you sure you want to delete this Earning Component?</Text>
          <Button w="-webkit-fit-content" alignSelf="flex-end" onClick={onDelete}>
            Confirm
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default EarningComponentTable;
