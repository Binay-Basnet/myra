import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { omit } from 'lodash';

import { asyncToast } from '@myra-ui';
import { ad2bs } from '@myra-ui/date-picker';

import {
  BpmEventInput,
  useGetDepartmentListQuery,
  useGetMeetingsEditDataQuery,
  useSetBpmAddEventsMutation,
} from '@coop/cbs/data-access';
import { ROUTES, timeConverter } from '@coop/cbs/utils';
import { FormLayout } from '@coop/shared/form';

import {
  EventsAttendanceTable,
  EventsBasicDetails,
  EventsDateAndTime,
  EventsDepartmentSelect,
  EventsNotes,
} from '../../components';

// type CustomOnboardingInput = Omit<EmployeeOnboardingInput, 'activity_details'> & {
//   activity_details?: {
//     isDone: boolean;
//     name: string;
//     userName: string;
//     role: string;
//     beginsOn: string;
//     duration: string;
//   }[];
// };

type CustomBPMInput = Omit<BpmEventInput, 'departmentIds' | 'dateEntry'> & {
  position?: string;
  department?: boolean;
  departmentIds: {
    label: string;
    value: string;
  }[];
  itemDetails?: {
    attendee: string;

    department: string;
  }[];
  dateEntry?: {
    date: string;
    startTime: string;
    endTime: string;
  }[];
  singleDayDate?: Record<'local' | 'en' | 'np', string> | null;
  singlDayStart?: string;
  singleDayEnd?: string;
};

export const BPMEventsAdd = () => {
  const methods = useForm<CustomBPMInput>();
  const router = useRouter();
  const id = router?.query['id'];

  const { mutateAsync } = useSetBpmAddEventsMutation();

  const submitForm = () => {
    const data = methods.getValues();
    const activityDetails =
      data?.itemDetails?.map((item) => ({
        attendeesId: item?.attendee,
      })) || [];

    const dateEntryDetails =
      data?.dateEntry?.map((item) => ({
        date: convertDate(item?.date),
        startTime: timeConverter(item?.startTime),
        endTime: timeConverter(item?.endTime),
      })) || [];
    // const date = data?.date;
    // const time = data?.time;
    // const dateTime = dayjs(`${date?.en}T${time}`);
    // const formattedDateTime = dateTime.format('YYYY-MM-DDTHH:mm:ss.SSSSSSZ');

    const filteredValues = omit({ ...data }, [
      'position',
      'department',
      'itemDetails',
      'singlDayStart',
      'singleDayDate',
      'singleDayEnd',
    ]);

    const departmentIds =
      filteredValues?.departmentIds && filteredValues?.departmentIds?.length !== 0
        ? filteredValues?.departmentIds?.map((t) => t.value)
        : null;
    const singleDaysArray = [
      {
        date: data?.singleDayDate,
        startTime: timeConverter(data?.singlDayStart),
        endTime: timeConverter(data?.singleDayEnd),
      },
    ];

    asyncToast({
      id: 'bpm-event',
      msgs: {
        success: 'Event Added Successfully',
        loading: 'Adding Event',
      },
      onSuccess: () => {
        router.push(ROUTES?.BPM_PROGRAMS_EVENTS_LIST);
      },
      promise: mutateAsync({
        Id: id ? (id as string) : null,
        data: {
          ...filteredValues,
          departmentIds,
          sendInvitationEmail: data?.sendInvitationEmail,
          attendeeIds: activityDetails?.map((d) => d?.attendeesId),
          dateEntry: data?.eventDays === 'SINGLE_DAY' ? singleDaysArray : dateEntryDetails,
        } as BpmEventInput,
      }),
    });
  };

  const itemData = useGetMeetingsEditDataQuery(
    {
      id: id as string,
    },
    {
      enabled: router?.asPath?.includes('edit'),
    }
  );
  const itemFormData = itemData?.data?.bpm?.programs?.meetingDetail?.overview;

  const { data: depeartmentData } = useGetDepartmentListQuery({
    pagination: {
      after: '',
      first: -1,
    },
  });

  const departmentList = useMemo(
    () => depeartmentData?.settings?.general?.HCM?.employee?.employee?.listDepartment?.edges ?? [],
    [depeartmentData]
  );
  const departmentOptions = departmentList?.map((data) => ({
    label: data?.node?.name as string,
    value: data?.node?.id as string,
  }));

  useEffect(() => {
    if (itemFormData) {
      const filteredValues = omit({ ...itemFormData }, [
        'attendees',
        'totalAttendees',
        'id',
        'position',
        'status',
      ]);

      methods?.reset({
        ...filteredValues,
        // time: dayjs(itemFormData?.time)?.format('HH:mm'),
        scheduledBy: itemFormData?.scheduledById,
        position: itemFormData?.position as string,
        department: !!itemFormData?.departmentIds?.length,
        departmentIds: itemFormData?.departmentIds?.map((item) => ({
          label: departmentOptions?.find((d) => d?.value === item)?.label,
          value: item as string,
        })),
        itemDetails: itemFormData?.attendees?.map((items) => ({
          attendee: items?.id as string,

          department: String(items?.designation),
        })),
      });
    }
  }, [id, itemFormData, methods]);

  return (
    <FormLayout methods={methods}>
      <FormLayout.Header title="New Meeting" />

      <FormLayout.Content>
        <FormLayout.Form>
          <EventsBasicDetails />
          <EventsDateAndTime />
          <EventsDepartmentSelect />
          <EventsAttendanceTable />
          <EventsNotes />
        </FormLayout.Form>
      </FormLayout.Content>
      <FormLayout.Footer mainButtonLabel="Save" mainButtonHandler={submitForm} />
    </FormLayout>
  );
};

export default BPMEventsAdd;

const convertDate = (dateString: string) => {
  const date = new Date(dateString);

  const convertedDate = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  };
  const bsDate = ad2bs(convertedDate.year, Number(convertedDate.month), Number(convertedDate.day));
  const nepaliDate = `${bsDate?.year}-${bsDate?.month.toString().padStart(2, '0')}-${bsDate?.day
    .toString()
    .padStart(2, '0')}`;

  const dateObj = { np: nepaliDate, en: dateString, local: '' };
  return dateObj;
};
