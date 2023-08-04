import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useGetEployeeOptions, useGetLeavePolicyOptions, useGetLeaveTypeOptions } from '@hr/common';

import { asyncToast, FormSection, GridItem } from '@myra-ui';

import {
  AllocationTypeInput,
  LeaveAllocationFor,
  LeaveAllocationInput,
  useGetLeaveAllocationQuery,
  useGetLeavePolicyQuery,
  useSetLeaveAllocationMutation,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import {
  FormCheckbox,
  FormDatePicker,
  FormEditableTable,
  FormLayout,
  FormSelect,
  FormTextArea,
} from '@coop/shared/form';

export const LeaveAllocationAdd = () => {
  const methods = useForm();
  const router = useRouter();
  const { getValues, reset, watch, setValue } = methods;

  const { employeeOptions } = useGetEployeeOptions();
  const { leavePolicyOptions } = useGetLeavePolicyOptions();
  const { leaveTypeOptions } = useGetLeaveTypeOptions();

  const { mutateAsync } = useSetLeaveAllocationMutation();

  const { data: leaveAllocationData } = useGetLeaveAllocationQuery(
    {
      id: router?.query?.['id'] as string,
    },
    { enabled: !!router?.query?.['id'] }
  );

  const leaveAllocationEditData =
    leaveAllocationData?.hr?.employee?.leaveAllocation?.getLeaveAllocation?.data;

  useEffect(() => {
    if (leaveAllocationEditData) {
      reset(leaveAllocationEditData);
    }
  }, [JSON.stringify(leaveAllocationEditData)]);

  const leavePolicyWatch = watch('leavePolicy');

  const { data: leavePolicy } = useGetLeavePolicyQuery(
    { id: leavePolicyWatch },
    { enabled: !!leavePolicyWatch }
  );

  const leavePolicyData =
    leavePolicy?.settings?.general?.HCM?.employee?.leavePolicy?.getLeavePolicy?.record
      ?.leavePolicyDetails;

  useEffect(() => {
    if (leavePolicyData && !router?.query?.['id']) {
      setValue(
        'allocation',
        leavePolicyData?.map((item) => ({
          leaveId: item?.leaveTypeId,
        }))
      );
    }
  }, [leavePolicyData]);

  const submitForm = () => {
    const values = getValues();
    const allocation = values?.allocation?.map((item) => ({
      leaveId: item?.leaveId,
      newLeaveAllocated: item?.newLeaveAllocated,
      totalLeavesAllocated: item?.totalLeavesAllocated,
    }));
    asyncToast({
      id: 'add-new-leave-allocation',
      msgs: {
        success: 'new leave allocation added succesfully',
        loading: 'adding new leave allocation',
      },
      onSuccess: () => {
        router.push(ROUTES?.HRMODULE_LEAVE_ALLOCATION_LIST);
      },
      promise: mutateAsync({
        id: null,
        input: {
          ...values,
          leaveAllocationFor: LeaveAllocationFor?.Employee,
          allocation: allocation as AllocationTypeInput,
        } as LeaveAllocationInput,
      }),
    });
  };
  return (
    <FormLayout methods={methods}>
      <FormLayout.Header title="Leave Application" />

      <FormLayout.Content>
        <FormLayout.Form>
          <FormSection templateColumns={3} divider>
            <FormSelect name="empLevDepDesig" label="Employee" options={employeeOptions} />
            <FormSelect name="leavePolicy" label="Leave Policy" options={leavePolicyOptions} />
            <FormDatePicker name="effectiveFrom" label="Effective From" />
            <GridItem colSpan={3}>
              <FormTextArea name="description" label="Description" />
            </GridItem>

            <GridItem colSpan={3}>
              <FormCheckbox
                name="addUnusedLeaveFromPreviousSection"
                label="Add unused leaves from previous allocation"
              />
            </GridItem>
          </FormSection>
          <FormSection templateColumns={3} header="Allocation" divider>
            <GridItem colSpan={3}>
              <FormEditableTable
                name="allocation"
                canAddRow={false}
                columns={[
                  {
                    accessor: 'leaveId',
                    header: 'Leave Type',
                    fieldType: 'select',
                    selectOptions: leaveTypeOptions,
                    getDisabled: () => true,
                  },
                  {
                    accessor: 'leaveAllocated',
                    header: 'Leave Allocated',
                    getDisabled: () => true,
                    isNumeric: true,
                    accessorFn: (row) =>
                      leavePolicyData?.find((item) => item?.leaveTypeId === row?.leaveId)
                        ?.annualAllocation as number,
                  },
                  {
                    accessor: 'newLeaveAllocated',
                    header: 'New Leave Allocated',
                    isNumeric: true,
                  },
                  {
                    accessor: 'totalLeavesAllocated',
                    header: 'Total Leave Allocated',
                    accessorFn: (row) =>
                      Number(row?.leaveAllocated) + Number(row?.newLeaveAllocated) ||
                      row?.leaveAllocated,
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

export default LeaveAllocationAdd;
