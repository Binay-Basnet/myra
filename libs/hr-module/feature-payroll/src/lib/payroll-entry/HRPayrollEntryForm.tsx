import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import {
  useGetDepartmentOptions,
  useGetDesignationOptions,
  useGetSalaryAssignmentsWithExtraDetails,
} from '@hr/common';
import { filter, includes } from 'lodash';

import { asyncToast, Button, FormSection, GridItem } from '@myra-ui';

import {
  PayrollStatus,
  useApprovePayollRunMutation,
  useGetBranchListQuery,
  useGetPayrollRunQuery,
  useSetPayrollRunMutation,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { FormEditableTable, FormLayout, FormSelect } from '@coop/shared/form';

import { PayrollEntryBasicDetails } from '../../components';

export const HrPayrollEntryUpsert = () => {
  const [showTable, setShowTable] = useState(false);
  const router = useRouter();

  const isApprove = router?.query?.['type'] === 'approve';
  const isDetail = router?.query?.['type'] === 'details';

  const methods = useForm();
  const { getValues, reset, watch, setValue } = methods;

  const { departmentOptions } = useGetDepartmentOptions();
  const { designationOptions } = useGetDesignationOptions();

  const serviceCenterWatch = watch('serviceCenter');
  const departmentWatch = watch('department');
  const designationWatch = watch('designation');

  const salaryAssignmentData = useGetSalaryAssignmentsWithExtraDetails({
    serviceCenter: serviceCenterWatch,
    department: departmentWatch,
    designation: designationWatch,
  });

  useEffect(() => {
    if (!router?.query?.['id']) {
      setValue('salaryAssignments', salaryAssignmentData);
    }
  }, [JSON.stringify(salaryAssignmentData)]);

  const { mutateAsync } = useSetPayrollRunMutation();
  const { mutateAsync: payrollRunApproveMutateAsync } = useApprovePayollRunMutation();

  const { data: payrollRun } = useGetPayrollRunQuery(
    { id: router?.query?.['id'] as string },
    { enabled: !!router?.query?.['id'] }
  );

  const payrollRunEditData = payrollRun?.hr?.payroll?.payrollRun?.getPayrollRun?.data;

  useEffect(() => {
    if (payrollRunEditData) {
      const employeeList = filter(salaryAssignmentData, (obj) =>
        includes(payrollRunEditData?.salaryAssignments, obj.id)
      );

      reset({ ...payrollRunEditData, salaryAssignments: employeeList });
    }
  }, [JSON.stringify(payrollRunEditData), JSON.stringify(salaryAssignmentData)]);

  const { data: branchData } = useGetBranchListQuery({
    paginate: {
      after: '',
      first: -1,
    },
  });

  const serviceCenterOptions = branchData?.settings?.general?.branch?.list?.edges?.map((data) => ({
    label: data?.node?.name as string,
    value: data?.node?.id as string,
  }));

  const submitForm = () => {
    const values = getValues();
    const salaryAssignmentIdList = values?.salaryAssignments?.map(
      (item: { id: string }) => item?.id
    );

    if (router?.query?.['id']) {
      asyncToast({
        id: 'edit-payroll-run',
        msgs: {
          success: 'payroll run edited successfully',
          loading: 'editing payroll run',
        },
        onSuccess: () => {
          router.push(ROUTES?.HR_PAYROLL_ENTRY_LIST);
        },
        promise: mutateAsync({
          id: router?.query?.['id'] as string,
          input: {
            ...values,
            salaryAssignments: salaryAssignmentIdList,
          },
        }),
      });
    } else {
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
          id: null,
          input: {
            ...values,
            salaryAssignments: salaryAssignmentIdList,
          },
        }),
      });
    }
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
        loading: 'Rejcting payroll run',
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

  return (
    <FormLayout methods={methods}>
      <FormLayout.Header title="Payroll Run" />
      <FormLayout.Content>
        <FormLayout.Form>
          <PayrollEntryBasicDetails />
          {!router?.query?.['id'] && (
            <FormSection header="Employees" divider>
              <FormSelect name="branchId" label="Service Center" options={serviceCenterOptions} />
              <FormSelect name="departmentId" label="Department" options={departmentOptions} />
              <FormSelect name="designationId" label="Designation" options={designationOptions} />
              <Button variant="outline" onClick={() => setShowTable(true)}>
                Get Employees
              </Button>
            </FormSection>
          )}
          {(showTable || router?.query?.['id']) && (
            <FormSection header="Employees" divider>
              <GridItem colSpan={4}>
                <FormEditableTable
                  name="salaryAssignments"
                  canAddRow={false}
                  columns={[
                    {
                      accessor: 'employeeName',
                      header: 'Employee Name',
                      cellWidth: 'lg',
                      getDisabled: () => true,
                    },
                    {
                      accessor: 'paidDays',
                      header: 'Paid Days',
                      getDisabled: () => true,
                    },
                    {
                      accessor: 'grossPay',
                      header: 'Gross Pay',
                      getDisabled: () => true,
                    },
                    {
                      accessor: 'deductions',
                      header: 'Deductions',
                      getDisabled: () => true,
                    },
                    {
                      accessor: 'netPay',
                      header: 'Net Pay',
                      getDisabled: () => true,
                    },
                  ]}
                />
              </GridItem>
            </FormSection>
          )}
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
  );
};
