import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import { omit } from 'lodash';

import { asyncToast } from '@myra-ui';

import {
  BpmMeetingInput,
  useGetDepartmentListQuery,
  useGetMeetingsEditDataQuery,
  useSetBpmMeetingsMutation,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { FormLayout } from '@coop/shared/form';

import {
  BPMAttendanceTable,
  MeetingsAgenda,
  MeetingsBasicDetails,
  MeetingsDepartmentSelect,
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

type CustomBPMInput = Omit<BpmMeetingInput, 'departmentIds'> & {
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
};

export const BPMMeetingsAdd = () => {
  const methods = useForm<CustomBPMInput>();
  const router = useRouter();
  const id = router?.query['id'];

  const { mutateAsync } = useSetBpmMeetingsMutation();

  const submitForm = () => {
    const data = methods.getValues();
    const activityDetails =
      data?.itemDetails?.map((item) => ({
        attendeesId: item?.attendee,
      })) || [];
    const date = data?.date;
    const time = data?.time;
    const dateTime = dayjs(`${date?.en}T${time}`);
    const formattedDateTime = dateTime.format('YYYY-MM-DDTHH:mm:ss.SSSSSSZ');

    const filteredValues = omit({ ...data }, ['position', 'department', 'itemDetails']);

    const departmentIds =
      filteredValues?.departmentIds && filteredValues?.departmentIds?.length !== 0
        ? filteredValues?.departmentIds?.map((t) => t.value)
        : null;

    asyncToast({
      id: 'bpm-meeting',
      msgs: {
        success: 'Meeting Added Successfully',
        loading: 'Adding Meeting',
      },
      onSuccess: () => {
        router.push(ROUTES?.BPM_PROGRAMS_MEETINGS_LIST);
      },
      promise: mutateAsync({
        id: id ? (id as string) : null,
        data: {
          ...filteredValues,
          departmentIds,
          attendeesId: activityDetails?.map((d) => d?.attendeesId),
          time: formattedDateTime,
        } as BpmMeetingInput,
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
        time: dayjs(itemFormData?.time)?.format('HH:mm'),
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
          <MeetingsBasicDetails />
          <MeetingsDepartmentSelect />
          <BPMAttendanceTable />
          <MeetingsAgenda />
        </FormLayout.Form>
      </FormLayout.Content>
      <FormLayout.Footer mainButtonLabel="Save" mainButtonHandler={submitForm} />
    </FormLayout>
  );
};

export default BPMMeetingsAdd;

// const convertTime = (timeString: string) => {
//   const selectedTime = timeString;
//   const parsedTime = selectedTime.split(':');
//   const hours = parseInt(parsedTime[0]);
//   const minutes = parseInt(parsedTime[1]);
//   let formattedTime;
//   if (hours === 0) {
//     formattedTime = `12:${minutes.toString().padStart(2, '0')} AM`;
//   } else if (hours < 12) {
//     formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
//       .toString()
//       .padStart(2, '0')} AM`;
//   } else if (hours === 12) {
//     formattedTime = `12:${minutes.toString().padStart(2, '0')} PM`;
//   } else {
//     formattedTime = `${(hours - 12).toString().padStart(2, '0')}:${minutes
//       .toString()
//       .padStart(2, '0')} PM`;
//   }

//   return formattedTime;
// };
