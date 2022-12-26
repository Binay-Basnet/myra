import { Box, FormSection, GridItem, Text } from '@myra-ui';

import { InputGroupContainer } from '@coop/accounting/ui-components';
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
  { label: 'Type 1', value: FdInvestmentType.Type_1 },
  { label: 'Type 2', value: FdInvestmentType.Type_2 },
  { label: 'Type 3', value: FdInvestmentType.Type_3 },
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

    <GridItem colSpan={3}>
      <Box display="flex" flexDirection="column" gap="s12">
        <Text fontSize="s2" fontWeight="500" lineHeight="1.5">
          Nominee Details
        </Text>

        <InputGroupContainer>
          <GridItem colSpan={2}>
            <FormBankSelect name="fd.interestNomineeBank" label="Interest Nominee Bank" />
          </GridItem>

          <FormInput name="fd.bankACNo" label="Bank Account Number" />
        </InputGroupContainer>
      </Box>
    </GridItem>

    <FormBankSelect name="fd.interestLedgerMapping" label="Interest Received Ledger Mapping" />

    <GridItem colSpan={3}>
      <FormTextArea name="fd.notes" label="Notes" rows={3} />
    </GridItem>
  </FormSection>
);
