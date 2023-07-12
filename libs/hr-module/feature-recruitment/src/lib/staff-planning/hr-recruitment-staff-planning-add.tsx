import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useGetDesignationOptions } from '@hr/common';
import { omit } from 'lodash';

import { asyncToast, FormSection, GridItem } from '@myra-ui';

import {
  StaffPlanInput,
  StaffPlanTypesInput,
  useGetStaffPlanQuery,
  useSetStaffPlanningMutation,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import {
  FormDatePicker,
  FormEditableTable,
  FormInput,
  FormLayout,
  FormTextArea,
} from '@coop/shared/form';

export const HrRecruitmentStaffPlanningAdd = () => {
  const router = useRouter();
  const methods = useForm();
  const { getValues, reset } = methods;

  const { designationOptions } = useGetDesignationOptions();

  const { mutateAsync } = useSetStaffPlanningMutation();
  const { data: staffPlanningData } = useGetStaffPlanQuery(
    { id: router?.query?.['id'] as string },
    { enabled: !!router?.query?.['id'] }
  );

  const staffPlanningEditData = staffPlanningData?.hr?.recruitment?.recruitment?.getStaffPlan?.data;
  useEffect(() => {
    if (staffPlanningEditData) {
      reset(staffPlanningEditData);
    }
  }, [JSON.stringify(staffPlanningData)]);

  const submitForm = () => {
    if (router?.query?.['id']) {
      asyncToast({
        id: 'edit-staff-planning',
        msgs: {
          success: 'Staff planning edited succesfully',
          loading: 'editing staff planning',
        },
        onSuccess: () => {
          router.push(ROUTES?.HR_RECRUITMENT_STAFF_PLANNING_LIST);
        },
        promise: mutateAsync({
          id: router?.query?.['id'] as string,
          input: {
            ...omit({ ...getValues() }, ['id', 'total_cost_estimation', 'total_vacancies']),
          } as unknown as StaffPlanInput,
        }),
      });
    } else {
      asyncToast({
        id: 'add-staff-planning',
        msgs: {
          success: 'Staff planning added succesfully',
          loading: 'adding new staff planning',
        },
        onSuccess: () => {
          router.push(ROUTES?.HR_RECRUITMENT_STAFF_PLANNING_LIST);
        },
        promise: mutateAsync({
          id: null,
          input: {
            ...omit({ ...getValues() }, ['total_cost_estimation', 'total_vacancies']),
          } as unknown as StaffPlanInput,
        }),
      });
    }
  };
  // const dataWatch = watch('staffPlans');
  // const totalVacancies = dataWatch?.reduce(
  //   (acc: number, curr: StaffPlanTypesInput) => Number(acc) + Number(curr.vacancies),
  //   0
  // );

  // const totalCostEstimation = dataWatch?.reduce(
  //   (acc: number, curr: StaffPlanTypesInput) => Number(acc) + Number(curr.estimated_cost),
  //   0
  // );

  return (
    <FormLayout methods={methods}>
      <FormLayout.Header title="New Staff Planning" />

      <FormLayout.Content>
        <FormLayout.Form>
          <FormSection templateColumns={4} divider={false}>
            <GridItem colSpan={2}>
              <FormInput name="title" type="text" label="Title" />
            </GridItem>
            <FormDatePicker name="date.from" label="Date From" />
            <FormDatePicker name="date.to" label="Date To" />
            <GridItem colSpan={4}>
              <FormEditableTable<StaffPlanTypesInput>
                name="staffPlans"
                columns={[
                  {
                    accessor: 'designation',
                    header: 'Designation',
                    fieldType: 'select',
                    selectOptions: designationOptions,
                  },
                  {
                    accessor: 'vacancies',
                    header: 'Vacancies',
                    cellWidth: 'sm',
                    isNumeric: true,
                  },
                  {
                    accessor: 'estimated_cost_per_employee',
                    header: 'Estimated Cost per Employee',
                  },
                  {
                    accessor: 'estimated_cost',
                    header: 'Estimated Cost',
                  },
                ]}
              />
            </GridItem>
            {/* <GridItem colSpan={4}>
              <Box
                display="flex"
                justifyContent="space-between"
                p="s4"
                borderTopRadius={5}
                border="1px"
                borderColor="gray.200"
              >
                <Text fontSize="r1" fontWeight="medium">
                  Total Vacancies
                </Text>
                <Text fontSize="r1">{totalVacancies || 0}</Text>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                p="s4"
                borderBottomRadius={5}
                borderBottom="1px"
                borderX="1px"
                borderColor="gray.200"
              >
                <Text fontSize="r1" fontWeight="medium">
                  Total Cost Estimation
                </Text>
                <Text fontSize="r1">{totalCostEstimation || 0}</Text>
              </Box>
            </GridItem> */}
            <GridItem colSpan={4}>
              <FormTextArea label="Note" name="note" />
            </GridItem>
          </FormSection>
        </FormLayout.Form>
      </FormLayout.Content>
      <FormLayout.Footer mainButtonLabel="Save" mainButtonHandler={submitForm} />
    </FormLayout>
  );
};

export default HrRecruitmentStaffPlanningAdd;
