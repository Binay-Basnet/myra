import { useFormContext } from 'react-hook-form';

import {
  BoxContainer,
  InputGroupContainer,
} from '@coop/accounting/ui-components';
import { FormInput, FormSelect, FormSwitchTab } from '@coop/shared/form';
import { Box, GridItem, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const TDS = () => {
  const { t } = useTranslation();

  const { watch } = useFormContext();

  const tds = watch('tds');

  const booleanList = [
    { label: t['accountingCustomerDetailsAddTDSYes'], value: 'Yes' },
    { label: t['accountingCustomerDetailsAddTDSNo'], value: 'No' },
  ];
  return (
    <BoxContainer>
      <Box display="flex" justifyContent="space-between">
        <Text fontSize="s3" fontWeight="500" color="gray.700">
          {t['accountingCustomerDetailsAddTDS']}
        </Text>

        <FormSwitchTab options={booleanList} name="tds" />
      </Box>

      {tds === 'Yes' && (
        <InputGroupContainer>
          <FormSelect
            name="tdsAccount"
            label={t['accountingCustomerDetailsAddTDSAccount']}
            placeholder={t['accountingCustomerDetailsAddSelectTDSAccount']}
            options={[]}
          />

          <FormSelect
            name="tdsType"
            label={t['accountingCustomerDetailsAddTDSType']}
            placeholder={t['accountingCustomerDetailsAddTDSType']}
            options={[]}
          />

          <FormInput
            name="tdsAmount"
            type="number"
            label={t['accountingCustomerDetailsAddTDSAmount']}
            textAlign={'right'}
            placeholder="0.00"
          />
        </InputGroupContainer>
      )}
    </BoxContainer>
  );
};
