import React from 'react';

import {
  BoxContainer,
  InputGroupContainer,
} from '@coop/accounting/ui-components';
// import debounce from 'lodash/debounce';
import { FormInput, FormSelect } from '@coop/shared/form';
import { Box, GridItem, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const CustomerDetails = () => {
  const { t } = useTranslation();

  return (
    <BoxContainer>
      <InputGroupContainer>
        <FormSelect
          name="receivedFrom"
          label={t['accountingCustomerDetailsAddReceivedFrom']}
          placeholder={t['accountingCustomerDetailsAddReceivedFrom']}
        />

        <FormInput
          name="recievedAccount"
          type="number"
          label={t['accountingCustomerDetailsAddReceivedAccount']}
          textAlign={'right'}
          placeholder={t['accountingCustomerDetailsAddSelectReceivedAccount']}
        />
        <FormInput
          name="recievedDate"
          type="date"
          label={t['accountingCustomerDetailsAddReceivedDate']}
          placeholder="DD-MM-YYYY"
        />
        <FormInput
          name="amount"
          type="number"
          label={t['accountingCustomerDetailsAddAmount']}
          textAlign={'right'}
          placeholder="0.00"
        />
        {/* <FormSelect
          name="invoiceReference2"
          label="Invoice Reference"
          placeholder="Invoice Reference"
        /> */}
      </InputGroupContainer>
    </BoxContainer>
  );
};
