import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';

import { FormSection } from '@myra-ui';

import { FormInput } from '@coop/shared/form';
import { debitCreditConverter } from '@coop/shared/utils';

import { useFundManagement } from '../hooks';

export const BasicFundManagement = () => {
  const { currentFund } = useFundManagement({});

  const router = useRouter();

  const { setValue } = useFormContext();

  useEffect(() => {
    if (currentFund && !router?.asPath?.includes('/view')) {
      // setValue('grossProfitCoa', `${currentFund?.coaHead} - ${currentFund?.coaHeadName}`);

      setValue(
        'grossProfit',
        debitCreditConverter(currentFund?.amount as string, currentFund?.amountType as string)
      );
    }
  }, [currentFund, router?.asPath]);

  return (
    <FormSection>
      {/* <GridItem colSpan={2}>
        <FormInput name="grossProfitCoa" label="Gross Profit COA" isDisabled />
      </GridItem> */}

      <FormInput name="grossProfit" label="Gross Profit" textAlign="right" isDisabled />
    </FormSection>
  );
};
