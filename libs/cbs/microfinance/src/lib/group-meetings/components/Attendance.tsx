import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';

import { asyncToast, Box, Button } from '@myra-ui';

import { MfMeetingMembers, useAddAttendanceMutation } from '@coop/cbs/data-access';
import { DetailsPageHeaderBox } from '@coop/shared/components';
import { FormEditableTable } from '@coop/shared/form';

export const Attendance = (props: { data: MfMeetingMembers[] }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data } = props;
  const methods = useForm();
  const { getValues, setValue } = methods;

  const { mutateAsync } = useAddAttendanceMutation();

  useEffect(() => {
    setValue('attendedMembers', data);
  }, [data]);

  const onSubmit = () => {
    const values = getValues();
    asyncToast({
      id: 'add-attendance',
      msgs: {
        success: 'new attendance added succesfully',
        loading: 'adding new attendance',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['mfMeetingsDetails']);
      },
      promise: mutateAsync({
        data: {
          meetingId: router?.query?.['id'] as string,
          attendedMembers: values?.attendedMembers?.map(
            (item: { id: string; invited: boolean }) => ({
              id: item?.id,
              attended: item?.invited || false,
            })
          ),
        },
      }),
    });
  };

  return (
    <>
      <DetailsPageHeaderBox title="Attendance" />
      <Box m="s24" p="s12" bg="white" borderRadius={5}>
        <FormProvider {...methods}>
          <Box display="flex" flexDir="column" gap="s8">
            <FormEditableTable
              name="attendedMembers"
              label="Member List"
              canAddRow={false}
              hideSN
              canDeleteRow={false}
              columns={[
                {
                  accessor: 'name',
                  header: 'Member Name',
                  getDisabled: () => true,
                  cellWidth: 'auto',
                },
                {
                  accessor: 'invited',
                  header: 'Invite',
                  fieldType: 'checkbox',
                },
              ]}
            />
            <Box display="flex" justifyContent="flex-end">
              <Button onClick={onSubmit}>Save Changes</Button>
            </Box>
          </Box>
        </FormProvider>
      </Box>
    </>
  );
};

export default Attendance;
