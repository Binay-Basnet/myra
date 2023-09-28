import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';

import { FormSection, GridItem, Text } from '@myra-ui';

import { FormAmountInput, FormCOALedgerSelect, FormNumberInput } from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

import { useFundManagement } from '../hooks';

export const StaffBonusFund = () => {
  const { currentFundAmount } = useFundManagement({});

  const router = useRouter();

  const { setValue, watch } = useFormContext();

  const staffBonusFundAmount = Number(watch('staffBonus.amount') || 0);

  return (
    <FormSection header="Staff Bonus Fund">
      <FormCOALedgerSelect
        name="staffBonus.ledgerId"
        label="COA Ledger"
        currentBranchOnly
        isDisabled={router?.asPath?.includes('/view')}
      />

      <FormNumberInput
        name="staffBonus.percent"
        label="Percent"
        rightElement={
          <Text fontWeight="Medium" fontSize="r1" color="primary.500">
            %
          </Text>
        }
        onChangeAction={(newVal) => {
          setValue(
            'staffBonus.amount',
            ((Number(newVal || 0) / 100) * currentFundAmount).toFixed(2)
          );
        }}
        isDisabled={router?.asPath?.includes('/view')}
      />

      <FormAmountInput
        name="staffBonus.amount"
        label="Amount"
        onChangeAction={(newVal) => {
          setValue(
            'staffBonus.percent',
            ((Number(newVal || 0) / currentFundAmount) * 100).toFixed(4)
          );
        }}
        isDisabled={router?.asPath?.includes('/view')}
      />

      <GridItem colSpan={3} display="flex" gap="s4">
        <Text>Remaining Profit:</Text>
        <Text>{amountConverter(currentFundAmount - staffBonusFundAmount)}</Text>
      </GridItem>
    </FormSection>
  );
};
