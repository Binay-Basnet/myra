import { useFormContext } from 'react-hook-form';

import {
  BoxContainer,
  InputGroupContainer,
} from '@coop/accounting/ui-components';
import { FormInput, FormSelect, FormSwitchTab } from '@coop/shared/form';
import { Box, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const TDS = () => {
  const { t } = useTranslation();

  const { watch } = useFormContext();

  const tds = watch('tds');

  const booleanList = [
    { label: t['accountingCustomerPaymentAddTDSYes'], value: 'Yes' },
    { label: t['accountingCustomerPaymentAddTDSNo'], value: 'No' },
  ];
  return (
    <BoxContainer>
      <Box display="flex" justifyContent="space-between">
        <Text fontSize="s3" fontWeight="500" color="gray.700">
          {t['accountingCustomerPaymentAddTDS']}
        </Text>

        <FormSwitchTab options={booleanList} name="tds" />
      </Box>

      {tds === 'Yes' && (
        <InputGroupContainer>
          <FormSelect
            name="tdsAccount"
            label={t['accountingCustomerPaymentAddTDSAccount']}
            placeholder={t['accountingCustomerPaymentAddSelectTDSAccount']}
            options={[]}
          />

          <FormSelect
            name="tdsType"
            label={t['accountingCustomerPaymentAddTDSType']}
            placeholder={t['accountingCustomerPaymentAddTDSType']}
            options={[]}
          />

          <FormInput
            name="tdsAmount"
            type="number"
            label={t['accountingCustomerPaymentAddTDSAmount']}
            textAlign={'right'}
            placeholder="0.00"
          />
        </InputGroupContainer>
      )}
    </BoxContainer>
  );
};
