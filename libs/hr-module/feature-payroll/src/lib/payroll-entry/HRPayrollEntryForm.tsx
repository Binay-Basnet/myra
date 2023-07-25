import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import omit from 'lodash/omit';

import { asyncToast } from '@myra-ui';

import { useSetPayrollRunMutation } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { FormLayout } from '@coop/shared/form';

import { PayrollEntryBasicDetails, PayrollEntryEmployees } from '../../components';

export const HrPayrollEntryUpsert = () => {
  const router = useRouter();
  const methods = useForm();
  const { getValues } = methods;

  const { mutateAsync } = useSetPayrollRunMutation();

  const submitForm = () => {
    const values = getValues();
    const salaryAssignmentIdList = values?.salaryAssignments?.map(
      (item: { id: string }) => item?.id
    );

    asyncToast({
      id: 'add-payroll-run',
      msgs: {
        success: 'new payroll run added succesfully',
        loading: 'adding new payroll run',
      },
      onSuccess: () => {
        router.push(ROUTES?.HR_PAYROLL_ENTRY_LIST);
      },
      promise: mutateAsync({
        id: null,
        input: {
          ...omit({ ...values, salaryAssignments: salaryAssignmentIdList }, [
            'serviceCenter',
            'department',
            'designation',
          ]),
        },
      }),
    });
  };

  return (
    <FormLayout methods={methods}>
      <FormLayout.Header title="Payroll Run" />
      <FormLayout.Content>
        <FormLayout.Form>
          <PayrollEntryBasicDetails />
          <PayrollEntryEmployees methods={methods} />
        </FormLayout.Form>
      </FormLayout.Content>
      <FormLayout.Footer mainButtonLabel="Save" mainButtonHandler={submitForm} />
    </FormLayout>
  );
};
