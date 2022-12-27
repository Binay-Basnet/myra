import { FormSection, GridItem } from '@myra-ui';

import { FormBankSelect, FormInput } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

type ReturnProps = {
  totalAmount: number;
};

export const BankCheque = ({ totalAmount }: ReturnProps) => {
  const { t } = useTranslation();

  return (
    <FormSection templateColumns={2}>
      <GridItem colSpan={2}>
        <FormBankSelect isRequired name="bankCheque.bankId" label={t['shareReturneBankName']} />
      </GridItem>

      <GridItem colSpan={1}>
        <FormInput
          isRequired
          type="text"
          name="bankCheque.chequeNo"
          label={t['shareReturnChequeNo']}
        />
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
