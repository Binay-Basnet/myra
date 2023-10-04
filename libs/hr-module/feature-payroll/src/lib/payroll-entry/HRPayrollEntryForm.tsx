import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsArrowBarRight } from 'react-icons/bs';
import { useRouter } from 'next/router';
import { useGetNepaliMonthsOptions, useGetPayGroupOptions } from '@hr/common';
import { compact, isEmpty, omit } from 'lodash';

import { asyncToast, Box, Button, FormSection, GridItem, Icon, Text, toast } from '@myra-ui';

import {
  PayrollStatus,
  UnPaidEmployeeDetailsInput,
  useApprovePayrollRunMutation,
  useCreatePayrollRunMutation,
  UsedTypeEnum,
  useGetAllEmployeeSalaryDetailsForThisPayrollRunQuery,
} from '@coop/cbs/data-access';
import { findQueryError, getQueryError, QueryError, ROUTES } from '@coop/cbs/utils';
import { FormEditableTable, FormInput, FormLayout, FormSelect } from '@coop/shared/form';
import { decimalAdjust } from '@coop/shared/utils';

import EmployeeDrawer from './components/EmployeeDrawer';

export const HrPayrollEntryUpsert = () => {
  const router = useRouter();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [usedType, setUsedType] = useState('');
  const [usedTypeId, setUsedTypeId] = useState('');
  const [employeeName, setEmployeeName] = useState('');

  const isApprove = router?.query?.['type'] === 'approve';
  const isDetail = router?.query?.['type'] === 'details';

  const methods = useForm();
  const { getValues, watch, setValue } = methods;

  const { payGroupOptions } = useGetPayGroupOptions();
  const { nepaliMonthsOptions } = useGetNepaliMonthsOptions();

  const payGroupIdWatch = watch('paygroupId');
  const payrollYearWatch = watch('payrollYear');
  const payrollMonthWatch = watch('payrollMonth');

  const { data: employeeSalaryDetailsData } = useGetAllEmployeeSalaryDetailsForThisPayrollRunQuery(
    {
      paygroup: payGroupIdWatch,
      payrollMonth: payrollMonthWatch,
      year: payrollYearWatch,
    },
    {
      enabled: !!payGroupIdWatch && !!payrollYearWatch && !!payrollMonthWatch,
      onSuccess: (res) => {
        const errorKeys = findQueryError(res, 'error');
        if (errorKeys[0] !== null) {
          const errorMessage = getQueryError(
            errorKeys?.length ? errorKeys[0] : (errorKeys as unknown as QueryError)
          );

          toast({
            id: 'payroll-run-error',
            type: 'error',
            state: 'error',
            message: errorMessage,
          });
        }
      },
    }
  );

  const employeeSalaryDetails =
    employeeSalaryDetailsData?.hr?.payroll?.payrollRun
      ?.getAllEmployeesSalaryDetailsForThisPayrollRun?.data;

  useEffect(() => {
    if (!isEmpty(employeeSalaryDetails)) {
      setValue('salaryDetailsOfEmployees', employeeSalaryDetails);
    }
  }, [JSON.stringify(employeeSalaryDetails)]);

  const { mutateAsync } = useCreatePayrollRunMutation();
  const { mutateAsync: payrollRunApproveMutateAsync } = useApprovePayrollRunMutation();

  const submitForm = () => {
    const values = getValues();
    asyncToast({
      id: 'add-payroll-run',
      msgs: {
        success: 'new payroll run added succesfully',
        loading: 'adding new payroll run',
      },
      onSuccess: () => {
        router.push(ROUTES?.HR_PAYROLL_ENTRY_LIST);
      },
      promise: mutateAsync({
        input: {
          ...values,
          salaryDetailsOfEmployees: compact(
            values?.salaryDetailsOfEmployees?.map(
              (item: UnPaidEmployeeDetailsInput & { isChecked: boolean }) =>
                item?.isChecked && omit(item, ['isChecked'])
            )
          ),
        },
      }),
    });
  };

  const approveHandler = () => {
    asyncToast({
      id: 'approve-payroll-run',
      msgs: {
        success: 'Payroll run approved',
        loading: 'Approving payroll run',
      },
      onSuccess: () => {
        router.push(ROUTES?.HR_PAYROLL_ENTRY_LIST);
      },
      promise: payrollRunApproveMutateAsync({
        id: router?.query?.['id'] as string,
        input: PayrollStatus?.Paid,
      }),
    });
  };

  const rejectHandler = () => {
    asyncToast({
      id: 'reject-payroll-run',
      msgs: {
        success: 'Payroll run rejected',
        loading: 'Rejecting payroll run',
      },
      onSuccess: () => {
        router.push(ROUTES?.HR_PAYROLL_ENTRY_LIST);
      },
      promise: payrollRunApproveMutateAsync({
        id: router?.query?.['id'] as string,
        input: PayrollStatus?.Rejected,
      }),
    });
  };

  const onCloseDrawer = () => {
    setIsDrawerOpen(false);
    setUsedType('');
    setUsedTypeId('');
  };

  return (
    <>
      <FormLayout methods={methods}>
        <FormLayout.Header title="Payroll Run" />
        <FormLayout.Content>
          <FormLayout.Form>
            <FormSection>
              <FormSelect name="paygroupId" label="Paygroup" options={payGroupOptions} />
              <FormInput type="number" name="payrollYear" label="Payroll Year" />
              <FormSelect name="payrollMonth" label="Payroll Month" options={nepaliMonthsOptions} />
            </FormSection>
            <FormSection>
              <GridItem colSpan={3}>
                {' '}
                <FormEditableTable
                  name="salaryDetailsOfEmployees"
                  label="Employee"
                  canAddRow={false}
                  hideSN
                  canDeleteRow={false}
                  columns={[
                    {
                      accessor: 'isChecked',
                      header: '',
                      fieldType: 'checkbox',
                      cellWidth: 'sm',
                    },
                    {
                      accessor: 'employeeName',
                      header: 'Employee Name',
                      getDisabled: () => true,
                    },
                    {
                      accessor: 'unPaidDays',
                      header: 'Unpaid Days',
                      getDisabled: () => true,
                    },
                    {
                      accessor: 'grossPay',
                      header: 'Gross Pay',
                      cell: (row) => (
                        <Text>{decimalAdjust('round', row?.grossPay as number, -2)}</Text>
                      ),
                      getDisabled: () => true,
                    },
                    {
                      accessor: 'preTaxDeductions',
                      header: 'Pre Tax Deductions',
                      cell: (row) => (
                        <Text>{decimalAdjust('round', row?.preTaxDeductions as number, -2)}</Text>
                      ),
                      getDisabled: () => true,
                    },
                    {
                      accessor: 'postTaxDeductions',
                      header: 'Post Tax Deductions',
                      cell: (row) => (
                        <Text>{decimalAdjust('round', row?.postTaxDeductions as number, -2)}</Text>
                      ),
                      getDisabled: () => true,
                    },
                    {
                      accessor: 'totalTax',
                      header: 'Tax',
                      cell: (row) => (
                        <Text>{decimalAdjust('round', row?.totalTax as number, -2)}</Text>
                      ),
                      getDisabled: () => true,
                    },
                    {
                      accessor: 'netPay',
                      header: 'Net Pay',
                      cell: (row) => (
                        <Text>{decimalAdjust('round', row?.netPay as number, -2)}</Text>
                      ),
                      getDisabled: () => true,
                    },
                    {
                      accessor: '',
                      header: '',
                      cell: (row) => (
                        <Box
                          display="flex"
                          alignItems="center"
                          gap="s8"
                          cursor="pointer"
                          onClick={() => {
                            setIsDrawerOpen(true);
                            setUsedTypeId(row?.usedTypeId as string);
                            setUsedType(row?.usedType as string);
                            setEmployeeName(row?.employeeName as string);
                          }}
                        >
                          <Text fontSize="r1" color="green.500" fontWeight="medium">
                            View
                          </Text>
                          <Icon as={BsArrowBarRight} />
                        </Box>
                      ),
                    },
                  ]}
                />
              </GridItem>
            </FormSection>
          </FormLayout.Form>
        </FormLayout.Content>
        {isApprove && (
          <FormLayout.Footer
            mainButtonLabel="Approve and Generate Salary Slip"
            draftButton={
              isApprove && (
                <Button variant="outline" onClick={rejectHandler}>
                  Reject Request
                </Button>
              )
            }
            mainButtonHandler={approveHandler}
          />
        )}
        {!isApprove && !isDetail && (
          <FormLayout.Footer mainButtonLabel="Submit for Approval" mainButtonHandler={submitForm} />
        )}
      </FormLayout>
      <EmployeeDrawer
        isDrawerOpen={isDrawerOpen}
        onCloseDrawer={onCloseDrawer}
        usedType={usedType as UsedTypeEnum}
        usedTypeId={usedTypeId}
        employeeName={employeeName}
      />
    </>
  );
};
