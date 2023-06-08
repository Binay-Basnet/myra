import { useForm } from 'react-hook-form';

import { asyncToast, FormSection, GridItem } from '@myra-ui';

import {
  JobOpeningInput,
  Level,
  useGetDepartmentListQuery,
  useGetDesignationListQuery,
  useGetStaffPlanningListQuery,
  useSetJobOpeningMutation,
} from '@coop/cbs/data-access';
import { FormInput, FormLayout, FormSelect, FormTextArea } from '@coop/shared/form';
import { getPaginationQuery } from '@coop/shared/utils';

export const HrRecruitmentJobOpeningAdd = () => {
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

  const experienceLevelOptions = [
    { label: 'No Experience', value: Level?.BelowOneYrs },
    { label: 'One-Two', value: Level?.BetweenOneTwoYrs },
    { label: 'Two-Three', value: Level?.BetweenTwoThreeYrs },
    { label: 'Three and above', value: Level?.ThreeYrsAndAbove },
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
      <FormLayout.Header title="Job Opening" />

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
