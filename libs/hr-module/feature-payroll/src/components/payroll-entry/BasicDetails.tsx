import { FormSection, GridItem } from '@myra-ui';

import { ReportCustomDateRange } from '@coop/cbs/reports/components';
import { FormDatePicker } from '@coop/shared/form';

export const PayrollEntryBasicDetails = () => (
  <FormSection>
    <GridItem colSpan={2}>
      <ReportCustomDateRange name="payrollPeriod" label="Payroll Period " />
    </GridItem>
    {/* <FormDatePicker name="payrollPeriodEnd" label="Payroll Period End Date" /> */}
    <FormDatePicker name="payDay" label="Pay Day" />
  </FormSection>
);
