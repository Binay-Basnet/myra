import { useForm } from 'react-hook-form';

import { asyncToast, FormSection, GridItem } from '@myra-ui';

import {
  JobOfferTermInput,
  JobOpeningInput,
  JobStatus,
  useGetDepartmentListQuery,
  useGetDesignationListQuery,
  useGetStaffPlanningListQuery,
  useSetJobOpeningMutation,
} from '@coop/cbs/data-access';
import {
  FormDatePicker,
  FormEditableTable,
  FormInput,
  FormLayout,
  FormSelect,
} from '@coop/shared/form';
import { getPaginationQuery } from '@coop/shared/utils';

export const HrRecruitmentJobOfferAdd = () => {
  const methods = useForm();
  const { getValues } = methods;

  const { data: staffPlanData } = useGetStaffPlanningListQuery({
    pagination: {
      ...getPaginationQuery(),
      first: -1,
      order: {
        arrange: 'ASC',
        column: 'ID',
      },
    },
  });
  const { data: departmentData } = useGetDepartmentListQuery({
    pagination: {
      ...getPaginationQuery(),
      first: -1,
      order: {
        arrange: 'ASC',
        column: 'ID',
      },
    },
  });
  const { data: designationData } = useGetDesignationListQuery({
    pagination: {
      ...getPaginationQuery(),
      first: -1,
      order: {
        arrange: 'ASC',
        column: 'ID',
      },
    },
  });

  const { mutateAsync } = useSetJobOpeningMutation();

  const staffPlanningOptions =
    staffPlanData?.hr?.recruitment?.recruitment?.listStaffPlanning?.edges?.map((item) => ({
      label: item?.node?.staffPlanTitle as string,
      value: item?.node?.id as string,
    }));

  const departmentOptions =
    departmentData?.settings?.general?.HCM?.employee?.listDepartment?.edges?.map((item) => ({
      label: item?.node?.name as string,
      value: item?.node?.id as string,
    }));

  const designationOptions =
    designationData?.settings?.general?.HCM?.employee?.listDesignation?.edges?.map((item) => ({
      label: item?.node?.name as string,
      value: item?.node?.id as string,
    }));

  const statusOptions = [
    { label: 'Accepted', value: JobStatus?.Accepted },
    { label: 'Awaiting Response', value: JobStatus?.AwaitingResponse },
    { label: 'Rejected', value: JobStatus?.Rejected },
  ];

  const submitForm = () => {
    asyncToast({
      id: 'add-job-opening',
      msgs: {
        success: 'new job opening added succesfully',
        loading: 'adding new job opening',
      },
      onSuccess: () => {},
      promise: mutateAsync({
        id: null,
        input: {
          ...getValues(),
        } as unknown as JobOpeningInput,
      }),
    });
  };
  return (
    <FormLayout methods={methods}>
      <FormLayout.Header title="New Job Offer" />

      <FormLayout.Content>
        <FormLayout.Form>
          <FormSection templateColumns={3} divider>
            <GridItem colSpan={2}>
              <FormInput name="jobApplicant" type="text" label="Job Applicant" />
            </GridItem>
            <FormSelect name="jobStatus" label="Status" options={statusOptions} />
            <FormSelect name="jobDepartment" label="Department" options={departmentOptions} />
            <FormSelect name="jobDesignation" label="Designation" options={designationOptions} />
            <FormDatePicker name="jobOfferDate" label="Offer Date" />
          </FormSection>
          <FormSection templateColumns={3} divider>
            <GridItem colSpan={4}>
              <FormEditableTable<JobOfferTermInput>
                name="jobOfferTerms"
                columns={[
                  {
                    accessor: 'offerTerm',
                    header: 'Offer Terms',
                    cellWidth: 'lg',
                  },
                  {
                    accessor: 'value',
                    header: 'Value',
                    isNumeric: true,
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

export default HrRecruitmentJobOfferAdd;
