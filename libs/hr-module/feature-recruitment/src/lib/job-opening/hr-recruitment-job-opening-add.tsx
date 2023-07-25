import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import {
  useGetDepartmentOptions,
  useGetDesignationOptions,
  useGetStaffPlanningOptions,
} from '@hr/common';
import omit from 'lodash/omit';

import { asyncToast, FormSection, GridItem } from '@myra-ui';

import {
  JobOpeningInput,
  Level,
  useGetJobOpeningQuery,
  useSetJobOpeningMutation,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { FormInput, FormLayout, FormSelect, FormTextArea } from '@coop/shared/form';

export const HrRecruitmentJobOpeningAdd = () => {
  const router = useRouter();
  const methods = useForm();
  const { getValues, reset } = methods;

  const { staffPlanningOptions } = useGetStaffPlanningOptions();
  const { departmentOptions } = useGetDepartmentOptions();
  const { designationOptions } = useGetDesignationOptions();

  const { data: jobOpeningData } = useGetJobOpeningQuery(
    { id: router?.query?.['id'] as string },
    { enabled: !!router?.query?.['id'] }
  );

  const jobOpeningEditData =
    jobOpeningData?.hr?.recruitment?.recruitmentJobOpening?.getJobOpening?.data;

  useEffect(() => {
    if (jobOpeningEditData) {
      reset(jobOpeningEditData);
    }
  }, [JSON.stringify(jobOpeningEditData)]);

  const { mutateAsync } = useSetJobOpeningMutation();

  const experienceLevelOptions = [
    { label: 'No Experience', value: Level?.BelowOneYrs },
    { label: 'One-Two', value: Level?.BetweenOneTwoYrs },
    { label: 'Two-Three', value: Level?.BetweenTwoThreeYrs },
    { label: 'Three and above', value: Level?.ThreeYrsAndAbove },
  ];

  const submitForm = () => {
    if (router?.query?.['id']) {
      asyncToast({
        id: 'edit-job-opening',
        msgs: {
          success: 'job opening edited succesfully',
          loading: 'editing job opening',
        },
        onSuccess: () => {
          router.push(ROUTES?.HR_RECRUITMENT_JOB_OPENING_LIST);
        },
        promise: mutateAsync({
          id: router?.query?.['id'] as string,
          input: {
            ...omit({ ...getValues() }, ['id']),
          } as unknown as JobOpeningInput,
        }),
      });
    } else {
      asyncToast({
        id: 'add-job-opening',
        msgs: {
          success: 'new job opening added succesfully',
          loading: 'adding new job opening',
        },
        onSuccess: () => {
          router.push(ROUTES?.HR_RECRUITMENT_JOB_OPENING_LIST);
        },
        promise: mutateAsync({
          id: null,
          input: {
            ...getValues(),
          } as unknown as JobOpeningInput,
        }),
      });
    }
  };
  return (
    <FormLayout methods={methods}>
      <FormLayout.Header title="New Job Opening" />

      <FormLayout.Content>
        <FormLayout.Form>
          <FormSection templateColumns={3} divider>
            <GridItem colSpan={2}>
              <FormInput name="title" type="text" label="Title" />
            </GridItem>
            <FormSelect name="staffPlan" label="Staff Plan" options={staffPlanningOptions} />
            <FormSelect name="department" label="Department" options={departmentOptions} />
            <FormSelect name="designation" label="Designation" options={designationOptions} />
            <FormSelect
              name="experienceLevel"
              label="Experience Level"
              options={experienceLevelOptions}
            />
            <GridItem colSpan={3}>
              <FormTextArea label="Description(RTE)" name="description" />
            </GridItem>
          </FormSection>
          <FormSection templateColumns={3} divider={false} header="Salary Range">
            <FormInput name="salaryRange.default" label="Default Amount" />
            <FormInput name="salaryRange.min" label="Min.Salary" />
            <FormInput name="salaryRange.max" label="Max.Salary" />
          </FormSection>
        </FormLayout.Form>{' '}
      </FormLayout.Content>
      <FormLayout.Footer mainButtonLabel="Save" mainButtonHandler={submitForm} />
    </FormLayout>
  );
};

export default HrRecruitmentJobOpeningAdd;
