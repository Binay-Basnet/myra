import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { asyncToast } from '@myra-ui';

import {
  EmployeeSeparationInput,
  useSetEmployeeSeerationUpsertMutation,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { FormLayout } from '@coop/shared/form';

import { EmployeeCard, PromotionBasicDetails, PromotionTable } from '../../components';

export const HrPromotionUpsert = () => {
  const methods = useForm<EmployeeSeparationInput>();
  const router = useRouter();

  const { mutateAsync } = useSetEmployeeSeerationUpsertMutation();

  const submitForm = () => {
    const data = methods.getValues();

    asyncToast({
      id: 'employee-Promotion',
      msgs: {
        success: 'Employee Promotion Succesfull',
        loading: 'Promotion Successful',
      },

      promise: mutateAsync({
        input: {
          ...data,
        },
      }),
      onSuccess: () => {
        router.push(ROUTES?.HR_LIFECYCLE_EMPLOYEE_PROMOTION_LIST);
      },
    });
  };
  const { watch } = methods;
  const employeeId = watch('employeeId');

  return (
    <FormLayout methods={methods} hasSidebar={!!employeeId}>
      <FormLayout.Header title="Employee Promotion" />

      <FormLayout.Content>
        <FormLayout.Form>
          <PromotionBasicDetails />
          <PromotionTable />
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
