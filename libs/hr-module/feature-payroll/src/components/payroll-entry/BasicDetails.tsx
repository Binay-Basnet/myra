import { FormSection } from '@myra-ui';

import { FormDatePicker } from '@coop/shared/form';

export const PayrollEntryBasicDetails = () => (
  <FormSection>
    <FormDatePicker name="payrollPeroid.from" label="Payroll Start Date" />
    <FormDatePicker name="payrollPeriod.to" label="Payroll End Date" />
    <FormDatePicker name="payDay" label="Pay Day" />
  </FormSection>
);
