import React from 'react';

import {
  BoxContainer,
  InputGroupContainer,
} from '@coop/accounting/ui-components';
// import debounce from 'lodash/debounce';
import { FormInput, FormSelect } from '@coop/shared/form';
import { GridItem } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const CreditNoteDetails = () => {
  const { t } = useTranslation();

  return (
    <BoxContainer>
      <InputGroupContainer>
        <GridItem colSpan={2}>
          <FormSelect
            name="customerName"
            label={t['accountingCreditNoteAddCustomerName']}
            __placeholder={t['accountingCreditNoteAddSelectCustomer']}
          />
        </GridItem>
        {/* <FormInput
          name="invoiceRefrence"
          type="number"
          label="Invoice Reference"
          __placeholder="Enter Invoice Reference"
        /> */}
        <FormInput
          name="date"
          type="date"
          label={t['accountingCreditNoteAddDate']}
          __placeholder="DD-MM-YYYY"
        />
        {/* <FormInput
          name="dueDate"
          type="date"
          label="Due Date"
          __placeholder="DD-MM-YYYY"
        /> */}
        <FormSelect
          name="invoiceReference"
          label={t['accountingCreditNoteAddInvoiceReference']}
          __placeholder={t['accountingCreditNoteAddInvoiceReference']}
        />
      </InputGroupContainer>
    </BoxContainer>
  );
};
