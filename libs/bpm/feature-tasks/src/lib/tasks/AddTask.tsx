import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import {
  useGetDepartmentOptions,
  useGetEployeeLevelOptions,
  useGetEployeeOptions,
} from '@hr/common';
import { omit } from 'lodash';

import { asyncToast, FormSection, GridItem } from '@myra-ui';

import {
  AssignedTo,
  NewTaskInput,
  Priority,
  useGetTaskQuery,
  useSetNewTaskMutation,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import {
  FormDatePicker,
  FormInput,
  FormLayout,
  FormRadioGroup,
  FormSelect,
  FormSwitchTab,
  FormTextArea,
} from '@coop/shared/form';

export const AddTask = () => {
  const methods = useForm<NewTaskInput>({
    defaultValues: {
      assignedTo: AssignedTo?.Person,
    },
  });
  const router = useRouter();
  const { getValues, reset, watch } = methods;

  const { employeeOptions } = useGetEployeeOptions();
  const { departmentOptions } = useGetDepartmentOptions();
  const { employeeLevelOptions } = useGetEployeeLevelOptions();

  const { mutateAsync } = useSetNewTaskMutation();

  const { data: taskData } = useGetTaskQuery(
    {
      id: router?.query?.['id'] as string,
    },
    { enabled: !!router?.query?.['id'] }
  );

  const taskEditData = taskData?.bpm?.task?.getTask?.data;

  useEffect(() => {
    if (taskEditData) {
      reset(taskEditData);
    }
  }, [JSON.stringify(taskEditData)]);

  const assignedToWatch = watch('assignedTo');

  const submitForm = () => {
    const values = getValues();

    if (router?.query?.['id']) {
      asyncToast({
        id: 'edit-task',
        msgs: {
          success: 'task edited succesfully',
          loading: 'editing task',
        },
        onSuccess: () => {
          router.push(ROUTES?.BPM_TASKS_LISTS);
        },
        promise: mutateAsync({
          id: router?.query?.['id'] as string,
          input:
            assignedToWatch === 'PERSON'
              ? omit({ ...values }, ['department', 'minimumLevelOfAuthority'])
              : omit({ ...values }, ['name']),
        }),
      });
    } else {
      asyncToast({
        id: 'add-new-task',
        msgs: {
          success: 'new task added succesfully',
          loading: 'adding new task',
        },
        onSuccess: () => {
          router.push(ROUTES?.BPM_TASKS_LISTS);
        },
        promise: mutateAsync({
          id: null,
          input:
            assignedToWatch === 'PERSON'
              ? omit({ ...values }, ['department', 'minimumLevelOfAuthority'])
              : omit({ ...values }, ['name']),
        }),
      });
    }
  };
  return (
    <FormLayout methods={methods}>
      <FormLayout.Header title="New Task" />

      <FormLayout.Content>
        <FormLayout.Form>
          <FormSection templateColumns={4} divider>
            <GridItem colSpan={4}>
              <FormInput name="taskTitle" label="Task Title" />
            </GridItem>
            <GridItem colSpan={2}>
              <FormDatePicker name="dueDate" label="Due Date" />
            </GridItem>
            <GridItem colSpan={2}>
              <FormSelect name="assignedBy" label="Assigned By" options={employeeOptions} />
            </GridItem>
          </FormSection>
          <FormSection templateColumns={4} divider>
            <GridItem colSpan={4}>
              <FormSwitchTab
                name="assignedTo"
                label="Assigned To"
                options={[
                  { label: 'Person', value: AssignedTo?.Person },
                  { label: 'Department', value: AssignedTo?.Department },
                ]}
              />
            </GridItem>
            {assignedToWatch === AssignedTo?.Person ? (
              <GridItem colSpan={2}>
                <FormSelect name="name" label="Name" options={employeeOptions} />
              </GridItem>
            ) : (
              <>
                <GridItem colSpan={2}>
                  <FormSelect name="department" label="Department" options={departmentOptions} />
                </GridItem>
                <GridItem colSpan={2}>
                  <FormSelect
                    name="minimumLevelOfAuthority"
                    label="Minimum Level of Authority"
                    options={employeeLevelOptions}
                  />
                </GridItem>
              </>
            )}
          </FormSection>
          <FormSection templateColumns={4} divider>
            <GridItem colSpan={4}>
              <FormRadioGroup
                name="priority"
                label="Priority"
                direction="row"
                options={[
                  {
                    label: 'High',
                    value: Priority?.High,
                  },
                  {
                    label: 'Medium',
                    value: Priority?.Medium,
                  },
                  {
                    label: 'Low',
                    value: Priority?.Low,
                  },
                ]}
              />
            </GridItem>
          </FormSection>
          <FormSection templateColumns={4} divider>
            {/* <FormFileInput name="documents" label="File Upload" /> */}
            <GridItem colSpan={4}>
              <FormTextArea h="200" name="notes" label="Notes" />
            </GridItem>
          </FormSection>
        </FormLayout.Form>{' '}
      </FormLayout.Content>
      <FormLayout.Footer mainButtonLabel="Save" mainButtonHandler={submitForm} />
    </FormLayout>
  );
};

export default AddTask;
