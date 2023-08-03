import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDeepCompareEffect } from 'react-use';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';

import { asyncToast, Box, Modal } from '@myra-ui';
import { Column } from '@myra-ui/editable-table';

import { useGetEmployeeListQuery, useSetAddMeetingAttendeesMutation } from '@coop/cbs/data-access';
import { FormEditableTable } from '@coop/shared/form';

import { useMeetingDetailsHook } from '../hooks/useMeetingDetails';

interface IUpdateBalanceProps {
  isOpen: boolean;
  onClose: () => void;
}
type AttendeeType = {
  attendee?: string;
  department?: string;
};

type FormType = {
  data?:
    | {
        attendee?: string;

        department?: string;
      }[]
    | null;
};
export const AddAttendeesModal = ({ isOpen, onClose }: IUpdateBalanceProps) => {
  const methods = useForm<FormType>({});
  const { watch, setValue } = methods;
  const { detailData } = useMeetingDetailsHook();
  const queryClient = useQueryClient();
  const router = useRouter();
  const id = router?.query['id'];

  const { mutateAsync: warehouseMutateAsync } = useSetAddMeetingAttendeesMutation();

  const onSubmit = () => {
    const values = methods.getValues();
    const attendeesList =
      values?.data?.map((item) => ({
        attendeesId: item?.attendee,
      })) || [];

    asyncToast({
      id: 'account-open-add-minor',
      promise: warehouseMutateAsync({
        meetingID: id as string,

        attendees: attendeesList?.map((d) => d?.attendeesId as string),
      }),
      msgs: {
        loading: 'Adding Attendees',
        success: 'Attendees Added Successfully',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['getMeetingsEditData']);
        handleUpdateModalClose();
        onClose();
        // router.push('/accounting/investment/investment-transaction/list');
      },
    });
  };
  const handleUpdateModalClose = () => {
    methods.reset({
      data: null,
    });
  };
  const { data: fullEmployee } = useGetEmployeeListQuery({
    pagination: {
      after: '',
      first: -1,
    },
  });

  const fullEmployeeList = useMemo(
    () => fullEmployee?.hr?.employee?.employee?.listEmployee?.edges ?? [],
    [fullEmployee]
  );
  const fullEmployeeOptions = fullEmployeeList?.map((data) => ({
    label: data?.node?.employeeName as string,
    value: data?.node?.id as string,
  }));

  const tableColumns: Column<AttendeeType>[] = [
    {
      accessor: 'attendee',
      header: 'Name',
      cellWidth: 'auto',
      fieldType: 'select',
      selectOptions: fullEmployeeOptions,
    },
    {
      accessor: 'department',
      header: 'Position',
      // hidden: true,
      getDisabled: () => true,
    },
  ];
  const itemDetails = watch('data');

  useDeepCompareEffect(() => {
    if (itemDetails?.length) {
      setValue(
        'data',
        itemDetails?.map((items: AttendeeType) => {
          const employeeDeginationName = fullEmployeeList?.find(
            (d) => d?.node?.id === items?.attendee
          )?.node?.designation;

          return {
            attendee: items?.attendee,
            department: employeeDeginationName as string,
          };
        })
      );
    }
  }, [itemDetails, fullEmployeeList]);

  const itemFormData = detailData?.overview?.attendees?.map((d) => ({
    attendee: d?.id,
    position: d?.designation,
  }));

  useEffect(() => {
    if (itemFormData) {
      methods?.reset({
        data: itemFormData?.map((items) => ({
          attendee: items?.attendee as string,

          department: String(items?.position),
        })),
      });
    }
  }, [id, isOpen]);

  return (
    <Modal
      title="Add Attendees"
      open={isOpen}
      onClose={onClose}
      primaryButtonLabel="Save"
      primaryButtonHandler={onSubmit}
    >
      <FormProvider {...methods}>
        <Box display="flex" flexDirection="column" gap="s24" py="s40">
          <FormEditableTable<AttendeeType> name="data" columns={tableColumns} />
        </Box>
      </FormProvider>
    </Modal>
  );
};
