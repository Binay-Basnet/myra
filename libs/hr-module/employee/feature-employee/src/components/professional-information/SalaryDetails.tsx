import { useGetSalaryStructureOptions } from '@hr/common';

import { FormSection } from '@myra-ui';

import { PaymentMode } from '@coop/cbs/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';

export const SalaryDetails = () => {
  const paymentModeOptions = [
    { label: 'Cash', value: PaymentMode?.Cash },
    { label: 'Bank', value: PaymentMode?.BankTransfer },
    { label: 'Bank', value: PaymentMode?.Account },
  ];
  const { salaryStructureOptions } = useGetSalaryStructureOptions();

  return (
    <FormSection id="Salary Info" header="Salary Details">
      <FormSelect name="salaryPaymentMode" label="Payment Mode" options={paymentModeOptions} />
      <FormInput name="panNumber" label="PAN" />
      <FormSelect name="providentFund" label="Provident Fund Account" />
      <FormSelect
        name="salaryStructureId"
        label="Salary Structure"
        options={salaryStructureOptions}
      />
    </FormSection>
  );
};
