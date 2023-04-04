import { FormSection, GridItem, Text } from '@myra-ui';

import { FdInvestmentType } from '@coop/cbs/data-access';
import {
  FormAmountInput,
  FormBankSelect,
  FormDatePicker,
  FormInput,
  FormNumberInput,
  FormSelect,
  FormTextArea,
} from '@coop/shared/form';

const fdInvestmentTypeOptions = [
  { label: 'Standard FD', value: FdInvestmentType.StandardFd },
  { label: 'Recurring FD', value: FdInvestmentType.RecurringFd },
];

export const FixedDepositInvestment = () => (
  <FormSection header="Fixed Deposit">
    <FormSelect name="fd.type" label="FD Type" options={fdInvestmentTypeOptions} />

    <FormAmountInput name="fd.fdAmount" label="FD Amount" />

    <FormNumberInput
      name="fd.rate"
      label="Interest Rate"
      rightElement={
        <Text fontWeight="Medium" fontSize="r1" color="primary.500">
          %
        </Text>
      }
    />

    <FormInput name="fd.certificateNo" label="FD Certificate Number" />

    <FormDatePicker name="fd.startDate" label="FD Start Date" />

    <FormDatePicker name="fd.maturityDate" label="Maturity Date" />

    <FormBankSelect name="fd.nomineeBankACNo" label="Interest Nominee Bank" />

    <GridItem colSpan={3}>
      <FormTextArea name="fd.notes" label="Notes" rows={3} />
    </GridItem>
  </FormSection>
);
