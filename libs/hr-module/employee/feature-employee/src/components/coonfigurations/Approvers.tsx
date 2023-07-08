import { useGetEployeeOptions } from '@hr/common';

import { FormSection } from '@myra-ui';

import { FormSelect } from '@coop/shared/form';

export const Approvers = () => {
  const { employeeOptions } = useGetEployeeOptions();
  return (
    <FormSection id="Approvers" header="Approvers">
      <FormSelect name="reportsToId" label="Reports to" options={employeeOptions} />
      <FormSelect name="leaveApproverId" label="Leave Appprover" options={employeeOptions} />
      <FormSelect name="expenseApproverId" label="Expense Approver" options={employeeOptions} />
    </FormSection>
  );
};
