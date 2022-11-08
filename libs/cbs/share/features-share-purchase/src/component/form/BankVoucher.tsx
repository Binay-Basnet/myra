import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { RootState, useAppSelector, useGetCoaBankListQuery } from '@coop/cbs/data-access';
import { FormAmountInput, FormDatePicker, FormInput, FormSelect } from '@coop/shared/form';
import { FormSection, GridItem } from '@coop/shared/ui';
import { featureCode, useTranslation } from '@coop/shared/utils';

type PurchaseProps = {
  totalAmount: number;
};

export const BankVoucher = ({ totalAmount }: PurchaseProps) => {
  const { t } = useTranslation();

  const { data: bank } = useGetCoaBankListQuery({
    accountCode: featureCode.accountCode as string[],
  });

  const bankListArr = bank?.settings?.chartsOfAccount?.accountsUnder?.data;

  const bankList = bankListArr?.map((item) => ({
    label: item?.name?.local as string,
    value: item?.id as string,
  }));

  const { resetField } = useFormContext();

  // refetch data when calendar preference is updated
  const preference = useAppSelector((state: RootState) => state?.auth?.preference);

  useEffect(() => {
    resetField('bankVoucher.depositedDate');
  }, [preference?.date]);

  return (
    <FormSection templateColumns={2}>
      <GridItem colSpan={2}>
        <FormSelect
          name="bankVoucher.bankId"
          label={t['sharePurchaseBankName']}
          options={bankList}
        />
      </GridItem>

      <GridItem colSpan={1}>
        <FormInput type="text" name="bankVoucher.voucherId" label={t['sharePurchaseVoucherId']} />
      </GridItem>

      <GridItem colSpan={1}>
        <FormAmountInput
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
