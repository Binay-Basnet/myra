import { useGetCoaBankListQuery } from '@coop/cbs/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';
import { FormSection, GridItem } from '@coop/shared/ui';
import { featureCode, useTranslation } from '@coop/shared/utils';

type PurchaseProps = {
  totalAmount: number;
};

const BankVoucher = ({ totalAmount }: PurchaseProps) => {
  const { t } = useTranslation();

  const { data: bank } = useGetCoaBankListQuery({
    accountCode: featureCode.accountCode as string[],
  });

  const bankListArr = bank?.settings?.chartsOfAccount?.accountsUnder?.data;

  const bankList = bankListArr?.map((item) => ({
    label: item?.name?.local as string,
    value: item?.id as string,
  }));

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
        <FormInput
          type="text"
          name="amount"
          isDisabled
          label={t['sharePurchaseAmount']}
          defaultValue={totalAmount}
        />
      </GridItem>

      <GridItem colSpan={1}>
        <FormInput
          type="date"
          name="bankVoucher.depositedDate"
          label={t['sharePurchaseDepositedDate']}
        />
      </GridItem>
    </FormSection>
  );
};

export default BankVoucher;
