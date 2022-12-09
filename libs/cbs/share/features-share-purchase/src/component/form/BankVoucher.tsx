import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { FormSection, GridItem } from '@myra-ui';

import { RootState, useAppSelector } from '@coop/cbs/data-access';
import { FormAmountInput, FormBankSelect, FormDatePicker, FormInput } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

type PurchaseProps = {
  totalAmount: number;
};

export const BankVoucher = ({ totalAmount }: PurchaseProps) => {
  const { t } = useTranslation();

  const { resetField } = useFormContext();

  // refetch data when calendar preference is updated
  const preference = useAppSelector((state: RootState) => state?.auth?.preference);

  useEffect(() => {
    resetField('bankVoucher.depositedDate');
  }, [preference?.date]);

  return (
    <FormSection templateColumns={2}>
      <GridItem colSpan={2}>
        <FormBankSelect name="bankVoucher.bankId" label={t['sharePurchaseBankName']} />
      </GridItem>

      <GridItem colSpan={1}>
        <FormInput type="text" name="bankVoucher.voucherId" label={t['sharePurchaseVoucherId']} />
      </GridItem>

      <GridItem colSpan={1}>
        <FormAmountInput
          type="number"
          name="amount"
          isDisabled
          label={t['sharePurchaseAmount']}
          defaultValue={totalAmount ?? 0}
        />
      </GridItem>

      <GridItem colSpan={1}>
        <FormDatePicker
          name="bankVoucher.depositedDate"
          label={t['sharePurchaseDepositedDate']}
          maxToday
        />
      </GridItem>
    </FormSection>
  );
};
