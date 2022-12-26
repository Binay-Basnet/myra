import { FormSection, GridItem } from '@myra-ui';

import { DepositFrequency, Frequency } from '@coop/cbs/data-access';
import { FormInput, FormSwitchTab } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const AllowedTransaction = () => {
  const { t } = useTranslation();

  const DepositFrequencyOptions = [
    {
      label: t['monthly'],
      value: DepositFrequency?.Monthly,
    },
    {
      label: t['quaterly'],
      value: DepositFrequency.Quarterly,
    },
    {
      label: t['halfYearly'],
      value: DepositFrequency.HalfYearly,
    },
    {
      label: t['yearly'],
      value: DepositFrequency.Yearly,
    },
  ];

  return (
    <FormSection
      header="depositProductAllowedNumberofTransactions"
      subHeader="depositProductSelectnumberoftransactionsallowed"
    >
      <GridItem colSpan={3}>
        <FormSwitchTab
          defaultValue={Frequency.Daily}
          name="transactionAllowed"
          options={DepositFrequencyOptions}
        />
      </GridItem>

      <FormInput
        isRequired
        type="number"
        textAlign="right"
        name="noOftransactionAllowed"
        label={t['depositProductAllowedNoofTransactions']}
      />
    </FormSection>
  );
};
