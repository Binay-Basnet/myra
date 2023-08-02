import { useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { FormSection } from '@myra-ui';

import {
  BpmMeetingInput,
  MeetingType,
  useGetBpmEmployeeDetailsQuery,
  useGetEmployeeListQuery,
} from '@coop/cbs/data-access';
import { FormDatePicker, FormInput, FormSelect } from '@coop/shared/form';

const meetingType = [
  {
    label: 'BOD',
    value: MeetingType?.Bod,
  },
  {
    label: 'AGM',
    value: MeetingType?.Agm,
  },
  {
    label: 'Casual',
    value: MeetingType?.Casual,
  },
  {
    label: 'BOD',
    value: MeetingType?.Other,
  },
];

export const MeetingsBasicDetails = () => {
  const [triggerQuery, setTriggerQuery] = useState(false);

  const methods = useFormContext<BpmMeetingInput & { position: string }>();
  const { watch, setValue } = methods;
  const id = watch('scheduledBy');

  const { data: EmployeeData } = useGetBpmEmployeeDetailsQuery(
    {
      employeeId: String(id),
    },
    { enabled: triggerQuery }
  );

  useEffect(() => {
    if (id) {
      setTriggerQuery(true);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      const employeeValue = EmployeeData?.bpm?.programs?.getEmployeeDetails?.designation;

      setValue('position', String(employeeValue));
    }
  }, [id, EmployeeData, setValue]);

  const { data: getEmployeeList } = useGetEmployeeListQuery({
    pagination: {
      after: '',
      first: -1,
    },
  });
  const employeeList = useMemo(
    () => getEmployeeList?.hr?.employee?.employee?.listEmployee?.edges ?? [],
    [getEmployeeList]
  );
  const employeeOptions = employeeList?.map((data) => ({
    label: data?.node?.employeeName as string,
    value: data?.node?.id as string,
  }));
  return (
    <FormSection header="Basic Details" templateColumns={2}>
      <FormInput name="title" label="Meeting Title" />
      <FormSelect name="type" label="Meeting Type" options={meetingType} />
      <FormDatePicker name="date" label="Select Date" />
      <FormInput name="time" label="Meeting Time" type="time" />
      <FormSelect name="scheduledBy" label="Scheduled By" options={employeeOptions} />
      <FormInput name="position" label="Position" isDisabled />
    </FormSection>
  );
};
