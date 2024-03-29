import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useGetEployeeOptions, useGetLeaveTypeOptions } from '@hr/common';

import { asyncToast, Column, FormSection, GridItem, Table } from '@myra-ui';

import {
  LeaveInput,
  useGetEmployeeLeaveListQuery,
  useGetLeaveQuery,
  useSetNewLeaveMutation,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { FormDatePicker, FormInput, FormLayout, FormSelect, FormTextArea } from '@coop/shared/form';

export const HrLeaveAdd = () => {
  const methods = useForm();
  const router = useRouter();
  const { getValues, reset, watch, setValue } = methods;

  const { employeeOptions } = useGetEployeeOptions();
  const { leaveTypeOptions } = useGetLeaveTypeOptions();

  const { mutateAsync } = useSetNewLeaveMutation();
  const { data: leaveData } = useGetLeaveQuery(
    {
      id: router?.query?.['id'] as string,
    },
    { enabled: !!router?.query?.['id'] }
  );

  const leaveEditData = leaveData?.hr?.employee?.leave?.getLeave?.record;

  const employeeIdWatch = watch('employeeId');

  const { data: employeeLeaveList, isFetching } = useGetEmployeeLeaveListQuery(
    {
      employeeId: employeeIdWatch as string,
    },
    { enabled: !!employeeIdWatch }
  );

  const rowData = useMemo(
    () => employeeLeaveList?.hr?.employee?.leave?.getLeaveLists?.data ?? [],
    [employeeLeaveList]
  );
  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Leave Type',
        accessorFn: (row) => row?.leaveTypeName,
      },
      {
        header: 'Total Allocated',
        accessorFn: (row) => row?.allocatedDays,
      },
      {
        header: 'Used Leaves',
        accessorFn: (row) => row?.usedDays,
      },
      {
        header: 'Available Leaves',
        accessorFn: (row) => row?.remainingDays,
      },
    ],
    []
  );

  useEffect(() => {
    if (leaveEditData) {
      reset(leaveEditData);
    }
  }, [JSON.stringify(leaveEditData)]);

  const fromDateWatch = watch('leaveFrom');
  const toDateWatch = watch('leaveTo');

  useEffect(() => {
    const startDate = new Date(fromDateWatch?.en) as unknown as number;
    const endDate = new Date(toDateWatch?.en) as unknown as number;

    // Calculate the difference in milliseconds
    const timeDifference = endDate - startDate;

    // Convert milliseconds to days
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24) || 0;
    setValue('totalLeaveDays', daysDifference);
  }, [fromDateWatch, toDateWatch]);

  const submitForm = () => {
    if (router?.query?.['id']) {
      asyncToast({
        id: 'edit-new-leave',
        msgs: {
          success: 'leave edited succesfully',
          loading: 'editing leave',
        },
        onSuccess: () => {
          router.push(ROUTES?.HRMODULE_LEAVE_LIST);
        },
        promise: mutateAsync({
          id: router?.query?.['id'] as string,
          input: getValues() as LeaveInput,
        }),
      });
    } else {
      asyncToast({
        id: 'add-new-leave',
        msgs: {
          success: 'new leave added succesfully',
          loading: 'adding new leave',
        },
        onSuccess: () => {
          router.push(ROUTES?.HRMODULE_LEAVE_LIST);
        },
        promise: mutateAsync({
          id: null,
          input: getValues() as LeaveInput,
        }),
      });
    }
  };
  return (
    <FormLayout methods={methods}>
      <FormLayout.Header title="Leave Application" />

      <FormLayout.Content>
        <FormLayout.Form>
          <FormSection templateColumns={3} divider>
            <GridItem colSpan={2}>
              <FormSelect name="employeeId" label="Employee" options={employeeOptions} />
            </GridItem>
            <FormSelect name="leaveTypeId" label="Leave Type" options={leaveTypeOptions} />
          </FormSection>
          {employeeIdWatch && (
            <FormSection templateColumns={3} divider header="Allocated Leaves">
              <GridItem colSpan={3} p="s4">
                <Table
                  data={rowData}
                  columns={columns}
                  variant="report"
                  size="report"
                  isStatic
                  isLoading={isFetching}
                />
              </GridItem>
            </FormSection>
          )}
          <FormSection templateColumns={3} divider>
            <FormDatePicker name="leaveFrom" label="From Date" />
            <FormDatePicker name="leaveTo" label="To Date" />
            <FormInput name="totalLeaveDays" label="Total Leave Days" isDisabled />
            <GridItem colSpan={3}>
              <FormTextArea name="leaveNote" label="Reason" isRequired />
            </GridItem>
          </FormSection>
        </FormLayout.Form>{' '}
      </FormLayout.Content>
      <FormLayout.Footer mainButtonLabel="Save" mainButtonHandler={submitForm} />
    </FormLayout>
  );
};

export default HrLeaveAdd;
