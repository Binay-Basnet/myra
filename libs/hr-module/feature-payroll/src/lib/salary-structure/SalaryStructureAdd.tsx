import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useGetEployeeOptions } from '@hr/common';
import { isEmpty } from 'lodash';

import { Alert, asyncToast, Box, FormSection, GridItem, Text } from '@myra-ui';

import {
  SalActionType,
  useGetCurrentMonthUpdatedSalaryStructureQuery,
  useGetDeductionComponentListQuery,
  useGetEarningComponentListQuery,
  useSetSalAdjustmentRevisionMutation,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { FormDatePicker, FormEditableTable, FormLayout, FormSelect } from '@coop/shared/form';
import { getPaginationQuery } from '@coop/shared/utils';

export const SalaryStructureAdd = () => {
  const router = useRouter();
  const methods = useForm();

  const { watch, setValue, getValues } = methods;
  const actionTypeWatch = watch('actionType');
  const employeeIdWatch = watch('employee');

  const { mutateAsync } = useSetSalAdjustmentRevisionMutation();

  const { data: currentSalaryStructureData } = useGetCurrentMonthUpdatedSalaryStructureQuery(
    { employeeId: employeeIdWatch, actionType: actionTypeWatch },
    { enabled: !!actionTypeWatch && !!employeeIdWatch }
  );

  const currentSalaryStructure =
    currentSalaryStructureData?.hr?.payroll?.salStrucAdjustRevision
      ?.getCurrentMonthUpdatedSalaryStructure?.data;

  useEffect(() => {
    if (!isEmpty(currentSalaryStructure)) {
      setValue('earnings', currentSalaryStructure?.earnings);
      setValue('deductions', currentSalaryStructure?.deductions);
    }
  }, [JSON.stringify(currentSalaryStructure)]);

  const { data: earningComponentData } = useGetEarningComponentListQuery({
    pagination: getPaginationQuery(),
  });

  const earningComponentList =
    earningComponentData?.settings?.general?.HCM?.payroll?.earningComponent?.listEarningComponent
      ?.edges;

  const earningComponentOptions = earningComponentList?.map((item) => ({
    label: item?.node?.name,
    value: item?.node?.id,
  }));

  const { data: deductionComponentData } = useGetDeductionComponentListQuery({
    pagination: getPaginationQuery(),
  });

  const deductionComponentList =
    deductionComponentData?.settings?.general?.HCM?.payroll?.deductionComponent
      ?.listDeductionComponent?.edges;

  const deductionComponentOptions = deductionComponentList?.map((item) => ({
    label: item?.node?.name,
    value: item?.node?.id,
  }));

  const actionTypeOptions = [
    {
      label: 'Adjustment',
      value: SalActionType?.Adjustment,
    },
    {
      label: 'Revision',
      value: SalActionType?.Revision,
    },
  ];
  const { employeeOptions } = useGetEployeeOptions();

  const submitForm = () => {
    const values = getValues();
    asyncToast({
      id: 'add-salary-structure-adjustment-revision',
      promise: mutateAsync({
        id: null,
        input: {
          ...values,
          earnings: values?.earnings?.map((item: { id: string; amount: number }) => ({
            id: item?.id,
            amount: item?.amount,
          })),
          deductions: values?.deductions?.map((item: { id: string; amount: number }) => ({
            id: item?.id,
            amount: item?.amount,
          })),
        },
      }),
      msgs: {
        loading: 'Saving salary structure',
        success: 'Salary structure added',
      },
      onSuccess: () => {
        router.push(ROUTES?.HR_PAYROLL_SALARY_STRUCTURE_LIST);
      },
    });
  };

  return (
    <FormLayout methods={methods}>
      <FormLayout.Header title="Salary Structure" />
      <FormLayout.Content>
        <FormLayout.Form>
          <FormSection templateColumns={3}>
            <FormSelect name="employee" label="Employee" options={employeeOptions} />
            <FormSelect name="actionType" label="Action Type" options={actionTypeOptions} />
            {actionTypeWatch === SalActionType?.Revision ? (
              <FormDatePicker name="revisionEffectiveFrom" label="Effective From" />
            ) : (
              <FormDatePicker name="adjustmentOn" label="Effective From" />
            )}

            <GridItem colSpan={3}>
              <Alert
                status="info"
                title="Salary Adjustment Info"
                subtitle="The upcoming payroll will see adjustments in both values and components, which will continue into the next month. Values will reset for the next payroll and will be adjusted as needed."
              />
            </GridItem>
            <GridItem colSpan={3} mt="s20">
              <Text fontSize="r1" fontWeight="medium" color="green.700">
                This Month Salary Details
              </Text>
              <Text fontSize="s3" color="green.700">
                All Amount are based for Annual.{' '}
              </Text>
            </GridItem>
            <GridItem colSpan={3}>
              {' '}
              <FormEditableTable
                name="earnings"
                label="Earnings"
                columns={[
                  {
                    accessor: 'id',
                    header: 'Component',
                    cellWidth: 'lg',
                    fieldType: 'select',
                    selectOptions: earningComponentOptions,
                  },
                  {
                    accessor: 'abbr',
                    header: 'Abbr',
                    getDisabled: () => true,
                    cell: (row) => {
                      const selectedEarningComponent = earningComponentList?.find(
                        (item) => item?.node?.id === row?.id
                      );
                      return <Box textAlign="right">{selectedEarningComponent?.node?.abbr}</Box>;
                    },
                  },
                  {
                    accessor: 'amount',
                    header: 'Amount',
                  },
                  {
                    accessor: 'formula',
                    header: 'Formula',
                    getDisabled: () => true,
                    cell: (row) => {
                      const selectedEarningComponent = earningComponentList?.find(
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
              {' '}
              <FormEditableTable
                name="deductions"
                label="Deductions"
                columns={[
                  {
                    accessor: 'id',
                    header: 'Component',
                    cellWidth: 'lg',
                    fieldType: 'select',
                    selectOptions: deductionComponentOptions,
                  },
                  {
                    accessor: 'abbr',
                    header: 'Abbr',
                    getDisabled: () => true,
                    cell: (row) => {
                      const selectedEarningComponent = deductionComponentList?.find(
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
                    getDisabled: () => true,
                    cell: (row) => {
                      const selectedEarningComponent = deductionComponentList?.find(
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
          </FormSection>
        </FormLayout.Form>{' '}
      </FormLayout.Content>
      <FormLayout.Footer mainButtonLabel="Save" mainButtonHandler={submitForm} />
    </FormLayout>
  );
};
export default SalaryStructureAdd;
