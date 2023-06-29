import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { omit } from 'lodash';

import { asyncToast, FormSection, GridItem } from '@myra-ui';

import {
  JobOfferInput,
  JobOfferTermInput,
  JobStatus,
  useGetDepartmentListQuery,
  useGetDesignationListQuery,
  useGetJobApplicationListQuery,
  useGetJobOfferQuery,
  useSetJobOfferMutation,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { FormDatePicker, FormEditableTable, FormLayout, FormSelect } from '@coop/shared/form';
import { getPaginationQuery } from '@coop/shared/utils';

export const HrRecruitmentJobOfferAdd = () => {
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

  const { mutateAsync } = useSetJobOfferMutation();

  const { data: jobOfferData } = useGetJobOfferQuery(
    { id: router?.query?.['id'] as string },
    { enabled: !!router?.query?.['id'] }
  );
  const jobOfferEditData = jobOfferData?.hr?.recruitment?.recruitmentJobOffer?.getJobOffer?.data;

  useEffect(() => {
    if (jobOfferEditData) {
      reset(jobOfferEditData);
    }
  }, [JSON.stringify(jobOfferEditData)]);

  const jobApplicationOptions =
    jobApplicationData?.hr?.recruitment?.recruitmentJobApplication?.listJobApplication?.edges?.map(
      (item) => ({
        label: item?.node?.name as string,
        value: item?.node?.id as string,
      })
    );

  const departmentOptions =
    departmentData?.settings?.general?.HCM?.employee?.employee?.listDepartment?.edges?.map(
      (item) => ({
        label: item?.node?.name as string,
        value: item?.node?.id as string,
      })
    );

  const designationOptions =
    designationData?.settings?.general?.HCM?.employee?.employee?.listDesignation?.edges?.map(
      (item) => ({
        label: item?.node?.name as string,
        value: item?.node?.id as string,
      })
    );

  const statusOptions = [
    { label: 'Accepted', value: JobStatus?.Accepted },
    { label: 'Awaiting Response', value: JobStatus?.AwaitingResponse },
    { label: 'Rejected', value: JobStatus?.Rejected },
  ];

  const submitForm = () => {
    if (router?.query?.['id']) {
      asyncToast({
        id: 'edit-job-offering',
        msgs: {
          success: 'job offering edited succesfully',
          loading: 'editing job offering',
        },
        onSuccess: () => {
          router.push(ROUTES?.HR_RECRUITMENT_JOB_OFFER_LIST);
        },
        promise: mutateAsync({
          id: router?.query?.['id'] as string,
          input: {
            ...(omit({ ...getValues() }, ['id']) as JobOfferInput),
          },
        }),
      });
    } else {
      asyncToast({
        id: 'add-job-offering',
        msgs: {
          success: 'new job offering added succesfully',
          loading: 'adding new job offering',
        },
        onSuccess: () => {
          router.push(ROUTES?.HR_RECRUITMENT_JOB_OFFER_LIST);
        },
        promise: mutateAsync({
          id: null,
          input: {
            ...getValues(),
          } as JobOfferInput,
        }),
      });
    }
  };
  return (
    <FormLayout methods={methods}>
      <FormLayout.Header title="New Job Offer" />

      <FormLayout.Content>
        <FormLayout.Form>
          <FormSection templateColumns={3} divider>
            <GridItem colSpan={2}>
              <FormSelect
                name="jobApplicant"
                label="Job Applicant"
                options={jobApplicationOptions}
              />
            </GridItem>
            <FormSelect name="jobStatus" label="Status" options={statusOptions} />
            <FormSelect name="jobDepartment" label="Department" options={departmentOptions} />
            <FormSelect name="jobDesignation" label="Designation" options={designationOptions} />
            <FormDatePicker name="jobOfferDate" label="Offer Date" />
          </FormSection>
          <FormSection templateColumns={3} header="Job Offer Terms" divider>
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
