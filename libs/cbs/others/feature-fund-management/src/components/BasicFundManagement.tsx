import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { FormSection, GridItem } from '@myra-ui';

import { useGetCurrentFundAmountQuery } from '@coop/cbs/data-access';
import { FormInput } from '@coop/shared/form';
import { debitCreditConverter } from '@coop/shared/utils';

export const BasicFundManagement = () => {
  const { setValue } = useFormContext();

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

  return (
    <FormSection>
      <GridItem colSpan={2}>
        <FormInput name="grossProfitCoa" label="Gross Profit COA" isDisabled />
      </GridItem>

      <FormInput name="grossProfitDr" label="Gross Profit" textAlign="right" isDisabled />
    </FormSection>
  );
};
