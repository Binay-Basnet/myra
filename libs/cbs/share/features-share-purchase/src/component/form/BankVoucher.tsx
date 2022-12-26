import { FormSection, GridItem } from '@myra-ui';

import { FormAmountInput, FormBankSelect, FormDatePicker, FormInput } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

type PurchaseProps = {
  totalAmount: number;
};

export const BankVoucher = ({ totalAmount }: PurchaseProps) => {
  const { t } = useTranslation();

  return (
    <FormSection templateColumns={2}>
      <GridItem colSpan={2}>
        <FormBankSelect isRequired name="bankVoucher.bankId" label={t['sharePurchaseBankName']} />
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
          isRequired
          name="bankVoucher.depositedDate"
          label={t['sharePurchaseDepositedDate']}
          maxToday
        />
      </GridItem>
    </FormSection>
  );
};
