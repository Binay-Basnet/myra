import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';

import { FormSection, GridItem, Text } from '@myra-ui';

import { FormAmountInput, FormCOALedgerSelect, FormNumberInput } from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

import { useFundManagement } from '../hooks';
import { CustomFundManagementInput } from '../lib/type';

export const IncomeTax = () => {
  const { remainingProfitAfterStaff, remainingProfitAfterTax } = useFundManagement({});

  const router = useRouter();

  const { setValue } = useFormContext<CustomFundManagementInput>();

  return (
    <FormSection header="Income Tax">
      <FormCOALedgerSelect
        name="incomeTax.ledgerId"
        label="COA Ledger"
        currentBranchOnly
        isDisabled={router?.asPath?.includes('/view')}
      />

      <FormNumberInput
        name="incomeTax.percent"
        label="Percent"
        rightElement={
          <Text fontWeight="Medium" fontSize="r1" color="primary.500">
            %
          </Text>
        }
        onChangeAction={(newVal) => {
          setValue(
            'incomeTax.amount',
            ((Number(newVal || 0) / 100) * remainingProfitAfterStaff).toFixed(2)
          );
        }}
        isDisabled={router?.asPath?.includes('/view')}
      />

      <FormAmountInput
        name="incomeTax.amount"
        label="Amount"
        onChangeAction={(newVal) => {
          setValue(
            'incomeTax.percent',
            Number(((Number(newVal || 0) / remainingProfitAfterStaff) * 100).toFixed(4))
          );
        }}
        isDisabled={router?.asPath?.includes('/view')}
      />

      <GridItem colSpan={3} display="flex" gap="s4">
        <Text>Remaining Profit:</Text>
        <Text>{amountConverter(remainingProfitAfterTax)}</Text>
      </GridItem>
    </FormSection>
  );
};
