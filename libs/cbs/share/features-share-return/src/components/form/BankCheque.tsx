import { useGetCoaBankListQuery } from '@coop/cbs/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';
import { FormSection, GridItem } from '@coop/shared/ui';
import { featureCode, useTranslation } from '@coop/shared/utils';

type ReturnProps = {
  totalAmount: number;
};

const BankCheque = ({ totalAmount }: ReturnProps) => {
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
        <FormSelect name="bankCheque.bankId" label={t['shareReturneBankName']} options={bankList} />
      </GridItem>

      <GridItem colSpan={1}>
        <FormInput type="text" name="bankCheque.chequeNo" label={t['shareReturnChequeNo']} />
      </GridItem>

      <GridItem colSpan={1}>
        <FormInput
          type="text"
          name="bankCheque.amount"
          isDisabled
          label={t['sharePurchaseAmount']}
          defaultValue={totalAmount}
        />
      </GridItem>
    </FormSection>
  );
};

export default BankCheque;
