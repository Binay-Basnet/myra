import { FormSection } from '@myra-ui';

import { FormSelect } from '@coop/shared/form';

export const Approvers = () => (
  <FormSection id="Approvers" header="Approvers">
    <FormSelect name="reportsToId" label="Reports to" />
    <FormSelect name="leaveApproverId" label="Leave Appprover" />
    <FormSelect name="expenseApproverId" label="Expense Approver" />
  </FormSection>
);
