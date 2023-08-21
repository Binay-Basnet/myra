import { useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Box, FormSection, Grid } from '@myra-ui';
import { Column } from '@myra-ui/editable-table';

import {
  BpmEventInput,
  EventDays,
  useGetBpmEmployeeDetailsQuery,
  useGetEmployeeListQuery,
} from '@coop/cbs/data-access';
import {
  FormDatePicker,
  FormEditableTable,
  FormInput,
  FormSelect,
  FormSwitchTab,
} from '@coop/shared/form';

const daysType = [
  {
    label: 'Single Day',
    value: EventDays.SingleDay,
  },
  {
    label: 'Multi Days',
    value: EventDays.MultipleDays,
  },
];
type ActivityInputType = {
  date: string;
  startTime: string;
  endTime: string;
};

export const EventsDateAndTime = () => {
  const methods = useFormContext<BpmEventInput & { position: string }>();
  const { watch } = methods;
  const selectedDays = watch('eventDays') as EventDays;

  const tableColumns: Column<ActivityInputType>[] = [
    {
      accessor: 'date',
      header: 'Date',
      cellWidth: 'auto',
      fieldType: 'date',
    },
    {
      accessor: 'startTime',
      header: 'Start Time',
      // hidden: true,
      isTime: true,
    },
    {
      accessor: 'endTime',
      header: 'End Time',
      // hidden: true,
      isTime: true,
    },
  ];
  const [triggerQuery, setTriggerQuery] = useState(false);

  const { setValue } = methods;
  const id = watch('scheduledBy');

  const { data: EmployeeData } = useGetBpmEmployeeDetailsQuery(
    {
      employeeId: String(id),
    },
    { enabled: triggerQuery && !!id }
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
    <FormSection header="Event Date & Time" flexLayout>
      <Grid templateColumns="repeat(2,1fr)" gap="s20" rowGap="s16">
        <FormSwitchTab name="eventDays" label="Select Days" options={daysType} />
      </Grid>
      {selectedDays && selectedDays === 'SINGLE_DAY' && (
        <Box display="flex" flexDirection="column" gap="s32">
          <Grid templateColumns="repeat(2,1fr)" gap="s20" rowGap="s16">
            <FormDatePicker name="singleDayDate" label="Select Days" />
          </Grid>
          <Grid templateColumns="repeat(2,1fr)" gap="s20" rowGap="s16">
            <FormInput type="time" name="singlDayStart" label="Start Time" />
            <FormInput type="time" name="singleDayEnd" label="End Time" />
          </Grid>
        </Box>
      )}
      {selectedDays && selectedDays === 'MULTIPLE_DAYS' && (
        <Box pt="s32">
          <FormEditableTable<ActivityInputType> name="dateEntry" columns={tableColumns} />
        </Box>
      )}
      <Grid templateColumns="repeat(2,1fr)" gap="s20" rowGap="s16" pt="s32">
        <FormSelect name="scheduledBy" label="Scheduled By" options={employeeOptions} />
        <FormInput name="position" label="Position" isDisabled />
      </Grid>
    </FormSection>
  );
};
