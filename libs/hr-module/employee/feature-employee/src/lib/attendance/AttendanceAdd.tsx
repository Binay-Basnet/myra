import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useGetEployeeOptions } from '@hr/common';

import { asyncToast, Box, FormSection, GridItem } from '@myra-ui';

import { AttendanceInput, useSetAttendanceMutation } from '@coop/cbs/data-access';
import { advancedTimeConvertor, ROUTES } from '@coop/cbs/utils';
import { FormDatePicker, FormInput, FormLayout, FormSelect } from '@coop/shared/form';

export const AttendanceAdd = () => {
  const router = useRouter();
  const methods = useForm<AttendanceInput>();
  const { getValues } = methods;

  const { employeeOptions } = useGetEployeeOptions();

  const { mutateAsync } = useSetAttendanceMutation();

  const submitForm = () => {
    const values = getValues();

    asyncToast({
      id: 'manual attendance',
      msgs: {
        success: 'manual attendance added succesfully',
        loading: 'adding manual attendance',
      },
      onSuccess: () => {
        router.push(ROUTES?.HRMODULE_ATTENDENCE_LIST);
      },
      promise: mutateAsync({
        id: null,
        input: {
          ...values,
          checkInTime: advancedTimeConvertor(values?.checkInTime),
          checkOutTime: advancedTimeConvertor(values?.checkOutTime),
        },
      }),
    });
  };
  return (
    <FormLayout methods={methods}>
      <FormLayout.Header title="Manual Attendance" />

      <FormLayout.Content>
        <FormLayout.Form>
          <FormSection templateColumns={2}>
            <GridItem colSpan={2}>
              <FormSelect name="employeeId" label="Employee" options={employeeOptions} />
            </GridItem>
            <FormDatePicker name="attendanceDate" label="Attendance Date" />
            <Box />
            <FormInput type="time" name="checkInTime" label="Checked in Time" />
            <FormInput type="time" name="checkOutTime" label="Checked out Time" />
          </FormSection>
        </FormLayout.Form>{' '}
      </FormLayout.Content>
      <FormLayout.Footer mainButtonLabel="Save" mainButtonHandler={submitForm} />
    </FormLayout>
  );
};

export default AttendanceAdd;
