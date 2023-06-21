import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { asyncToast } from '@myra-ui';

import { EmployeeTransferInput, useSetEmployeeTransferUpsertMutation } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { FormLayout } from '@coop/shared/form';

import { EmployeeCard, TransferBasicDetails, TransferDetails } from '../../components';

export const HrLifecycleTransferUpsert = () => {
  const methods = useForm<EmployeeTransferInput>();
  const router = useRouter();

  const { mutateAsync } = useSetEmployeeTransferUpsertMutation();

  const submitForm = () => {
    const data = methods.getValues();

    asyncToast({
      id: 'employee-onboarding',
      msgs: {
        success: 'Employee Transfer Succesfull',
        loading: 'Transferring Employee',
      },
      onSuccess: () => {
        router.push(ROUTES?.HR_LIFECYCLE_EMPLOYEE_TRANSFER_LIST);
      },
      promise: mutateAsync({
        input: {
          ...data,
        },
      }),
    });
  };
  const { watch } = methods;
  const employeeId = watch('employeeId');

  return (
    <FormLayout methods={methods} hasSidebar={!!employeeId}>
      <FormLayout.Header title="Employee Transfer" />

      <FormLayout.Content>
        <FormLayout.Form>
          <TransferBasicDetails />
          <TransferDetails />
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
