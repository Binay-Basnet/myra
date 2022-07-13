import React from 'react';

import {
  BoxContainer,
  InputGroupContainer,
} from '@coop/accounting/ui-components';
// import debounce from 'lodash/debounce';
import { FormInput, FormSelect, FormSwitchTab } from '@coop/shared/form';
import { Box, GridItem, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const PaymentMode = () => {
  const { t } = useTranslation();

  const paymentModeOptions = [
    {
      label: t['accountingCustomerDetailsAddPaymentModeBankTransfer'],
      value: 'bankTransfer',
    },
    {
      label: t['accountingCustomerDetailsAddPaymentModeCheque'],
      value: 'cheque',
    },
    {
      label: t['accountingCustomerDetailsAddPaymentModeCash'],
      value: 'cash',
    },
  ];

  return (
    <BoxContainer>
      <Text fontWeight={'500'} fontSize="s3">
        {t['accountingCustomerDetailsAddPaymentMode']}
      </Text>
      <FormSwitchTab name="paymentMode" options={paymentModeOptions} />
      <InputGroupContainer>
        <FormInput
          type="text"
          name="paymentReferenceNo"
          label={t['accountingCustomerDetailsAddPaymentReferenceNo']}
          placeholder={t['accountingCustomerDetailsAddPaymentReferenceNo']}
        />
      </InputGroupContainer>
    </BoxContainer>
  );
};
