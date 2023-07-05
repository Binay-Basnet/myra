import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { omit } from 'lodash';

import { asyncToast, FormSection, GridItem } from '@myra-ui';

import {
  AppointmentLetterInput,
  AppointmentTermInput,
  useGetAppointmentLetterQuery,
  useGetJobApplicationListQuery,
  useSetAppointmentLetterMutation,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import {
  FormDatePicker,
  FormEditableTable,
  FormLayout,
  FormSelect,
  FormTextArea,
} from '@coop/shared/form';
import { getPaginationQuery } from '@coop/shared/utils';

export const HrRecruitmentAppointmentLetterAdd = () => {
  const methods = useForm();
  const router = useRouter();
  const { getValues, reset } = methods;

  const { data: jobApplicationData } = useGetJobApplicationListQuery({
    pagination: {
      ...getPaginationQuery(),
      first: -1,
      order: {
        arrange: 'ASC',
        column: 'ID',
      },
    },
  });

  const { mutateAsync } = useSetAppointmentLetterMutation();
  const { data: appointmentLetterData } = useGetAppointmentLetterQuery(
    { id: router?.query?.['id'] as string },
    { enabled: !!router?.query?.['id'] }
  );

  const appointmentLetterEditData =
    appointmentLetterData?.hr?.recruitment?.recruitmentAppointmentLetter?.getAppointmentLetter
      ?.data;

  useEffect(() => {
    if (appointmentLetterEditData) {
      reset(appointmentLetterEditData);
    }
  }, [JSON.stringify(appointmentLetterEditData)]);

  const jobApplicationOptions =
    jobApplicationData?.hr?.recruitment?.recruitmentJobApplication?.listJobApplication?.edges?.map(
      (item) => ({
        label: item?.node?.name as string,
        value: item?.node?.id as string,
      })
    );

  const submitForm = () => {
    if (router?.query?.['id']) {
      asyncToast({
        id: 'edit-appointment-letter',
        msgs: {
          success: 'appointment letter edited succesfully',
          loading: 'editing appointment letter',
        },
        onSuccess: () => {
          router.push(ROUTES?.HR_RECRUITMENT_APPOINTMENT_LETTER_LIST);
        },
        promise: mutateAsync({
          id: router?.query?.['id'] as string,
          input: {
            ...(omit({ ...getValues() }, ['id']) as AppointmentLetterInput),
          },
        }),
      });
    } else {
      asyncToast({
        id: 'add-appointment-letter',
        msgs: {
          success: 'new appointment letter added succesfully',
          loading: 'adding new appointment letter',
        },
        onSuccess: () => {
          router.push(ROUTES?.HR_RECRUITMENT_APPOINTMENT_LETTER_LIST);
        },
        promise: mutateAsync({
          id: null,
          input: {
            ...(getValues() as AppointmentLetterInput),
          },
        }),
      });
    }
  };
  return (
    <FormLayout methods={methods}>
      <FormLayout.Header title="New Appointment Letter" />

      <FormLayout.Content>
        <FormLayout.Form>
          <FormSection templateColumns={3} divider>
            <GridItem colSpan={2}>
              <FormSelect
                name="jobApplication"
                label="Job Application"
                options={jobApplicationOptions}
              />
            </GridItem>
            <FormDatePicker name="appointmentDate" label="Appointment Date" />
          </FormSection>
          <FormSection templateColumns={3} divider>
            <GridItem colSpan={3}>
              <FormTextArea name="body" label="Body" />
            </GridItem>
          </FormSection>
          <FormSection templateColumns={3} header="Terms" divider>
            <GridItem colSpan={4}>
              <FormEditableTable<AppointmentTermInput>
                name="appointmentTerms"
                columns={[
                  {
                    accessor: 'title',
                    header: 'Title',
                    cellWidth: 'lg',
                  },
                  {
                    accessor: 'description',
                    header: 'Description',
                    cellWidth: 'lg',
                  },
                ]}
              />
            </GridItem>
          </FormSection>
        </FormLayout.Form>{' '}
      </FormLayout.Content>
      <FormLayout.Footer mainButtonLabel="Save" mainButtonHandler={submitForm} />
    </FormLayout>
  );
};

export default HrRecruitmentAppointmentLetterAdd;
