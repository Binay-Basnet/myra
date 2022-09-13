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
    { label: t['accountingPurchaseAddYes'], value: 'Yes' },
    { label: t['accountingPurchaseAddNo'], value: 'No' },
  ];

  return (
    <BoxContainer>
      <Box display="flex" justifyContent="space-between">
        <Text fontSize="s3" fontWeight="500" color="gray.700">
          {t['accountingPurchaseAddTDS']}
        </Text>

        <FormSwitchTab options={booleanList} name="tds" />
      </Box>

      {tds === 'Yes' && (
        <InputGroupContainer>
          <FormSelect
            name="tdsLedgerAccount"
            label={t['accountingPurchaseAddTDSLedgerAccount']}
            __placeholder={t['accountingPurchaseAddTDSLedgerAccount']}
            options={[]}
          />

          <FormSelect
            name="tdsType"
            label={t['accountingPurchaseAddTDSType']}
            __placeholder={t['accountingPurchaseAddTDSType']}
            options={[]}
          />

          <FormInput
            name="tdsAmount"
            type="number"
            label={t['accountingPurchaseAddTDSAmount']}
            textAlign="right"
            __placeholder="0.00"
          />
        </InputGroupContainer>
      )}
    </BoxContainer>
  );
};
