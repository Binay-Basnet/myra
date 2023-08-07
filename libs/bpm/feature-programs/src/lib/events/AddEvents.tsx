import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import { omit } from 'lodash';

import { asyncToast } from '@myra-ui';

import {
  BpmEventInput,
  useGetDepartmentListQuery,
  useGetEventsEditDataQuery,
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
  dateEntry?:
    | ({
        date: string | null | Record<'local' | 'en' | 'np', string> | undefined;
        startTime: string | null;
        endTime: string | null;
      } | null)[]
    | null;
  singleDayDate?: Record<'local' | 'en' | 'np', string> | null;
  singlDayStart?: string | null;
  singleDayEnd?: string | null;
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
        date: item?.date,
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

  const itemData = useGetEventsEditDataQuery(
    {
      id: id as string,
    },
    {
      enabled: router?.asPath?.includes('edit'),
    }
  );
  const itemFormData = itemData?.data?.bpm?.programs?.eventDetails?.overview;

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
        'scheduledById',
        'eventDates',
        'note',
        'eventName',
      ]);

      methods?.reset({
        ...filteredValues,
        // time: dayjs(itemFormData?.time)?.format('HH:mm'),
        scheduledBy: itemFormData?.scheduledById,
        name: itemFormData?.eventName as string,
        eventType: itemFormData?.eventType ?? undefined,
        notes: itemFormData?.note,
        dateEntry:
          itemFormData?.eventDays === 'MULTIPLE_DAYS'
            ? itemFormData?.eventDates?.map((d) => ({
                date: d?.date,
                startTime: dayjs(d?.startTime)?.format('HH:mm'),
                endTime: dayjs(d?.endTime)?.format('HH:mm'),
              }))
            : [],
        position: itemFormData?.position as string,
        singleDayDate:
          itemFormData?.eventDays === 'SINGLE_DAY' ? itemFormData?.eventDates?.[0]?.date : null,
        singlDayStart:
          itemFormData?.eventDays === 'SINGLE_DAY'
            ? dayjs(itemFormData?.eventDates?.[0]?.startTime).format('HH:mm')
            : null,
        singleDayEnd:
          itemFormData?.eventDays === 'SINGLE_DAY'
            ? dayjs(itemFormData?.eventDates?.[0]?.endTime).format('HH:mm')
            : null,

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
