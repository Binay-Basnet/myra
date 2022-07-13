import React from 'react';

import {
  BoxContainer,
  InputGroupContainer,
} from '@coop/accounting/ui-components';
import { FieldCardComponents } from '@coop/shared/components';
// import debounce from 'lodash/debounce';
import { FormInput, FormTextArea } from '@coop/shared/form';
import { Box, GridItem, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const CustomerPaymentBox = () => {
  const { t } = useTranslation();

  return (
    <FormTextArea
      name="note"
      label={t['accountingCustomerDetailsAddNotes']}
      placeholder={t['accountingCustomerDetailsAddNote']}
      rows={5}
    />
  );
};
