import { useFormContext } from 'react-hook-form';

import { FormAmountInput, FormInput, FormSwitchTab } from '@coop/shared/form';
import { FormSection, GridItem, Text } from '@myra-ui';
import { useTranslation } from '@coop/shared/utils';

export const TDS = () => {
  const { t } = useTranslation();

  const { watch } = useFormContext();

  const tds = watch('tds');

  const booleanList = [
    { label: t['accountingCustomerPaymentAddTDSYes'], value: true },
    { label: t['accountingCustomerPaymentAddTDSNo'], value: false },
  ];

  return (
    <FormSection>
      <GridItem colSpan={3} display="flex" justifyContent="space-between">
        <Text fontSize="s3" fontWeight="500" color="gray.700">
          {t['accountingCustomerPaymentAddTDS']}
        </Text>

        <FormSwitchTab options={booleanList} name="tds" />
      </GridItem>

      {tds && (
        <>
          <FormInput name="tdsAccount" label={t['accountingCustomerPaymentAddTDSAccount']} />

          <FormInput name="tdsType" label={t['accountingCustomerPaymentAddTDSType']} />

          <FormAmountInput name="tdsAmount" label={t['accountingCustomerPaymentAddTDSAmount']} />
        </>
      )}
    </FormSection>
  );
};
