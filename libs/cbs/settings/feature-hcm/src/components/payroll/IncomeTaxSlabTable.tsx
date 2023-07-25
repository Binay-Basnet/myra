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
  TaxSlabInput,
  useDeleteTaxSlabMutation,
  useGetTaxSlabListQuery,
  useGetTaxSlabQuery,
  useSetTaxSlabMutation,
} from '@coop/cbs/data-access';
import { SettingsCard } from '@coop/cbs/settings/ui-components';
import { FormCheckbox, FormDatePicker, FormEditableTable, FormInput } from '@coop/shared/form';
import { getPaginationQuery } from '@coop/shared/utils';

const defaultFormValue = {
  name: '',
  fiscalYear: null,
  unmarriedTaxableSalarySlab: null,
  marriedTaxableSalarySlab: null,
  effectiveFrom: null,
  makeThisActive: false,
};

export const IncomeTaxSlabTable = () => {
  const [isAddModal, setIsAddModal] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTaxSlabId, setselectedTaxSlabId] = useState('');

  const { data, refetch } = useGetTaxSlabListQuery({ pagination: getPaginationQuery() });
  const { mutateAsync, isLoading } = useSetTaxSlabMutation();
  const { mutateAsync: deleteMutateAsync } = useDeleteTaxSlabMutation();

  const { data: taxSlabData } = useGetTaxSlabQuery(
    { id: selectedTaxSlabId },
    { enabled: !!selectedTaxSlabId }
  );

  const taxSlabDataEdit = taxSlabData?.settings?.general?.HCM?.payroll?.taxSlab?.getTaxSlab?.data;

  useEffect(() => {
    reset(omit({ ...taxSlabDataEdit }, ['id']) as unknown as TaxSlabInput);
  }, [taxSlabDataEdit]);

  const methods = useForm<TaxSlabInput>({
    defaultValues: defaultFormValue,
  });
  const { getValues, handleSubmit, reset } = methods;

  const rowData = useMemo(
    () => data?.settings?.general?.HCM?.payroll?.taxSlab?.listTaxSlab?.edges ?? [],
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
        header: 'Effective From',
        accessorFn: (row) => row?.node?.effectiveFrom?.local,
      },
      {
        header: 'Status',
        accessorFn: (row) => row?.node?.status,
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
                setselectedTaxSlabId(props?.row?.original?.node?.id as string);
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
                setselectedTaxSlabId(props?.row?.original?.node?.id as string);
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
    setselectedTaxSlabId('');
    reset(defaultFormValue);
  };
  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setselectedTaxSlabId('');
    reset(defaultFormValue);
  };

  const onSubmit = () => {
    const values = getValues();
    if (selectedTaxSlabId) {
      asyncToast({
        id: 'edit-tax-slab',
        msgs: {
          success: 'Tax slab edited succesfully',
          loading: 'Editing Tax slab',
        },
        onSuccess: () => {
          refetch();
          handleAddModalClose();
        },
        promise: mutateAsync({
          id: selectedTaxSlabId,
          input: values,
        }),
        onError: (error) => {
          if (error.__typename === 'ValidationError') {
            Object.keys(error.validationErrorMsg).map((key) =>
              methods.setError(key as keyof TaxSlabInput, {
                message: error.validationErrorMsg[key][0] as string,
              })
            );
          }
        },
      });
    } else {
      asyncToast({
        id: 'new-tax-slab',
        msgs: {
          success: 'New Tax slab added succesfully',
          loading: 'Adding new tax slab',
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
              methods.setError(key as keyof TaxSlabInput, {
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
      id: 'delete-tax-slab',
      msgs: {
        success: 'Tax slab deleted successfully',
        loading: 'Deleting tax slab',
      },
      onSuccess: () => {
        refetch();
        handleDeleteModalClose();
      },
      promise: deleteMutateAsync({ id: selectedTaxSlabId }),
    });
  };

  return (
    <Box id="tax-slab">
      <SettingsCard
        title="Taxable Salary Slab"
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
            <Text fontSize="r1">New Income Tax Slab</Text>
          </Box>
        }
      >
        <Table isStatic data={rowData} columns={columns} />
      </SettingsCard>
      <Modal
        open={isAddModal}
        onClose={handleAddModalClose}
        isCentered
        title="New Income Tax Slab"
        width="4xl"
      >
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid templateColumns="repeat(3,1fr)" gap="s16">
              <FormInput name="name" label="Name" />
              <FormDatePicker name="fiscalYear.from" label="Select Fiscal Year From" />
              <FormDatePicker name="fiscalYear.to" label="Select Fiscal Year to" />

              <GridItem colSpan={3}>
                <FormEditableTable
                  name="unmarriedTaxableSalarySlab"
                  label="Unmarried Taxable Salary Slab"
                  columns={[
                    {
                      accessor: 'fromAmount',
                      header: 'From Amount',
                    },
                    {
                      accessor: 'toAmount',
                      header: 'To Amount',
                    },
                    {
                      accessor: 'percentageDeduction',
                      header: 'Percentage Deduction',
                    },
                  ]}
                />
              </GridItem>
              <GridItem colSpan={3}>
                <FormEditableTable
                  name="marriedTaxableSalarySlab"
                  label="Married Taxable Salary Slab"
                  columns={[
                    {
                      accessor: 'fromAmount',
                      header: 'From Amount',
                    },
                    {
                      accessor: 'toAmount',
                      header: 'To Amount',
                    },
                    {
                      accessor: 'percentageDeduction',
                      header: 'Percentage Deduction',
                    },
                  ]}
                />
              </GridItem>

              <GridItem colSpan={3}>
                <Box display="flex" flexDir="column" gap="s16">
                  <Box w="-webkit-fit-content">
                    <FormDatePicker name="effectiveFrom" label="Effective From" />
                  </Box>

                  <FormCheckbox name="makeThisActive" label="Make this Active" />
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
          <Text fontSize="r2">Are you sure you want to delete this Income Tax Slab Component?</Text>
          <Button w="-webkit-fit-content" alignSelf="flex-end" onClick={onDelete}>
            Confirm
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default IncomeTaxSlabTable;
