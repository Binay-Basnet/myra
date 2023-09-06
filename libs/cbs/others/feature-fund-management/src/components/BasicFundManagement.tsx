import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';

import { FormSection, Text } from '@myra-ui';

import { useGetCurrentFundAmountQuery } from '@coop/cbs/data-access';
import { FormAmountInput, FormInput, FormNumberInput } from '@coop/shared/form';
import { debitCreditConverter } from '@coop/shared/utils';

export const BasicFundManagement = () => {
  const router = useRouter();

  const { watch, setValue } = useFormContext();

  const { data: currentFundAmountHOData } = useGetCurrentFundAmountQuery({ forHeadOffice: true });

  const currentFundAmount = currentFundAmountHOData?.profitToFundManagement?.getCurrentFundAmount;

  useEffect(() => {
    if (currentFundAmount) {
      setValue(
        'grossProfitCoa',
        `${currentFundAmount?.coaHead} - ${currentFundAmount?.coaHeadName}`
      );
      setValue('grossProfit', currentFundAmount?.amount?.amount || 0);

      setValue(
        'grossProfitDr',
        debitCreditConverter(
          currentFundAmount?.amount?.amount as string,
          currentFundAmount?.amount?.amountType as string
        )
      );
    }
  }, [currentFundAmount]);

  const grossProfit = Number(watch('grossProfit') || 0);

  const staffBonusFund = Number(watch('staffBonusFund') || 0);

  const profitBeforeTax = Number(watch('profitBeforeTax') || 0);

  const incomeTax = Number(watch('incomeTax') || 0);

  useEffect(() => {
    setValue(
      'profitBeforeTax',
      (grossProfit - (staffBonusFund / 100) * grossProfit || 0).toFixed(2)
    );
  }, [grossProfit, staffBonusFund]);

  useEffect(() => {
    setValue('netProfit', (profitBeforeTax - (incomeTax / 100) * profitBeforeTax || 0).toFixed(2));
  }, [profitBeforeTax, incomeTax]);

  return (
    <FormSection>
      <FormInput name="grossProfitCoa" label="Gross Profit COA" isDisabled />

      <FormInput name="grossProfitDr" label="Gross Profit" textAlign="right" isDisabled />

      <FormNumberInput
        name="staffBonusFund"
        label="Staff Bonus Fund"
        rightElement={
          <Text fontWeight="Medium" fontSize="r1" color="primary.500">
            %
          </Text>
        }
        isDisabled={router?.asPath?.includes('/view')}
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
        isDisabled={router?.asPath?.includes('/view')}
      />

      <FormAmountInput name="netProfit" label="Net Profit" isDisabled />
    </FormSection>
  );
};
