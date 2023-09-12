import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';

import { FormSection, GridItem, Text } from '@myra-ui';

import { useGetCurrentFundAmountQuery } from '@coop/cbs/data-access';
import { FormAmountInput, FormLeafCoaHeadSelect, FormNumberInput } from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

export const IncomeTax = () => {
  const router = useRouter();

  const { setValue, watch } = useFormContext();

  const { data: currentFundAmountHOData } = useGetCurrentFundAmountQuery({ forHeadOffice: true });

  const currentFundAmount = Number(
    currentFundAmountHOData?.profitToFundManagement?.getCurrentFundAmount?.amount?.amount || 0
  );

  const staffBonusFundAmount = Number(watch('staffBonus.amount') || 0);

  const remainingProfit = Number((currentFundAmount - staffBonusFundAmount).toFixed(2));

  const incomeTaxAmount = Number(watch('incomeTax.amount') || 0);

  return (
    <FormSection header="Income Tax">
      <FormLeafCoaHeadSelect
        name="incomeTax.coaHead"
        label="COA Head"
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
          setValue('incomeTax.amount', ((Number(newVal || 0) / 100) * remainingProfit).toFixed(2));

          setValue(
            'netProfit',
            remainingProfit - Number(((Number(newVal || 0) / 100) * remainingProfit).toFixed(2))
          );
        }}
        isDisabled={router?.asPath?.includes('/view')}
      />

      <FormAmountInput
        name="incomeTax.amount"
        label="Amount"
        onChangeAction={(newVal) => {
          setValue('incomeTax.percent', ((Number(newVal || 0) / remainingProfit) * 100).toFixed(2));

          setValue('netProfit', Number(newVal || 0));
        }}
        isDisabled={router?.asPath?.includes('/view')}
      />

      <GridItem colSpan={3} display="flex" gap="s4">
        <Text>Remaining Profit:</Text>
        <Text>{amountConverter(remainingProfit - incomeTaxAmount)}</Text>
      </GridItem>
    </FormSection>
  );
};
