import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import omit from 'lodash/omit';

import { asyncToast, FormSection, GridItem } from '@myra-ui';

import {
  ApplicantStatus,
  DocumentInsertInput,
  JobApplicationInput,
  useGetJobApplicationQuery,
  useGetJobOpeningListQuery,
  useSetJobApplicationMutation,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import {
  FormAddress,
  FormEmailInput,
  FormFileInput,
  FormInput,
  FormLayout,
  FormPhoneNumber,
  FormRating,
  FormSelect,
  FormSwitch,
} from '@coop/shared/form';
import { getPaginationQuery } from '@coop/shared/utils';

import { EducationalDetailsAdd } from '../../components/EducationDetailsAdd';
import { ExperienceDetailsAdd } from '../../components/ExperienceDetailsAdd';

const documentMap = ['resume', 'coverLetter'];

export const HrRecruitmentJobApplicationAdd = () => {
  const router = useRouter();
  const methods = useForm();
  const { watch, getValues, reset } = methods;
  const { data, isFetching } = useGetJobOpeningListQuery({
    pagination: getPaginationQuery(),
  });

  const { mutateAsync } = useSetJobApplicationMutation();

  const { data: jobApplicationData } = useGetJobApplicationQuery(
    { id: router?.query?.['id'] as string },
    { enabled: !!router?.query?.['id'] }
  );

  const jobApplicationEditData =
    jobApplicationData?.hr?.recruitment?.recruitmentJobApplication?.getJobApplication?.data;

  useEffect(() => {
    if (jobApplicationEditData) {
      reset({
        ...jobApplicationEditData,
        permanentAddress: {
          ...jobApplicationEditData?.permanentAddress,
          locality: jobApplicationEditData?.permanentAddress?.locality?.en,
        },
        temporaryAddress: {
          ...jobApplicationEditData?.temporaryAddress,
          locality: jobApplicationEditData?.temporaryAddress?.locality?.en,
        },
        documents:
          documentMap?.map((document) => ({
            fieldId: document,
            identifiers:
              jobApplicationEditData?.documents?.find((d) => d?.fieldId === document)
                ?.identifiers || [],
          })) || [],
      });
    }
  }, [JSON.stringify(jobApplicationEditData)]);

  const jobOpeningOptions =
    data?.hr?.recruitment?.recruitmentJobOpening?.listJobOpening?.edges?.map((item) => ({
      label: item?.node?.title as string,
      value: item?.node?.id as string,
    }));

  const applicationStatusOptions = [
    { label: 'Accepted', value: ApplicantStatus?.Accepted },
    { label: 'Not Accepted', value: ApplicantStatus?.NotAccepted },
    { label: 'Pending', value: ApplicantStatus?.Pending },
    { label: 'Short Listed', value: ApplicantStatus?.Shortlisted },
  ];

  const isTempSameAsPerm = watch('tempSameAsPerm');

  const submitForm = () => {
    const values = getValues();
    if (router?.query?.['id']) {
      asyncToast({
        id: 'edit-job-application',
        msgs: {
          success: 'job application edited succesfully',
          loading: 'editing job application',
        },
        onSuccess: () => {
          router.push(ROUTES?.HR_RECRUITMENT_JOB_APPLICATION_LIST);
        },
        promise: mutateAsync({
          id: router?.query?.['id'] as string,
          input: {
            ...(omit(
              {
                ...values,
                documents: values?.documents?.map((item: DocumentInsertInput, index: number) => ({
                  fieldId: documentMap[index],
                  identifiers: item?.identifiers || [],
                })),
              },
              ['id']
            ) as JobApplicationInput),
          },
        }),
      });
    } else {
      asyncToast({
        id: 'add-job-application',
        msgs: {
          success: 'new job application added succesfully',
          loading: 'adding new job application',
        },
        onSuccess: () => {
          router.push(ROUTES?.HR_RECRUITMENT_JOB_APPLICATION_LIST);
        },
        promise: mutateAsync({
          id: null,
          input: {
            ...values,
            documents: values?.documents?.map((item: DocumentInsertInput, index: number) => ({
              fieldId: documentMap[index],
              identifiers: item?.identifiers || [],
            })),
          } as JobApplicationInput,
        }),
      });
    }
  };

  return (
    <FormLayout methods={methods}>
      <FormLayout.Header title="New Job Application" />
      <FormLayout.Content>
        <FormLayout.Form>
          <FormSection templateColumns={3} divider>
            <GridItem colSpan={2}>
              <FormInput name="applicantName" type="text" label="Applicant Name" />
            </GridItem>
            <FormSelect
              name="jobOpening"
              label="Job Opening"
              options={jobOpeningOptions}
              isLoading={isFetching}
            />
          </FormSection>
          <FormSection templateColumns={3} header="Contact Details" divider>
            <FormEmailInput
              name="personalEmailAddress"
              type="email"
              label="Personal Email Address"
            />
            <FormPhoneNumber
              name="personalPhoneNumber"
              type="phone"
              label="Personal Contact Number"
            />
          </FormSection>
          <FormSection templateColumns={3} header="Permanent Address" divider>
            <FormAddress name="permanentAddress" />
          </FormSection>
          <FormSection templateColumns={3} header="Temporary Address" divider>
            <GridItem colSpan={3}>
              <FormSwitch name="tempSameAsPerm" label="Temporary Address same as Permanent" />
            </GridItem>
            {!isTempSameAsPerm && <FormAddress name="temporaryAddress" />}
          </FormSection>
          <FormSection templateColumns={2} header="Document" divider>
            <FormFileInput size="sm" name="documents.0.identifiers" label="Resume/CV" />
            <FormFileInput size="sm" name="documents.1.identifiers" label="Cover Letter" />
          </FormSection>
          <EducationalDetailsAdd />
          <ExperienceDetailsAdd />
          <FormSection templateColumns={2} header="Impression" divider>
            <FormSelect
              name="applicationStatus"
              label="Status"
              options={applicationStatusOptions}
            />
            <FormRating name="applicationRating" label="Application Rating" />
          </FormSection>
        </FormLayout.Form>{' '}
      </FormLayout.Content>
      <FormLayout.Footer mainButtonLabel="Save" mainButtonHandler={submitForm} />
    </FormLayout>
  );
};
export default HrRecruitmentJobApplicationAdd;
