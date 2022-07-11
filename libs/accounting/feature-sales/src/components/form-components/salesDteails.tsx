import {
  InputGroupContainer,
  BoxContainer,
} from '@coop/accounting/ui-components';
import React from 'react';

// import debounce from 'lodash/debounce';
import { FormInput, FormSelect } from '@coop/shared/form';
import { Box, Text } from '@coop/shared/ui';

export const SalesDetails = () => {
  return (
    <BoxContainer>
      <InputGroupContainer>
        <FormInput
          name="minimumInterestRate"
          type="number"
          label="Mininum Rate"
          textAlign={'right'}
          placeholder="0.00"
          rightElement={'%'}
        />
      </InputGroupContainer>
    </BoxContainer>
  );
};
