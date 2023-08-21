import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { asyncToast } from '@myra-ui';

import { EmployeeTransferInput, useSetEmployeeTransferUpsertMutation } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { FormLayout } from '@coop/shared/form';

import {
  EmployeeCard,
  TransferBasicDetails,
  TransferDetails,
  TransferDetailsHistory,
} from '../../components';

export const HrLifecycleTransferUpsert = () => {
  const methods = useForm<EmployeeTransferInput>();
  const router = useRouter();

  const { mutateAsync } = useSetEmployeeTransferUpsertMutation();

  const submitForm = () => {
    const data = methods.getValues();

    asyncToast({
      id: 'employee-transfer',
      msgs: {
        success: 'Employee Transfer Succesfull',
        loading: 'Transferring Employee',
      },

      promise: mutateAsync({
        input: {
          ...data,
        },
      }),
      onSuccess: () => {
        router.push(ROUTES?.HR_LIFECYCLE_EMPLOYEE_TRANSFER_LIST);
      },
    });
  };
  const { watch } = methods;
  const employeeId = watch('employeeId');
  const tranferType = watch('transferType');

  return (
    <FormLayout methods={methods} hasSidebar={!!employeeId}>
      <FormLayout.Header title="Employee Transfer" />

      <FormLayout.Content>
        <FormLayout.Form>
          <TransferBasicDetails />
          <TransferDetails />
          {tranferType && <TransferDetailsHistory />}
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
