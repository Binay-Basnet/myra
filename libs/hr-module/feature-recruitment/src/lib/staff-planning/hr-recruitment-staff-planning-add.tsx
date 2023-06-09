import { useForm } from 'react-hook-form';

import { asyncToast, Box, FormSection, GridItem, Text } from '@myra-ui';

import {
  StaffPlanInput,
  StaffPlanTypesInput,
  useSetStaffPlanningMutation,
} from '@coop/cbs/data-access';
import {
  FormDatePicker,
  FormEditableTable,
  FormInput,
  FormLayout,
  FormTextArea,
} from '@coop/shared/form';

export const HrRecruitmentStaffPlanningAdd = () => {
  const methods = useForm();
  const { getValues, watch } = methods;

  const { mutateAsync } = useSetStaffPlanningMutation();

  const submitForm = () => {
    asyncToast({
      id: 'add-staff-planning',
      msgs: {
        success: 'Staff planning added succesfully',
        loading: 'adding new staff planning',
      },
      onSuccess: () => {},
      promise: mutateAsync({
        id: null,
        input: {
          ...getValues(),
          total_vacancies: 0,
          total_cost_estimation: 'suyash',
        } as unknown as StaffPlanInput,
      }),
    });
  };
  const dataWatch = watch('data');
  const totalVacancies = dataWatch?.reduce(
    (acc: number, curr: StaffPlanTypesInput) => acc + curr.vacancies,
    0
  );

  const totalCostEstimation = dataWatch?.reduce(
    (acc: number, curr: StaffPlanTypesInput) => acc + curr.estimated_cost,
    0
  );

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
            <GridItem colSpan={4}>
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
            </GridItem>
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