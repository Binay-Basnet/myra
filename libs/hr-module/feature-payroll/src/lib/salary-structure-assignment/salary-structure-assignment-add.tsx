import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useGetEployeeOptions, useGetSalaryStructureOptions } from '@hr/common';

import { asyncToast, Box, FormSection, GridItem } from '@myra-ui';

import {
  PaymentModeSalary,
  useGetDeductionComponentListQuery,
  useGetEarningComponentListQuery,
  useGetSalaryStructureAssignmentQuery,
  useGetSalaryStructureQuery,
  useSetSalaryStructureAssignmentMutation,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import {
  FormDatePicker,
  FormEditableTable,
  FormInput,
  FormLayout,
  FormSelect,
} from '@coop/shared/form';
import { getPaginationQuery } from '@coop/shared/utils';

export const SalaryStructureAssignmentAdd = () => {
  const router = useRouter();
  const methods = useForm();
  const { watch, getValues, reset, setValue } = methods;

  const selectedSalaryStructure = watch('salaryStructureId');

  const { employeeOptions } = useGetEployeeOptions();
  const { salaryStructureOptions } = useGetSalaryStructureOptions();

  const { data: salaryStructureData } = useGetSalaryStructureQuery(
    { id: selectedSalaryStructure },
    { enabled: !!selectedSalaryStructure }
  );

  const earningData =
    salaryStructureData?.settings?.general?.HCM?.payroll?.salaryStructure?.getSalaryStructure
      ?.record?.salaryEarnings;
  const deductionData =
    salaryStructureData?.settings?.general?.HCM?.payroll?.salaryStructure?.getSalaryStructure
      ?.record?.salaryDeduction;

  useEffect(() => {
    if (earningData) {
      setValue('earnings', earningData);
    }
  }, [earningData]);

  useEffect(() => {
    if (deductionData) {
      setValue('deduction', deductionData);
    }
  }, [deductionData]);

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

  const { mutateAsync } = useSetSalaryStructureAssignmentMutation();

  const { data: salaryStructureAssignment } = useGetSalaryStructureAssignmentQuery(
    { id: router?.query?.['id'] as string },
    { enabled: !!router?.query?.['id'] }
  );

  const salaryStructureAssignmentEditData =
    salaryStructureAssignment?.hr?.payroll?.salaryStructureAssignment?.getSalaryStructureAssignment
      ?.data;

  useEffect(() => {
    if (salaryStructureAssignmentEditData) {
      reset(salaryStructureAssignmentEditData);
    }
  }, [JSON.stringify(salaryStructureAssignmentEditData)]);

  const submitForm = () => {
    const values = getValues();
    if (router?.query?.['id']) {
      asyncToast({
        id: 'edit-salary-structure-assignment',
        msgs: {
          success: 'salary structure assignment edited succesfully',
          loading: 'editing salary structure assignment',
        },
        onSuccess: () => {
          router.push(ROUTES?.HR_PAYROLL_SALARY_STRUCTURE_ASSIGNMENT_LIST);
        },
        promise: mutateAsync({
          id: router?.query?.['id'] as string,
          input: values,
        }),
      });
    } else {
      asyncToast({
        id: 'add-salary-structure-assignment',
        msgs: {
          success: 'new salay structure assignment added succesfully',
          loading: 'adding new salary structure assignemnt',
        },
        onSuccess: () => {
          router.push(ROUTES?.HR_PAYROLL_SALARY_STRUCTURE_ASSIGNMENT_LIST);
        },
        promise: mutateAsync({
          id: null,
          input: values,
        }),
      });
    }
  };

  return (
    <FormLayout methods={methods}>
      <FormLayout.Header title="Salary Structure Assignment" />
      <FormLayout.Content>
        <FormLayout.Form>
          <FormSection templateColumns={3} divider>
            <GridItem colSpan={2}>
              <FormSelect name="employeeId" label="Employee" options={employeeOptions} />
            </GridItem>
            <FormSelect
              name="salaryStructureId"
              label="Salary Structure"
              options={salaryStructureOptions}
            />
            <FormInput name="baseSalary" label="Base Salary" />
            <FormDatePicker name="fromDate" label="From Date" />
            <FormSelect
              name="paymentMode"
              label="Payment Mode"
              options={[
                { label: 'Bank', value: PaymentModeSalary?.Bank },
                { label: 'Cash', value: PaymentModeSalary?.Cash },
                { label: 'Cheque', value: PaymentModeSalary?.Cheque },
              ]}
            />
          </FormSection>
          <FormSection
            templateColumns={3}
            divider
            header="Salary Details"
            subHeader="All Amount are based for Annual"
          >
            <GridItem colSpan={3}>
              <FormEditableTable
                name="earnings"
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
                    // getDisabled: (row) => {
                    //   const selectedEarningComponent = earningComponentData?.find(
                    //     (item) => item?.node?.id === row?.id
                    //   );

                    //   return !!selectedEarningComponent;
                    // },
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
                name="deduction"
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
                    // getDisabled: (row) => {
                    //   const selectedEarningComponent = earningComponentData?.find(
                    //     (item) => item?.node?.id === row?.id
                    //   );

                    //   return !!selectedEarningComponent;
                    // },
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
          </FormSection>
        </FormLayout.Form>{' '}
      </FormLayout.Content>
      <FormLayout.Footer mainButtonLabel="Save" mainButtonHandler={submitForm} />
    </FormLayout>
  );
};
export default SalaryStructureAssignmentAdd;
