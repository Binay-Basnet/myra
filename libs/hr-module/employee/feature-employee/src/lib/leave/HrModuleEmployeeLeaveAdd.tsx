import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { asyncToast, FormSection, GridItem } from '@myra-ui';

import {
  LeaveInput,
  useGetEmployeeLeaveTypeListQuery,
  useGetEmployeeListQuery,
  useSetNewLeaveMutation,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { FormDatePicker, FormLayout, FormSelect, FormTextArea } from '@coop/shared/form';
import { getPaginationQuery } from '@coop/shared/utils';

export const HrLeaveAdd = () => {
  const methods = useForm();
  const router = useRouter();
  const { getValues } = methods;

  const { data: employeeListData } = useGetEmployeeListQuery({
    pagination: {
      ...getPaginationQuery(),
      first: -1,
      order: {
        arrange: 'ASC',
        column: 'ID',
      },
    },
  });

  const { data: leaveTypeData } = useGetEmployeeLeaveTypeListQuery({
    pagination: {
      ...getPaginationQuery(),
      first: -1,
      order: {
        arrange: 'ASC',
        column: 'ID',
      },
    },
  });

  const { mutateAsync } = useSetNewLeaveMutation();

  const employeeOptions = employeeListData?.hr?.employee?.employee?.listEmployee?.edges?.map(
    (item) => ({
      label: item?.node?.employeeName as string,
      value: item?.node?.id as string,
    })
  );

  const leaveTypeOptions =
    leaveTypeData?.settings?.general?.HCM?.employee?.leave?.listLeaveType?.edges?.map((item) => ({
      label: item?.node?.name as string,
      value: item?.node?.id as string,
    }));

  const submitForm = () => {
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
          <FormSection templateColumns={3} divider>
            <FormDatePicker name="leaveFrom" label="From Date" />
            <FormDatePicker name="leaveTo" label="To Date" />
            <GridItem colSpan={3}>
              <FormTextArea name="leaveNote" label="Reason" />
            </GridItem>
          </FormSection>
        </FormLayout.Form>{' '}
      </FormLayout.Content>
      <FormLayout.Footer mainButtonLabel="Save" mainButtonHandler={submitForm} />
    </FormLayout>
  );
};

export default HrLeaveAdd;
