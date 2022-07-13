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
      label: t['accountingCustomerPaymentAddPaymentModeBankTransfer'],
      value: 'bankTransfer',
    },
    {
      label: t['accountingCustomerPaymentAddPaymentModeCheque'],
      value: 'cheque',
    },
    {
      label: t['accountingCustomerPaymentAddPaymentModeCash'],
      value: 'cash',
    },
  ];

  return (
    <BoxContainer>
      <Text fontWeight={'500'} fontSize="s3">
        {t['accountingCustomerPaymentAddPaymentMode']}
      </Text>
      <FormSwitchTab name="paymentMode" options={paymentModeOptions} />
      <InputGroupContainer>
        <FormInput
          type="text"
          name="paymentReferenceNo"
          label={t['accountingCustomerPaymentAddPaymentReferenceNo']}
          placeholder={t['accountingCustomerPaymentAddPaymentReferenceNo']}
        />
      </InputGroupContainer>
    </BoxContainer>
  );
};
