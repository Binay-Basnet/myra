import { useForm } from 'react-hook-form';

import { EmployeePromotionInput } from '@coop/cbs/data-access';
import { FormLayout } from '@coop/shared/form';

import { PayrollEntryBasicDetails, PayrollEntryEmployees } from '../../components';

type CustomPromotionInput = {
  activity_details?: {
    fromThis?: string;
    toThis: string;
  }[];
} & EmployeePromotionInput;

export const HrPayrollEntryUpsert = () => {
  const methods = useForm<CustomPromotionInput>({
    defaultValues: {
      activity_details: [
        {
          fromThis: '',
          toThis: '',
        },
      ],
    },
  });

  return (
    <FormLayout methods={methods}>
      <FormLayout.Header title="Payroll Run" />

      <FormLayout.Content>
        <FormLayout.Form>
          <PayrollEntryBasicDetails />
          <PayrollEntryEmployees />
        </FormLayout.Form>
      </FormLayout.Content>
      <FormLayout.Footer mainButtonLabel="Save" />
    </FormLayout>
  );
};
