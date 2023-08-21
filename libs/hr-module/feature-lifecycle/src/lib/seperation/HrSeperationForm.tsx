import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { asyncToast } from '@myra-ui';

import {
  EmployeeSeparationInput,
  useSetEmployeeSeerationUpsertMutation,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { FormLayout } from '@coop/shared/form';

import { EmployeeCard, SeperationBasicDetails } from '../../components';

const documentMap = ['resignationLetter'];

export const HrSeperationUpsert = () => {
  const methods = useForm<EmployeeSeparationInput>();
  const router = useRouter();

  const { mutateAsync } = useSetEmployeeSeerationUpsertMutation();

  const submitForm = () => {
    const data = methods.getValues();

    asyncToast({
      id: 'employee-transfer',
      msgs: {
        success: 'Employee Seperation Succesfull',
        loading: 'Seperating Employee',
      },

      promise: mutateAsync({
        input: {
          ...data,
          document: data?.document?.map((item, index) => ({
            fieldId: documentMap[index],
            identifiers: item?.identifiers || [],
          })),
        },
      }),
      onSuccess: () => {
        router.push(ROUTES?.HR_LIFECYCLE_EMPLOYEE_SEPERATION_LIST);
      },
    });
  };
  const { watch } = methods;
  const employeeId = watch('employeeId');

  return (
    <FormLayout methods={methods} hasSidebar={!!employeeId}>
      <FormLayout.Header title="Employee Seperation" />

      <FormLayout.Content>
        <FormLayout.Form>
          <SeperationBasicDetails />
        </FormLayout.Form>
        {employeeId && (
          <FormLayout.Sidebar borderPosition="left">
            <EmployeeCard employeeId={employeeId} />
          </FormLayout.Sidebar>
        )}
      </FormLayout.Content>
      <FormLayout.Footer mainButtonLabel="Save" mainButtonHandler={submitForm} />
    </FormLayout>
  );
};
