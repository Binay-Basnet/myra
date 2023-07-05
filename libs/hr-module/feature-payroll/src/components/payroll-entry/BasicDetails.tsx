import { FormSection } from '@myra-ui';

import { FormDatePicker } from '@coop/shared/form';

export const PayrollEntryBasicDetails = () => (
  <FormSection>
    <FormDatePicker name="payrollPeriodStart" label="Payroll Period Start Date" />
    <FormDatePicker name="payrollPeriodEnd" label="Payroll Period End Date" />
    <FormDatePicker name="payDay" label="Pay Day" />
  </FormSection>
);
