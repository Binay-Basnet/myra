import { useForm } from 'react-hook-form';

import { FormLayout } from '@coop/shared/form';

import { PayrollEntryBasicDetails, PayrollEntryEmployees } from '../../components';

export const HrPayrollEntryUpsert = () => {
  const methods = useForm();

  return (
    <FormLayout methods={methods}>
      <FormLayout.Header title="Payroll Run" />
      <FormLayout.Content>
        <FormLayout.Form>
          <PayrollEntryBasicDetails />
          <PayrollEntryEmployees methods={methods} />
        </FormLayout.Form>
      </FormLayout.Content>
      <FormLayout.Footer mainButtonLabel="Save" />
    </FormLayout>
  );
};
