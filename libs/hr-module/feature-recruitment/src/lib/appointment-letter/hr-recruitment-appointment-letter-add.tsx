import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { asyncToast, FormSection, GridItem } from '@myra-ui';

import {
  AppointmentLetterInput,
  AppointmentTermInput,
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
  const { getValues } = methods;

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

  const jobApplicationOptions =
    jobApplicationData?.hr?.recruitment?.recruitmentJobApplication?.listJobApplication?.edges?.map(
      (item) => ({
        label: item?.node?.name as string,
        value: item?.node?.id as string,
      })
    );

  const submitForm = () => {
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
