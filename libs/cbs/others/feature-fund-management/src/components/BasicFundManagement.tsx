import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { FormSection, Text } from '@myra-ui';

import { FormAmountInput, FormNumberInput } from '@coop/shared/form';

export const BasicFundManagement = () => {
  const { watch, setValue } = useFormContext();

  const grossProfit = watch('grossProfit');

  const staffBonusFund = watch('staffBonusFund');

  const profitBeforeTax = watch('profitBeforeTax');

  const incomeTax = watch('incomeTax');

  useEffect(() => {
    setValue('profitBeforeTax', grossProfit - (staffBonusFund / 100) * grossProfit);
  }, [grossProfit, staffBonusFund]);

  useEffect(() => {
    setValue('netProfit', profitBeforeTax - (incomeTax / 100) * profitBeforeTax);
  }, [profitBeforeTax, incomeTax]);

  return (
    <FormSection>
      <FormAmountInput name="grossProfit" label="Gross Profit" />

      <FormNumberInput
        name="staffBonusFund"
        label="Staff Bonus Fund"
        rightElement={
          <Text fontWeight="Medium" fontSize="r1" color="primary.500">
            %
          </Text>
        }
      />

      <FormAmountInput name="profitBeforeTax" label="Profit Before Tax" isDisabled />

      <FormNumberInput
        name="incomeTax"
        label="Income Tax"
        rightElement={
          <Text fontWeight="Medium" fontSize="r1" color="primary.500">
            %
          </Text>
        }
      />

      <FormAmountInput name="netProfit" label="Net Profit" isDisabled />
    </FormSection>
  );
};
